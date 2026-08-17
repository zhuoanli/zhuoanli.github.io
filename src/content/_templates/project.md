---
# ─── TEMPLATE ────────────────────────────────────────────────────────────────
# Copy to src/content/projects/<slug>.md. Projects have no detail page — the
# card title links to `links.project`, then `links.code`, then `links.pdf`.
# ─────────────────────────────────────────────────────────────────────────────

# REQUIRED
title: Project name
summary: Two sentences. What it does, and why it had to exist.
period: 2025 — present

# OPTIONAL
role: Lead developer
stack:
  - PyTorch
  - MONAI
metrics:                  # rendered as a compact strip inside the card
  - label: Throughput
    value: 4.2k vol/h
    note: on one A100
links:
  code: https://github.com/zhuoanli/repo
  project: https://…
cover: ../../assets/projects/slug.webp   # must exist if uncommented
coverAlt: What the cover image shows
featured: false
order: 0
draft: false              # true → excluded from the build entirely
---
