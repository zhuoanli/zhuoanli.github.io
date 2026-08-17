---
title: Zero-shot adaptation
id: zero-shot
summary: >-
  Segmenting the heart without a single cardiac label. MedSAM2 under
  dual-anchored bidirectional propagation reaches 0.85 RV Dice on ACDC with no
  fine-tuning — the numbers in the band above are this line of work.
order: 2
pubs:
  - miua-4dseg
# figure: ../../assets/research/zero-shot.webp
# figureAlt: TODO
---

TODO — expand. The summary above is drawn from what is already asserted in
`src/data/site.ts` and `hero.provenance`, so it is safe to ship as-is; this body
is not written yet.

Worth covering: why propagation from two anchors beats propagation from one,
what fails at end-systole, and where the remaining error concentrates.
