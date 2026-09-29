---
title: 'Efficient Analysis of Myocardial Perfusion MRI with Human-in-the-loop Dynamic Quality Control: Initial Results Using the SCMR Registry'
# Author list from the ISMRM 2024 proceedings (abstract 1206).
authors:
  - Dilek M. Yalcinkaya
  - Zhuoan Li
  - Khalid Youssef
  - Bobak Heydari
  - Rohan Dharmakumar
  - Robert Judd
  - Orlando Simonetti
  - Subha Raman
  - Behzad Sharif
venue: ISMRM
venueLong: 'ISMRM Annual Meeting 2024 · Abstract 1206'
year: 2024
type: abstract
status: published
anonymized: false

tldr: >-
  A dynamic quality control map built from the discrepancy between
  patch-based segmentations flags unreliable timeframes in free-breathing
  perfusion CMR; referring only those flagged frames to a human markedly
  improves segmentation accuracy over random referral at the same budget.
highlights:
  - 'dQC map derived from patch-based segmentation discrepancy, quantified into a per-timeframe metric'
  - 'Human-in-the-loop referral of dQC-flagged timeframes beats random referral at equal reviewer effort'
  - 'Evaluated on free-breathing stress perfusion datasets from the SCMR Registry'
themes:
  - Quality assurance
  - Registry scale

links:
  doi: https://doi.org/10.58530/2024/1206

featured: false
order: 3
---

Accurate segmentation of free-breathing myocardial perfusion MRI is a
labor-intensive but necessary preprocessing step, and deep learning
segmentation of these datasets has lacked a quality control tool. This
abstract derives a dynamic quality control (dQC) map from the discrepancy
between patch-based segmentations and quantifies it into a per-timeframe
metric.

Referring the dQC-detected timeframes to a human reviewer markedly improves
segmentation results compared with referring a random subset of equal size,
showing that the metric concentrates reviewer effort where the model
actually fails. The approach makes clinician-in-the-loop analysis of
registry-scale perfusion data practical.
