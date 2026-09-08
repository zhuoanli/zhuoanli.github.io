---
title: 'Stress-Perfusion Classification with a CMR Foundation Model'
summary: >-
  Can foundation-model pretraining read stress perfusion? First pass: a
  fine-tuned cine-pretrained model flags abnormal series at AUC 0.860 across 4
  SCMR Registry centers (SCMR 2026, oral). Current pass goes segment-level —
  MAE pretraining on 19,363 unlabeled perfusion series, then localization of
  abnormalities across 5,280 graded segments, where the same architecture
  trained from scratch collapses.
period: '2025 — present'
role: 'Lead'
stack:
  - PyTorch
  - ConvViT (88.8M, MAE)
  - MONAI
  - Lightning
  - W&B
  - SLURM
metrics:
  - label: 'Pretraining'
    value: '580,890 frames'
    note: '19,363 unlabeled series · 5 sites'
  - label: 'Patient AUC'
    value: '0.710'
    note: 'vs 0.621 ResNet3D, p = 0.009'
  - label: 'Pretraining gain'
    value: '+0.10 AUC'
    note: 'random init collapses to 0.609'
links:
  project: /publications/scmr-perfusion
cover: ../../assets/projects/perfusion.webp
coverAlt: 'ROC curves at segment, series and patient level with AHA bullseye AUC maps, foundation model vs 3D ResNet.'
featured: true
order: 2
draft: false
---

Published at SCMR 2026 (oral, JCMR supplement); segment-level extension on
1,927 series / 600 patients prepared for SCMR 2027.
