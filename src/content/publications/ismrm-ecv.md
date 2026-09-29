---
title: 'Deep Learning-based Estimation of Myocardial Extracellular Volume Without Blood Sampling: Multicenter Study in 9,700 Patients'
# The presentation title slide credits "Zhuoan Li, Purdue University"; the
# LinkedIn post thanks collaborators (Youssef, Polsani, Elliott, Dharmakumar,
# Judd, Shah, Simonetti, Tong, Sharif) without an ordered author list.
# TODO: complete the list from the accepted abstract when convenient.
authors:
  - Zhuoan Li
venue: ISMRM
venueLong: 'ISMRM Annual Meeting 2026, Cape Town · Oral, Advanced Cardiac Quantification Methods session · Summa Cum Laude Merit Award'
year: 2026
type: abstract
status: published
anonymized: false

tldr: >-
  A multi-stage deep learning framework estimates hematocrit from routine CMR
  variables and derives synthetic myocardial extracellular volume without a
  same-day blood draw. Across 9,700 multicenter examinations it improves
  hematocrit recovery (r 0.691 vs 0.642 for the published-formula baseline)
  and flags abnormal ECV at AUC 0.957, with the largest gains near the
  clinical decision threshold. Recognized with an ISMRM Summa Cum Laude Merit
  Award.
highlights:
  - '9,700 examinations, 8,823 patients, 4 centers: the largest synthetic-ECV validation cohort to date'
  - 'Leakage-free feature optimization over all 511 predictor subsets on a patient-level locked test split'
  - 'Hematocrit correlation rises from 0.642 to 0.691 (p = 0.0002) over the linear-regression baseline; abnormal-ECV AUC 0.957'
  - 'Holds up externally: AUC 0.938 on an independent 85-exam cohort, with improved performance for cases near the clinical decision threshold'
themes:
  - Registry scale
  - Clinical validation

links:
  recording: https://drive.google.com/file/d/18REmlWWBA211Ov6ljbllIbq8GdcKhk4T/view

figure: ../../assets/pubs/ismrm-ecv.webp
figureAlt: 'Method pipeline: multicenter CMR feature pool, leakage-free feature ranking and selection, and a multi-stage deep learning model that outputs predicted hematocrit.'

featured: true
order: 4
---

Extracellular volume mapping needs a same-day hematocrit, which means a blood
draw, the one step of a CMR tissue-characterization exam that is not
image-derived. This study asks how far routine CMR variables can substitute
for it at registry scale.

A multi-stage ensemble of Bayesian-regularized networks (1,600 networks in
total) estimates hematocrit from routine CMR variables and propagates it
through the ECV equation, with the predictor subset chosen leakage-free from
all 511 combinations of nine routine variables. On a locked 1,500-exam test
split, synthetic ECV correlates with measured ECV at R = 0.938 and detects
abnormal ECV (> 30%) at AUC 0.957, holding at 0.938 on an external cohort.
Performance improves most where it matters clinically: cases near the
abnormal-ECV decision threshold. Presented as an oral at ISMRM 2026 in Cape
Town (Advanced Cardiac Quantification Methods) and recognized with a Summa
Cum Laude Merit Award.
