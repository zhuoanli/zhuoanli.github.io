/**
 * The CV is structured data, not prose, so it lives here rather than in a
 * markdown collection.
 *
 * The page renders whatever sections this array contains, in order — add,
 * remove or reorder a section by editing this file only. Empty sections are
 * skipped, so a half-filled CV still renders cleanly.
 *
 * Everything marked TODO is a placeholder. I did not invent dates, titles,
 * advisors or awards; fill them in and delete the marker.
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
        period: 'TODO — present',
        title: 'TODO: degree (e.g. PhD, Electrical & Computer Engineering)',
        org: 'Purdue University',
        location: 'West Lafayette, IN',
        detail: 'TODO: advisor, lab, or thesis topic',
      },
      {
        period: 'TODO',
        title: 'TODO: prior degree',
        org: 'TODO: institution',
      },
    ],
  },
  {
    id: 'experience',
    label: 'Experience',
    kind: 'timeline',
    entries: [
      {
        period: 'TODO',
        title: 'TODO: role',
        org: 'TODO: group or company',
        detail: 'TODO: one line on what you actually did',
      },
    ],
  },
  {
    id: 'awards',
    label: 'Awards & honours',
    kind: 'timeline',
    entries: [],
  },
  {
    id: 'talks',
    label: 'Talks & posters',
    kind: 'timeline',
    entries: [],
  },
  {
    id: 'teaching',
    label: 'Teaching',
    kind: 'timeline',
    entries: [],
  },
  {
    id: 'service',
    label: 'Service & reviewing',
    kind: 'timeline',
    entries: [],
  },
  {
    id: 'skills',
    label: 'Technical',
    kind: 'tags',
    groups: [
      { label: 'TODO: category', items: ['TODO', 'TODO'] },
    ],
  },
];
