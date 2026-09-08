#!/usr/bin/env python3
"""
Turn paper figures into publication thumbnails.

Source figures stay in the working trees that generated them, so the site never
holds a second copy that can go stale — regenerate a figure, re-run this, and
the card updates.

Run from the repo root:  python3 scripts/build_thumbs.py
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent

SCRATCH = Path("/scratch/gautschi/li4533")
MIUA = SCRATCH / "MIUA_2026"

# (source figure, output dir, output name).
#
# Publication thumbnails land in src/assets/pubs, project covers in
# src/assets/projects. Deliberately absent: anything derived from the pruned
# ISMRM26 test set (FINAL_ROC_Curves and friends) — those numbers were never
# published and the honest reruns live in SCMR_27.
JOBS = [
    # Publications
    (MIUA / "results/figures/fig1_methods.png", "pubs", "miua-4dseg.webp"),
    (MIUA / "metis/figures/fig1_vendor.png", "pubs", "miua-cycleqa.webp"),
    (MIUA / "LLM_shortpaper/llm_fig1.png", "pubs", "miua-llm.webp"),
    # Project covers
    (
        SCRATCH / "ECV_classification/ecv_repo/results/figures/Graphical_Abstract.png",
        "projects",
        "ecv.webp",
    ),
    (SCRATCH / "SCMR_27/figures/fig3_quantitative.png", "projects", "perfusion.webp"),
]

MAX_EDGE = 1200
QUALITY = 80


def main() -> None:
    for src, sub, dst in JOBS:
        out = ROOT / "src/assets" / sub
        out.mkdir(parents=True, exist_ok=True)
        if not src.exists():
            print(f"  MISSING  {src}")
            continue
        im = Image.open(src).convert("RGB")
        im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
        im.save(out / dst, "WEBP", quality=QUALITY, method=6)
        print(f"  {sub}/{dst:22s} {str(im.size):12s} {(out / dst).stat().st_size / 1024:6.1f} KB")


if __name__ == "__main__":
    main()
