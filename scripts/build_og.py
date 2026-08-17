#!/usr/bin/env python3
"""Compose public/og.png — the 1200x630 card that link previews render.

Same house style as build_hero_media.py and build_thumbs.py: PIL only, no
network, deterministic output, missing inputs warn rather than crash.

The right third is the real ED frame from the hero cine, so the preview card
shows the actual data rather than a logo.

    python3 scripts/build_og.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
POSTER = ROOT / "public/media/hero-poster.webp"
OUT = ROOT / "public/og.png"

W, H = 1200, 630
PAD = 72

# Dark theme values, lifted verbatim from src/styles/tokens.css.
BG = (11, 12, 14)
INK = (233, 234, 236)
INK_SECONDARY = (178, 182, 189)
INK_FAINT = (92, 98, 107)
ACCENT = (61, 219, 217)

NAME = "Zhuoan Li"
TAGLINE = "Foundation models for cardiac imaging"
FOOTER = "zhuoanli.github.io"

# PIL cannot read the woff2 files fontsource ships, so the card is set in
# whatever the machine has. Matched by stem, in preference order, rather than by
# absolute path — the exact directory layout differs on every distro.
SERIF_STEMS = ["DejaVuSerif", "LiberationSerif-Regular", "NimbusRoman-Regular", "P052-Roman", "Georgia"]
SANS_STEMS = ["DejaVuSans", "LiberationSans-Regular", "NimbusSans-Regular", "Arial"]

FONT_ROOTS = [
    Path("/usr/share/fonts"),
    Path("/usr/local/share/fonts"),
    Path("/System/Library/Fonts"),
    Path.home() / ".fonts",
    Path.home() / ".local/share/fonts",
]


def _index_fonts():
    """stem → path for every scalable face on the machine, first match wins."""
    found = {}
    for root in FONT_ROOTS:
        if not root.is_dir():
            continue
        for path in root.rglob("*"):
            if path.suffix.lower() in (".ttf", ".otf") and path.stem not in found:
                found[path.stem] = path
    return found


FONTS = _index_fonts()


def load_font(stems, size):
    for stem in stems:
        if stem in FONTS:
            return ImageFont.truetype(FONTS[stem], size)
    # Pillow >= 10.1 ships a scalable default (Aileron), so this stays legible
    # rather than collapsing to an unscalable bitmap face.
    print(f"  ! none of {stems[0]}… found; using Pillow's bundled default at {size}px")
    return ImageFont.load_default(size=size)


def main():
    card = Image.new("RGB", (W, H), BG)

    # ── Right third: the real cine frame, faded into the background ──────────
    panel_w = 420
    if POSTER.exists():
        poster = Image.open(POSTER).convert("RGB")
        scale = max(panel_w / poster.width, H / poster.height)
        poster = poster.resize(
            (round(poster.width * scale), round(poster.height * scale)), Image.LANCZOS
        )
        left = (poster.width - panel_w) // 2
        top = (poster.height - H) // 2
        poster = poster.crop((left, top, left + panel_w, top + H))

        # Horizontal alpha ramp so the frame dissolves into the flat field
        # instead of sitting in a hard-edged box. Built explicitly rather than
        # by rotating linear_gradient(), whose orientation is easy to get
        # backwards: index 0 is the left edge and must be fully transparent.
        fade = 0.45  # fraction of the panel width the fade occupies
        ramp = Image.frombytes(
            "L",
            (256, 1),
            bytes(min(255, round(i / (256 * fade) * 255)) for i in range(256)),
        ).resize((panel_w, H))
        card.paste(poster, (W - panel_w, 0), ramp)
    else:
        print(f"  ! MISSING {POSTER.relative_to(ROOT)} — run `npm run media` first")

    draw = ImageDraw.Draw(card)

    # ── Left: the type ───────────────────────────────────────────────────────
    f_name = load_font(SERIF_STEMS, 86)
    f_tagline = load_font(SANS_STEMS, 34)
    f_small = load_font(SANS_STEMS, 22)

    y = 200
    draw.text((PAD, y), NAME, font=f_name, fill=INK)
    y += 118
    draw.line([(PAD, y), (PAD + 64, y)], fill=ACCENT, width=3)
    y += 34
    draw.text((PAD, y), TAGLINE, font=f_tagline, fill=INK_SECONDARY)

    draw.text((PAD, H - PAD - 22), FOOTER, font=f_small, fill=INK_FAINT)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    card.save(OUT, "PNG", optimize=True)
    print(f"  wrote {OUT.relative_to(ROOT)}  ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
