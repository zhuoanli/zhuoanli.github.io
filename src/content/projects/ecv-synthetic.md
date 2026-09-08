---
title: 'Blood-Sampling-Free Myocardial ECV Estimation'
summary: >-
  ECV mapping needs a same-day hematocrit — the one step of a CMR
  tissue-characterization exam that still requires a blood draw. This project
  replaces it: a 1,600-network multistage ensemble estimates hematocrit from
  nine routine CMR variables, with the feature subset chosen leakage-free from
  all 511 combinations, validated on the largest synthetic-ECV cohort to date.
period: '2024 — present'
role: 'Lead'
stack:
  - MATLAB
  - Python
  - NumPy / SciPy
  - scikit-learn
metrics:
  - label: 'Cohort'
    value: '9,700 exams'
    note: '8,823 patients · 4 centers'
  - label: 'Abnormal-ECV AUC'
    value: '0.957'
    note: 'external cohort 0.938'
  - label: 'Hematocrit r'
    value: '0.691'
    note: 'vs 0.642 baseline, p = 0.0002'
links:
  project: /publications/ismrm-ecv
cover: ../../assets/projects/ecv.webp
coverAlt: 'Synthetic vs measured ECV agreement (R = 0.938) and hematocrit-correlation comparison with confidence intervals.'
featured: true
order: 1
draft: false
---

Recognized with an ISMRM 2026 Summa Cum Laude Merit Award (oral presentation);
first-author manuscript in preparation for JCMR. Earlier stage published as an
SCMR 2025 oral abstract.
