#!/usr/bin/env python3
"""
Build the hero cine loop from real MedSAM2 dual-anchored predictions.

Reads the MIUA 2026 preprocessed 4D cine cache and the model's own `bidir`
prediction, and emits three files the browser can drive from one canvas:

    hero-cine.webp      sprite sheet, one cardiac cycle, 7 x N grid
    hero-contours.json  RV / Myo / LV outlines as polygons in a 0..1000 space
    hero-poster.webp    end-diastolic frame, for loading and reduced-motion

Why a sprite sheet and vector contours rather than two animated WebPs: a single
still compresses far better than an animation of the same frames, the browser
gives no frame callback for animated images (so the two layers would drift), and
raster contours cost ~1.6 MB against 8 KB gzipped as polygons. The vector form
is also resolution-independent and takes its colour from CSS, so the overlay
recolours itself with the theme.

Run from the repo root:  python3 scripts/build_hero_media.py
"""

from __future__ import annotations

import json
import re
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage
from skimage import measure

# --- source -------------------------------------------------------------------

MIUA = Path("/scratch/gautschi/li4533/MIUA_2026")
PATIENT, SLICE = "022", "00"
# Chosen by scoring all 932 evaluable slices on LV fractional area change,
# frame-to-frame jitter, and connected-component count, then reviewing the top
# candidates by eye. HCM: large bright cavity, crisp myocardial ring, clear RV
# crescent, strong contraction.

OUT = Path(__file__).resolve().parent.parent / "public" / "media"

# --- look ---------------------------------------------------------------------

CELL = 512  # sprite cell size in px
COLS = 7
QUALITY = 76
WINDOW = (2.0, 98.0)  # intensity percentiles -> clinical-style window/level
CROP_ZOOM = 1.32  # context kept around the segmented heart
FRAME_MS = 40  # ~1.1 s per cycle over 28 frames: a resting heart rate
SIMPLIFY = 0.9  # polygon tolerance in source px; below ~1.2 the eye sees no loss
VIEWBOX = 1000  # contour coordinate space

LABELS = {1: "rv", 2: "myo", 3: "lv"}


def main() -> None:
    pre = np.load(MIUA / f"preprocessed/patient{PATIENT}_slice{SLICE}.npz")
    post = np.load(MIUA / f"results/medsam2/patient{PATIENT}_slice{SLICE}.npz")
    frames = pre["frames"].astype(np.float32)
    pred = post["bidir"]
    n_frames = frames.shape[0]

    # Centre on the LV+myocardium centroid rather than the full mask bounding
    # box, so the ventricle sits at the optical centre and the RV crescent reads
    # as anatomy instead of an off-balance blob.
    core = ((pred == 2) | (pred == 3)).max(axis=0)
    cy, cx = ndimage.center_of_mass(core)
    ys, xs = np.where(pred.max(axis=0) > 0)
    half = int(max(np.abs(ys - cy).max(), np.abs(xs - cx).max()) * CROP_ZOOM)
    cy, cx = int(round(cy)), int(round(cx))
    y0, y1, x0, x1 = cy - half, cy + half, cx - half, cx + half
    crop = frames[:, 0, y0:y1, x0:x1]
    src = y1 - y0

    # One global window across the whole cycle. Per-frame windowing makes the
    # background pulse, which reads as a compression artefact.
    lo, hi = np.percentile(crop, list(WINDOW))

    # ── sprite sheet ──────────────────────────────────────────────────────────
    rows = -(-n_frames // COLS)
    sheet = Image.new("L", (COLS * CELL, rows * CELL), 0)
    cells = []
    for t in range(n_frames):
        grey = ((crop[t] - lo) / (hi - lo)).clip(0, 1)
        cell = Image.fromarray((grey * 255).astype(np.uint8)).resize(
            (CELL, CELL), Image.LANCZOS
        )
        cells.append(cell)
        sheet.paste(cell, ((t % COLS) * CELL, (t // COLS) * CELL))

    OUT.mkdir(parents=True, exist_ok=True)
    sheet.convert("RGB").save(OUT / "hero-cine.webp", quality=QUALITY, method=6)
    cells[int(pre["ed_idx"])].convert("RGB").save(
        OUT / "hero-poster.webp", quality=88, method=6
    )

    # ── vector contours ───────────────────────────────────────────────────────
    def rings(mask: np.ndarray) -> list[list[list[int]]]:
        out = []
        # Pad so a structure touching the crop edge still closes into a ring.
        for c in measure.find_contours(np.pad(mask.astype(float), 1), 0.5):
            if len(c) < 20:  # specks, not anatomy
                continue
            c = measure.approximate_polygon(c, tolerance=SIMPLIFY)
            out.append(
                [
                    [
                        int(round((p[1] - 1) / src * VIEWBOX)),
                        int(round((p[0] - 1) / src * VIEWBOX)),
                    ]
                    for p in c
                ]
            )
        return out

    contours = [
        {name: rings(pred[t, y0:y1, x0:x1] == label) for label, name in LABELS.items()}
        for t in range(n_frames)
    ]

    # The upstream cache stored this field's repr rather than its value
    # (`np.bytes_(b'HCM')`), so pull the pathology code back out.
    raw = post["group"].item()
    raw = raw.decode() if isinstance(raw, bytes) else str(raw)
    found = re.search(r"[A-Z]{2,}", raw)
    group = found.group(0) if found else raw

    payload = {
        "viewBox": VIEWBOX,
        "cell": CELL,
        "cols": COLS,
        "rows": rows,
        "frames": n_frames,
        "frameMs": FRAME_MS,
        "edIdx": int(pre["ed_idx"]),
        "esIdx": int(pre["es_idx"]),
        "labels": list(LABELS.values()),
        # Provenance travels with the asset so the page caption can never drift
        # from what was actually rendered.
        "source": f"ACDC patient {PATIENT}, short-axis slice {int(SLICE)}",
        "group": group,
        "model": "MedSAM2, dual-anchored bidirectional propagation (zero-shot)",
        "contours": contours,
    }
    (OUT / "hero-contours.json").write_text(json.dumps(payload, separators=(",", ":")))

    for name in ("hero-cine.webp", "hero-poster.webp", "hero-contours.json"):
        print(f"{name:22s} {(OUT / name).stat().st_size / 1024:7.1f} KB")
    print(
        f"{n_frames} frames, {group}, "
        f"{n_frames * FRAME_MS / 1000:.2f} s per loop, ED={payload['edIdx']} ES={payload['esIdx']}"
    )


if __name__ == "__main__":
    main()
