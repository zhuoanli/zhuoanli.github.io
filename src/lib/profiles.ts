/**
 * The one list of external profiles.
 *
 * The footer, the CV page, the home page's contact card and the identity rail
 * all show these, and they used to each keep their own copy — so adding a
 * service meant editing four files and forgetting one. Order is deliberate:
 * it is the order an academic reader looks for them in.
 */

import { site } from '../data/site';

export type ProfileKey = 'scholar' | 'dblp' | 'orcid' | 'github' | 'linkedin';

export interface Profile {
  key: ProfileKey;
  label: string;
  href: string;
}

const ORDER: { key: ProfileKey; label: string }[] = [
  { key: 'scholar', label: 'Google Scholar' },
  { key: 'dblp', label: 'DBLP' },
  { key: 'orcid', label: 'ORCID' },
  { key: 'github', label: 'GitHub' },
  { key: 'linkedin', label: 'LinkedIn' },
];

/**
 * Only profiles with a URL — an empty entry in site.ts renders nothing.
 *
 * `exclude` trims the list for one surface without hiding the profile
 * everywhere: the contact card keeps to the few people actually click, while
 * the identity rail and the footer still carry the full set.
 */
export function getProfiles(exclude: ProfileKey[] = []): Profile[] {
  return ORDER.filter(({ key }) => !exclude.includes(key))
    // `site` is `as const`, so these are literal types until widened — and a
    // type predicate cannot narrow `string` down to a literal union.
    .map(({ key, label }): Profile => ({ key, label, href: String(site.links[key] ?? '') }))
    .filter((p) => Boolean(p.href));
}
