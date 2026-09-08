---
title: Working at registry scale
id: scale
summary: >-
  Methods that survive one benchmark often fail the registry. The largest
  synthetic-ECV validation to date — 9,700 exams across 4 centers — plus a
  1.3M-sentence MRI report corpus for studying what pretraining objectives
  actually learn.
order: 4
pubs:
  - ismrm-ecv
  - scmr-hematocrit
draft: false
---

Scale changes the questions. At 9,700 examinations, feature selection has to
be provably leakage-free (all 511 predictor subsets, patient-level locked
splits), calibration differences between men and women stop being noise, and a
same-day blood draw versus a 30-day-old one becomes a measurable modeling
decision. The same instinct drives corpus work on how negation — the majority
of radiology text — is absorbed, or ignored, by vision–language pretraining.
