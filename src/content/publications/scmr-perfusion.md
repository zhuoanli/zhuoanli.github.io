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
venueLong: 'Journal of Cardiovascular Magnetic Resonance 28, Suppl. 1 · SCMR 2026 · Oral Presentation'
year: 2026
type: abstract
status: published
anonymized: false

tldr: >-
  Fine-tuning a CMR foundation model pretrained on unlabeled cine data flags
  abnormal stress first-pass perfusion series at AUC 0.860 ± 0.013 across 433
  series from 4 SCMR Registry centers, ahead of a 3D CNN (0.832) and a 3D
  ResNet (0.726), and with the lowest variability across folds in this
  heterogeneous multicenter setting.
highlights:
  - '433 motion-corrected stress first-pass perfusion series, 158 patients, 4 SCMR Registry centers'
  - 'Foundation model AUC 0.860 ± 0.013 vs CNN 0.832 ± 0.017 and 3D ResNet 0.726 ± 0.038 (5-fold CV), with the smallest fold-to-fold spread'
  - 'Label: summed 17-segment perfusion score of 2 or more, a clinically graded target, not a proxy'
themes:
  - Foundation models
  - Registry scale
  - Clinical validation

links:
  doi: https://doi.org/10.1016/j.jocmr.2025.102237
  recording: https://drive.google.com/file/d/16Y-MgCWwAahMrZxWqXU1tU4jQEW5Sggz/view

figure: ../../assets/pubs/scmr-perfusion.webp
figureAlt: 'Framework: masked autoencoder pretraining on cine CMR, then the pretrained encoder is fine-tuned to classify stress perfusion series as normal or abnormal.'

featured: false
order: 5
---

Stress first-pass perfusion CMR is an established tool for assessing
myocardial ischemia, but automated classification remains difficult in
heterogeneous multicenter data, where conventional CNN and ResNet
architectures lose robustness. This work fine-tunes a foundation model
pretrained on large unlabeled CMR datasets (a CNN encoder plus transformer
encoder) for binary normal vs abnormal classification of stress perfusion
series from the SCMR Registry.

Across 433 motion-corrected series from 158 patients at four centers, the
foundation model reaches AUC 0.860 ± 0.013 under 5-fold cross-validation,
exceeding a 3D CNN (0.832 ± 0.017) and a 3D ResNet (0.726 ± 0.038), and shows
the lowest variability across folds. Ground truth comes from clinically
graded 17-segment perfusion scores rather than a proxy label.
