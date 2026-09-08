---
title: Clinical validation
id: clinical
summary: >-
  A method that works on one scanner is a demo. Cross-vendor evaluation on 320
  M&Ms patients, label-free failure detection at AUROC 0.850, and reselection
  that cuts ejection-fraction error in half — the part that decides whether
  any of it can be deployed.
order: 3
pubs:
  - miua-cycleqa
  - scmr-uncertainty
  - scmr-qc
figure: ../../assets/pubs/miua-cycleqa.webp
figureAlt: 'Zero-shot segmentation quality degrading across Siemens, Philips, GE and Canon cohorts.'
draft: false
---

Zero-shot segmentation degrades quietly on unseen scanners: EF error nearly
quadruples across vendors, and half the studies fail — with no reference masks
to say so. CycleQA turns the disagreement between two propagation directions
into the missing quality signal: it estimates Dice without ground truth,
detects failures across four manufacturers, and picks the safest prediction
per study. The same clinician-in-the-loop instinct runs through the SCMR
Registry work on uncertainty-guided perfusion analysis.
