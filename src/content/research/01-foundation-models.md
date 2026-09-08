---
title: Foundation models for medical imaging
# Must match an id in site.capabilities — the hero chips anchor to it.
id: foundation-models
summary: >-
  Pretrained vision models meet cardiac MRI: MedSAM2 for zero-shot cine
  segmentation, an MAE-pretrained ConvViT for stress-perfusion reading, and
  the question that decides whether any of it matters — what does pretraining
  actually buy on clinical data?
order: 1
pubs:
  - miua-4dseg
  - scmr-perfusion
  - scmr-fm-adapting
draft: false
---

Two threads. First, using foundation models as they are: MedSAM2, prompted at
the right frames, segments the full cardiac cycle without a single cardiac
label. Second, adapting them: a ConvViT pretrained by masked autoencoding on
unlabeled cardiac series, then fine-tuned to read stress perfusion — where the
identically trained random-initialization control collapses, making the value
of pretraining directly measurable.
