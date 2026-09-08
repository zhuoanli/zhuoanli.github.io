---
title: Zero-shot adaptation
id: zero-shot
summary: >-
  Segmenting the heart without a single cardiac label. MedSAM2 under
  dual-anchored bidirectional propagation reaches 0.85 RV Dice on ACDC with no
  fine-tuning, and cuts mean HD95 by about half against a single anchor.
order: 2
pubs:
  - miua-4dseg
  - miua-llm
draft: false
---

The interesting part of zero-shot is not that it works — it is where the
leverage comes from. Prompting at both ends of the cardiac cycle and merging
the bidirectional propagations halves the boundary error of a single anchor,
because each anchor is accurate near itself and the merge keeps the best half
of each. The same logic extends past pixels: an LLM given clinically
calibrated reasoning steps turns segmentation-derived metrics into pathology
calls, zero-shot — and its one systematic failure (HCM) maps exactly to what
the input metrics cannot express.
