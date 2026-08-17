---
# ─── TEMPLATE ────────────────────────────────────────────────────────────────
# Copy to src/content/research/<nn>-<slug>.md. The `nn-` prefix is only for
# readability; ordering comes from the `order` field.
# ─────────────────────────────────────────────────────────────────────────────

# REQUIRED
title: Theme name
# MUST match an id in site.capabilities (src/data/site.ts). The hero chips are
# anchor links to `#{id}` — if no theme carries the id, the chip silently falls
# back to linking at /research instead.
id: zero-shot
summary: One or two sentences. This is what the home page card shows.

# OPTIONAL
order: 1
pubs:                     # publication ids = filenames without .md
  - miua-4dseg
figure: ../../assets/research/slug.webp   # must exist if uncommented
figureAlt: What the figure shows
draft: false
---

The long version. Renders on /research under the summary. Several paragraphs is
fine — this is the page where the argument connecting the papers gets made.
