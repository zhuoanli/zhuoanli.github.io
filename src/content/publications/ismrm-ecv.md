---
title: 'Deep Learning-based Estimation of Myocardial Extracellular Volume Without Blood Sampling: Multicenter Study in 9,700 Patients'
# TODO: the CV lists this as "Zhuoan Li, et al." — complete the author list
# from the accepted abstract before the site goes public. Only the first
# author is asserted here because the rest could not be verified on disk.
authors:
  - Zhuoan Li
venue: ISMRM
venueLong: 'ISMRM Annual Meeting 2026 — Oral Presentation, Summa Cum Laude Merit Award'
year: 2026
type: abstract
status: published
anonymized: false

tldr: >-
  A 1,600-network stacked ensemble over 9,700 multicenter CMR examinations
  estimates hematocrit without a blood draw (r = 0.691 vs 0.642 for the
  published-formula baseline) and flags abnormal ECV at AUC 0.957 — recognized
  with an ISMRM Summa Cum Laude Merit Award.
highlights:
  - '9,700 examinations / 8,823 patients across 4 centers — the largest synthetic-ECV validation cohort to date'
  - 'Leakage-free feature optimization over all 511 predictor subsets; patient-level locked test split'
  - 'Hematocrit correlation 0.642 → 0.691 (p = 0.0002) over the linear-regression baseline; abnormal-ECV AUC 0.957'
  - 'Holds up externally: AUC 0.938 on an independent 85-exam cohort'
themes:
  - Registry scale
  - Clinical validation

links: {}

featured: true
order: 4
---

Extracellular volume mapping needs a same-day hematocrit, which means a blood
draw — the one step of a CMR tissue-characterization exam that is not
image-derived. This study asks how far routine CMR variables can substitute
for it at registry scale.

A multistage ensemble of Bayesian-regularized networks (1,600 networks total),
with the predictor subset chosen leakage-free from all 511 combinations of
nine routine variables, estimates hematocrit and propagates it through the ECV
equation. On a locked 1,500-exam test split, synthetic ECV correlates with
measured ECV at R = 0.938 and detects abnormal ECV (> 30%) at AUC 0.957,
holding at 0.938 on an external cohort.
