---
title: 'Large Language Model Reasoning for Cardiac Pathology Classification from Segmentation-Derived Metrics'
authors:
  - Zhuoan Li
  - Behzad Sharif
venue: MIUA
venueLong: 'Medical Image Understanding and Analysis (MIUA) 2026 — Short Paper'
year: 2026
type: conference
status: published
anonymized: false

tldr: >-
  Clinically calibrated chain-of-thought prompting lifts zero-shot cardiac
  pathology classification from segmentation-derived metrics to 60% accuracy —
  and the persistent failure on HCM shows the bottleneck is the input, not the
  prompt.
highlights:
  - 'Clinically calibrated CoT: 60% accuracy (Macro-F1 0.510) vs 55% direct prompting and 40% naive CoT'
  - 'Rule-based EF baseline reaches only 45% on the same metrics'
  - 'HCM F1 = 0.000 in every configuration: wall-thickness pathologies are invisible to EF/EDV/ESV alone — an input-level information bottleneck, not a prompting failure'
  - 'Small cohort (n = 20) stated plainly: trends, not statistically certified gains'
themes:
  - Foundation models
  - Zero-shot

links: {}

figure: ../../assets/pubs/miua-llm.webp
figureAlt: 'Prompting strategies compared: direct classification, naive chain-of-thought, and clinically calibrated chain-of-thought with diagnostic thresholds.'

featured: false
order: 3
---

Automated cardiac MRI pipelines can extract clinical metrics — ejection
fraction, end-diastolic and end-systolic volumes — from segmentation masks,
but turning those numbers into a pathology call still requires specialist
reasoning. This short paper asks whether a large language model can bridge
that gap zero-shot.

Using metrics derived from MedSAM2 segmentations of ACDC studies, three
prompting strategies are compared: direct classification, naive
chain-of-thought, and clinically calibrated chain-of-thought with explicit
diagnostic thresholds and a grounding example. Naive CoT underperforms direct
prompting (40% vs 55%); calibrated CoT reaches 60%. The consistent failure to
identify hypertrophic cardiomyopathy from cavity-only metrics reveals an
input-level information bottleneck: wall-thickness-based pathologies need
morphology beyond EF, EDV and ESV.
