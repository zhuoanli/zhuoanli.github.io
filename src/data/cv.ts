/**
 * The CV is structured data, not prose, so it lives here rather than in a
 * markdown collection. The page renders whatever sections this array contains,
 * in order; empty sections are skipped.
 *
 * Two deliberate rules, by the owner's request: education entries carry no
 * advisor lines, and no lab name appears anywhere. Publication author lists
 * (the bibliographic record) are unaffected.
 *
 * Source: CV_ZhuoanLi_2026.9.2.docx, with the reviewer list updated per the
 * owner (the docx predates ISMRM 2026 / MICCAI 2026 / SCMR 2027 invitations).
 */

export interface CvEntry {
  /** Left column. Keep the format consistent: '2024 — present', '2023'. */
  period: string;
  title: string;
  org?: string;
  location?: string;
  /** One line of context. Optional — most entries do not need it. */
  detail?: string;
  links?: { label: string; href: string }[];
}

export type CvSection =
  | { id: string; label: string; kind: 'timeline'; entries: CvEntry[] }
  | { id: string; label: string; kind: 'tags'; groups: { label: string; items: string[] }[] };

export const cv: CvSection[] = [
  {
    id: 'education',
    label: 'Education',
    kind: 'timeline',
    entries: [
      {
        period: 'Aug 2022 — May 2027 (exp.)',
        title: 'PhD, Biomedical Engineering',
        org: 'Purdue University',
        location: 'West Lafayette, IN',
        detail: 'GPA 4.0/4.0. Research: deep learning and foundation models for medical imaging.',
      },
      {
        period: 'Jan 2023 — May 2024',
        title: 'MS, Electrical & Computer Engineering',
        org: 'Purdue University',
        detail: 'Deep Learning (A+), Artificial Intelligence, ML in Bioinformatics and Healthcare.',
      },
      {
        period: 'May — Dec 2024',
        title: 'Certificate, Regulatory Affairs and Regulatory Science for Medical Devices',
        org: 'Purdue University',
        detail: 'Quality systems for regulatory compliance.',
      },
      {
        period: 'Sep 2018 — Jun 2022',
        title: 'BEng, Biomedical Engineering',
        org: 'ShanghaiTech University',
        location: 'Shanghai, China',
      },
      {
        period: 'Aug — Dec 2021',
        title: 'Global Engineering Exchange Program',
        org: 'University of California, Berkeley',
        detail: 'GPA 4.0/4.0 — CS 61A, Medical Imaging Signals and Systems, Engineering Devices.',
      },
    ],
  },
  {
    id: 'experience',
    label: 'Experience',
    kind: 'timeline',
    entries: [
      {
        period: 'Aug 2022 — present',
        title: 'Graduate Research Assistant',
        org: 'Purdue University',
        detail:
          'Foundation models and LLMs for cardiac MRI: zero-shot cine segmentation, label-free quality assurance, registry-scale tissue characterization and perfusion classification.',
      },
      {
        period: '2020 — 2022',
        title: 'Undergraduate Researcher',
        org: 'ShanghaiTech University',
        detail:
          'Deep-learning photoacoustic reconstruction (first-author EMBC 2021) and carotid vessel-wall segmentation (2nd prize, SMRA/MICCAI 2021 challenge).',
      },
    ],
  },
  {
    id: 'awards',
    label: 'Awards & honours',
    kind: 'timeline',
    entries: [
      {
        period: '2026',
        title: 'ISMRM Summa Cum Laude Merit Award',
        detail: 'Top-tier ISMRM merit award; first-author oral presentation.',
      },
      {
        period: '2026',
        title: 'SMRA Travel Award',
      },
      {
        period: '2026',
        title: 'Travel Grant Award, College of Engineering',
        org: 'Purdue University',
      },
      {
        period: '2026',
        title: 'Imaging-area Professional Development Award, Weldon School of BME',
        org: 'Purdue University',
      },
      {
        period: '2025 · 2026',
        title: 'ISMRM Educational Stipend',
      },
      {
        period: '2025',
        title: 'SCMR Travel Award',
      },
      {
        period: '2024',
        title: 'Innovation for Clinical Translation Fellowship',
        org: 'Purdue University & IU School of Medicine',
      },
      {
        period: '2021',
        title: '2nd Prize, Carotid Artery Vessel Wall Segmentation Challenge',
        org: 'SMRA 2021 & MICCAI 2021',
      },
      {
        period: '2020 · 2021',
        title: 'Mathematical Contest in Modeling — Finalist (top 2%) & Honorable Mention',
      },
      {
        period: '2018 — 2022',
        title: 'Outstanding Graduate & Merit Student (all semesters)',
        org: 'ShanghaiTech University',
      },
      {
        period: '2022',
        title: 'Special Scholarship for Studying Abroad',
        org: 'ShanghaiTech University',
      },
    ],
  },
  {
    id: 'service',
    label: 'Service & reviewing',
    kind: 'timeline',
    entries: [
      {
        period: '2025 — present',
        title: 'Reviewer',
        detail: 'ISMRM 2026 · MICCAI 2025 · MICCAI 2026 · SCMR 2027',
      },
    ],
  },
  {
    id: 'teaching',
    label: 'Teaching',
    kind: 'timeline',
    entries: [
      {
        period: 'Spring 2024',
        title: 'Graduate Teaching Assistant — Bioinstrumentation & Circuits',
        org: 'Purdue University',
        detail: 'Ran three weekly 3-hour circuit lab sessions; graded and mentored.',
      },
    ],
  },
  {
    id: 'skills',
    label: 'Technical',
    kind: 'tags',
    groups: [
      { label: 'Languages', items: ['Python (PyTorch)', 'MATLAB', 'R', 'Julia'] },
      {
        label: 'Tools',
        items: ['Git', 'SLURM (HPC)', 'Weights & Biases', 'LaTeX', 'Horos', 'ITK-SNAP'],
      },
      { label: 'Spoken', items: ['Chinese (native)', 'English (fluent)'] },
    ],
  },
];
