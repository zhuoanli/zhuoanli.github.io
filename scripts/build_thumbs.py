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
OUT = ROOT / "src/assets/pubs"

MIUA = Path("/scratch/gautschi/li4533/MIUA_2026")
ISMRM = Path("/scratch/gautschi/li4533/ISMRM26")

JOBS = [
    (MIUA / "results/figures/fig1_methods.png", "miua-4dseg.webp"),
    (MIUA / "results/figures/fig3_timevolume.png", "miua-timevolume.webp"),
    (MIUA / "LLM_shortpaper/llm_fig1.png", "miua-llm.webp"),
    (ISMRM / "FINAL_ROC_Curves.png", "ismrm-perfusion.webp"),
]

MAX_EDGE = 1200
QUALITY = 80


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for src, dst in JOBS:
        if not src.exists():
            print(f"  MISSING  {src}")
            continue
        im = Image.open(src).convert("RGB")
        im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
        im.save(OUT / dst, "WEBP", quality=QUALITY, method=6)
        print(f"  {dst:24s} {str(im.size):12s} {(OUT / dst).stat().st_size / 1024:6.1f} KB")


if __name__ == "__main__":
    main()
