---
title: 'Zero-Shot Full-Cycle 4D Cardiac Cine MRI Segmentation via Dual-Anchored Medical Video Foundation Model'
authors:
  - Zhuoan Li
  - Behzad Sharif
venue: MIUA
venueLong: 'Medical Image Understanding and Analysis (MIUA) 2026, Springer LNCS — Main Track, Oral Presentation'
year: 2026
type: conference
status: published
anonymized: false

tldr: >-
  Prompting MedSAM2 at both ED and ES and merging the bidirectional
  propagations segments the full cardiac cycle zero-shot — 0.850/0.809/0.843
  Dice (RV/Myo/LV) on ACDC with no cardiac-specific training.
highlights:
  - '0.850 RV Dice on ACDC, zero-shot — no cardiac-specific training'
  - 'RV HD95 of 2.94 mm, roughly 4× tighter than a supervised DINOv2 baseline'
  - 'Mean HD95 down ~51% and ASSD down ~62% versus single-anchor propagation'
  - 'Zero target labels used: the model is never fine-tuned on ACDC'
themes:
  - Foundation models
  - Zero-shot

links:
  code: https://github.com/zhuoanli/4DCMR-Segmentation-via-Foundation-Model

figure: ../../assets/pubs/miua-4dseg.webp
figureAlt: 'Method overview: dual-anchored prompting at ED and ES with bidirectional propagation merged at the temporal midpoint.'

featured: true
order: 1
---

Cardiac cine MRI segmentation across the full cardiac cycle is essential for
computing ejection fraction, ventricular volumes, and time-resolved functional
biomarkers, yet dense frame-level annotation remains costly. Conventional
supervised methods are typically trained on two clinically labeled key frames —
end diastole (ED) and end systole (ES) — leaving intermediate frames
unsegmented.

This work presents a zero-shot framework using MedSAM2, a medical video
foundation model, with a dual-anchored propagation strategy that prompts the
model at both ED and ES and merges bidirectional predictions at the temporal
midpoint. On ACDC, dual-anchored MedSAM2 reaches Dice of 0.850/0.809/0.843 for
RV/Myo/LV with HD95 of 2.94/2.81/3.76 mm and ASSD of 0.55/0.67/0.91 mm —
reducing mean HD95 and ASSD by approximately 51% and 62% versus single-anchor
propagation. Full-cycle propagation further supports LV time–volume curves and
time-resolved functional biomarkers beyond conventional ED/ES-derived metrics.
