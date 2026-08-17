---
# ─── TEMPLATE ────────────────────────────────────────────────────────────────
# Copy to src/content/publications/<slug>.md. The filename becomes the URL:
# <slug> → /publications/<slug>/
#
# This directory is not a collection — the glob loaders in content.config.ts
# point at specific subdirectories, so nothing in _templates/ is ever built.
# ─────────────────────────────────────────────────────────────────────────────

# REQUIRED
title: Full paper title, sentence case
venue: NeurIPS            # short form; this is what the card shows
year: 2026
type: conference          # conference | journal | workshop | abstract | preprint

# Exact submission order. A trailing '*' marks equal contribution and is
# rendered as a footnote. Your own name is bolded automatically.
authors:
  - Jane Doe*
  - Zhuoan Li*
  - Senior Author

# OPTIONAL
venueLong: Conference on Neural Information Processing Systems
status: published         # published | accepted | under-review | in-preparation
anonymized: false         # true + under-review → title/venue/status only, no detail page

tldr: One sentence with the headline number in it.
highlights:
  - A result, stated as a number rather than an adjective
  - A second result
themes:                   # free text; these become the filter chips
  - Zero-shot adaptation

links:                    # every key optional; empty ones render nothing
  pdf: /papers/slug.pdf
  arxiv: https://arxiv.org/abs/0000.00000
  doi: https://doi.org/10.0000/000000
  code: https://github.com/zhuoanli/repo
  slides: https://…
  poster: https://…
  project: /projects      # cross-link to a related project
  bibtex: ''              # only if you want to override the generated entry

# Local asset only — Astro optimises it at build time. The file MUST exist or
# the build fails. `npm run thumbs` writes into src/assets/pubs/.
figure: ../../assets/pubs/slug.webp
figureAlt: What the figure shows, for a screen reader

featured: false           # true → appears in Selected work on the home page
order: 0                  # lower sorts first within a year
---

Optional markdown body. Renders on the detail page under the highlights.
Good place for context that does not fit in `tldr`.
