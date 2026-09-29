#!/usr/bin/env python3
"""
Turn paper figures into publication thumbnails.

Source figures stay in the working trees that generated them, so the site never
holds a second copy that can go stale — regenerate a figure, re-run this, and
the card updates. Two exceptions live in scripts/figsrc/: figures downloaded
from open-access collaboration papers (BMC, Frontiers) that have no local
working tree.

Some method figures only exist inside a document, not as a standalone file:
the ISMRM ECV pipeline figure is embedded in the abstract PDF, and the SCMR
2026 framework diagram in the submitted docx. Small extractors below pull them
out at build time rather than keeping loose copies around.

Run from the repo root:  python3 scripts/build_thumbs.py
"""

import io
import re
import zlib
import zipfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
FIGSRC = ROOT / "scripts/figsrc"

SCRATCH = Path("/scratch/gautschi/li4533")
MIUA = SCRATCH / "MIUA_2026"

ECV_ABSTRACT_PDF = (
    SCRATCH / "ECV_classification/Manuscript_cleanedcode/Abstract 607-01-003.pdf"
)
SCMR26_DOCX = SCRATCH / "SCMR_27/SCMR26_FM_classification.docx"


def pdf_image(pdf_path: Path, index: int) -> Image.Image:
    """Extract the index-th embedded image (1-based) from a PDF.

    Handles the two encodings this abstract PDF actually uses: DCTDecode
    (JPEG passthrough) and FlateDecode over raw RGB rows.
    """
    data = pdf_path.read_bytes()
    pat = re.compile(rb"<<[^>]*?/Subtype\s*/Image[^>]*?>>\s*stream\r?\n", re.S)
    matches = list(pat.finditer(data))
    m = matches[index - 1]
    head = m.group(0)
    w = int(re.search(rb"/Width\s+(\d+)", head).group(1))
    h = int(re.search(rb"/Height\s+(\d+)", head).group(1))
    filt = re.search(rb"/Filter\s*/(\w+)", head).group(1).decode()
    raw = data[m.end() : data.find(b"endstream", m.end())].rstrip(b"\r\n")
    if filt == "DCTDecode":
        return Image.open(io.BytesIO(raw))
    if filt == "FlateDecode":
        return Image.frombytes("RGB", (w, h), zlib.decompress(raw))
    raise ValueError(f"unsupported PDF image filter {filt} in {pdf_path}")


def docx_image(docx_path: Path, member: str) -> Image.Image:
    """Extract an embedded figure from a docx (a zip of XML plus media)."""
    with zipfile.ZipFile(docx_path) as z:
        return Image.open(io.BytesIO(z.read(member))).copy()


# (source, output dir, output name). A source is either a figure path or a
# zero-argument callable returning a PIL image (for document-embedded figures).
#
# Publication thumbnails land in src/assets/pubs, project covers in
# src/assets/projects. Deliberately absent: anything derived from the pruned
# ISMRM26 test set (FINAL_ROC_Curves and friends) — those numbers were never
# published and the honest reruns live in SCMR_27.
JOBS = [
    # Publications
    (MIUA / "results/figures/fig1_methods.png", "pubs", "miua-4dseg.webp"),
    # The four-panel CycleQA method figure from the repo README.
    (MIUA / "metis/figures/method.png", "pubs", "miua-cycleqa.webp"),
    (MIUA / "LLM_shortpaper/llm_fig1.png", "pubs", "miua-llm.webp"),
    # The presentation pipeline figure (feature pool -> ranking -> multistage
    # DL -> synthetic HCT), embedded as image 3 of the ISMRM abstract PDF.
    (lambda: pdf_image(ECV_ABSTRACT_PDF, 3), "pubs", "ismrm-ecv.webp"),
    # MAE pretraining + fine-tuning framework, from the submitted abstract.
    (
        lambda: docx_image(SCMR26_DOCX, "word/media/image1.png"),
        "pubs",
        "scmr-perfusion.webp",
    ),
    # Open-access collaboration papers: study-design figures (CC BY),
    # downloaded once into figsrc since there is no local working tree.
    (FIGSRC / "bmc-hcm-hfpef-fig1.png", "pubs", "bmc-hcm-hfpef.webp"),
    (FIGSRC / "frontiers-glucose-fig1.jpg", "pubs", "frontiers-glucose.webp"),
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
        if callable(src):
            im = src()
        else:
            if not src.exists():
                print(f"  MISSING  {src}")
                continue
            im = Image.open(src)
        im = im.convert("RGB")
        im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
        im.save(out / dst, "WEBP", quality=QUALITY, method=6)
        print(f"  {sub}/{dst:22s} {str(im.size):12s} {(out / dst).stat().st_size / 1024:6.1f} KB")


if __name__ == "__main__":
    main()
