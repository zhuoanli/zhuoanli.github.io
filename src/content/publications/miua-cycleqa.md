---
title: 'Cross-Vendor Quality Assurance of Zero-Shot Full-Cycle 4D Cardiac Cine MRI Segmentation via Dual-Anchored Medical Video Foundation Model'
authors:
  - Zhuoan Li
venue: MIUA
venueLong: 'Medical Image Understanding and Analysis (MIUA) 2026, Springer LNCS — MÉTIS Special Session'
year: 2026
type: conference
status: published
anonymized: false

tldr: >-
  CycleQA turns disagreement between ED- and ES-anchored propagations into a
  label-free reliability signal: failure detection at AUROC 0.850 across 320
  unseen-vendor patients, and automatic reselection that cuts ejection-fraction
  error from 23.4 to 12.0 percentage points.
highlights:
  - 'Detects segmentation failures without reference masks, vendor labels or retraining — AUROC 0.850 (95% CI 0.811–0.888)'
  - 'Developed on 100 ACDC patients, evaluated untouched on 320 M&Ms patients across 4 manufacturers, 5 centers, 9 pathology groups'
  - 'Estimates Dice with MAE 0.072 (r = 0.814) using prediction disagreement alone'
  - 'Risk-based reselection reduces EF error from 23.4 to 12.0 pp and study-level failure rate from 54% to 15%, with no extra inference'
themes:
  - Quality assurance
  - Zero-shot
  - Clinical validation

links:
  code: https://github.com/zhuoanli/CycleQA

figure: ../../assets/pubs/miua-cycleqa.webp
figureAlt: 'Per-vendor degradation of zero-shot segmentation across Siemens, Philips, GE and Canon cohorts.'

featured: true
order: 2
---

Quality assurance limits the deployment of zero-shot cardiac segmentation:
performance can deteriorate across scanners, and without reference masks there
is no way to notice. CycleQA is a prediction-only framework — a fixed
dual-anchored MedSAM2 is initialized separately at ED and ES, each anchor
propagated across the complete cycle, and the disagreement between the two
predictions is used as the reliability measure.

Externally, mean absolute ejection-fraction error grows from 6.4 to 23.4
percentage points across vendors and the study-level failure rate rises from
11% to 54%. Training-free disagreement estimates Dice with an MAE of 0.072
(r = 0.814) and detects failures at AUROC 0.850; a calibrated model stays
discriminative on unseen Canon examinations (AUROC 0.806) where an
appearance-based out-of-distribution detector reaches only 0.573. Selecting
the lowest-risk prediction per study reduces EF error to 12.0 pp and the
failure rate to 15% without additional segmentation inference.
