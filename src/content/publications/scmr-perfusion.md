---
title: 'Leveraging a CMR Foundation Model for Automated Classification of Stress Perfusion CMR Datasets: Initial Results Using the SCMR Registry'
# Author list follows the references.bib citation of the published version.
# The submitted docx carries a different list (Li, Sahin, Elliot, Polsani,
# Tong, Shah, Simonetti, Sharif) — TODO: confirm which matches the JCMR
# supplement and correct if needed.
authors:
  - Zhuoan Li
  - M. B. Shahin
  - D. M. Yalcinkaya
  - A. M. Sohi
  - L. Zamudio Rivero
  - M. Elliott
  - K. Youssef
  - B. Sharif
venue: JCMR (SCMR 2026)
venueLong: 'Journal of Cardiovascular Magnetic Resonance 28, Suppl. 1 — SCMR 2026, Oral Presentation'
year: 2026
type: abstract
status: published
anonymized: false

tldr: >-
  Fine-tuning an MAE-pretrained cardiac cine foundation model flags abnormal
  stress-perfusion series at AUC 0.860 ± 0.013 across 433 series from 4 SCMR
  Registry centers — ahead of a CNN (0.832) and a 3D ResNet (0.726).
highlights:
  - '433 motion-corrected stress first-pass perfusion series, 158 patients, 4 SCMR Registry centers'
  - 'Foundation model AUC 0.860 ± 0.013 vs CNN 0.832 ± 0.017 and 3D ResNet 0.726 ± 0.038 (5-fold CV)'
  - 'Label: summed 17-segment perfusion score ≥ 2 — a clinically graded target, not a proxy'
themes:
  - Foundation models
  - Registry scale
  - Clinical validation

links:
  doi: https://doi.org/10.1016/j.jocmr.2025.102237

featured: false
order: 5
---
