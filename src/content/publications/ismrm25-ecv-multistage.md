---
title: 'Quantification of Extracellular Volume Fraction in Cardiac MRI without Blood Sampling Using Multi-Stage Training Deep Learning'
# Author list and affiliations from the ISMRM 2025 proceedings (abstract 0232).
authors:
  - Zhuoan Li
  - Khalid Youssef
  - Mehdi Amian
  - Dilek M. Yalcinkaya
  - Venkateshwar Polsani
  - Michael Elliott
  - Rohan Dharmakumar
  - Robert Judd
  - Dipan Shah
  - Orlando Simonetti
  - Matthew Tong
  - Behzad Sharif
venue: ISMRM
venueLong: 'ISMRM Annual Meeting 2025 · Abstract 0232'
year: 2025
type: abstract
status: published
anonymized: false

tldr: >-
  A multi-stage deep learning model predicts hematocrit from multicenter CMR
  T1 values and clinical features, identifying native blood-pool T1 plus sex
  as the optimal feature set: correlation with true hematocrit rises from
  0.59 (linear regression) to 0.65, and synthetic ECV agrees with true ECV at
  R = 0.95, removing the blood draw from ECV quantification.
highlights:
  - 'Multi-stage deep learning over multicenter CMR T1 values and clinical features, no blood sampling required'
  - 'Native blood-pool T1 and sex emerge as the optimal feature combination'
  - 'Hematocrit correlation 0.65 vs 0.59 for linear regression; synthetic vs true ECV R = 0.95'
  - 'The intermediate step between the SCMR 2025 initial results and the 9,700-exam ISMRM 2026 study'
themes:
  - Registry scale
  - Clinical validation

links:
  doi: https://doi.org/10.58530/2025/0232
  recording: https://drive.google.com/file/d/1IbrDnEgxhynBp4QBRDgcrftWf6hNWca3/view

featured: false
order: 2
---

Blood sampling for hematocrit limits the clinical use of extracellular
volume fraction in diagnosing myocardial disease. This abstract develops a
multi-stage deep learning model that predicts hematocrit directly from
multicenter CMR data, asking whether features beyond blood-pool T1 improve
predictability across centers.

The model identifies native blood-pool T1 and sex as the optimal feature
set, achieving higher correlation with true hematocrit (R = 0.65) than
linear regression (R = 0.59) and strong agreement between synthetic and true
ECV (R = 0.95). Incorporating additional features in a deep learning model
enhances hematocrit prediction from CMR data, eliminating the need for a
same-day blood draw and streamlining ECV measurement.
