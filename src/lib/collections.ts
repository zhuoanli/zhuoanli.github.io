/**
 * Every content query the site makes goes through here.
 *
 * Pages call these instead of `getCollection` directly, so sorting rules and —
 * more importantly — the double-blind redaction rule live in exactly one place
 * and cannot drift between the list page, the home page and the detail route.
 */

import { getCollection, type CollectionEntry } from 'astro:content';

export type Publication = CollectionEntry<'publications'>;
export type Project = CollectionEntry<'projects'>;
export type ResearchTheme = CollectionEntry<'research'>;
export type NewsItem = CollectionEntry<'news'>;

/**
 * The single source of truth for double-blind compliance.
 *
 * A paper under review at an anonymous venue may not be linked to its authors.
 * Renderers ask this question and, when the answer is yes, show the title,
 * venue and status and nothing else — and the detail route refuses to generate
 * a page at all. See the note in content.config.ts.
 */
export function isRedacted(pub: Publication): boolean {
  return pub.data.status === 'under-review' && pub.data.anonymized;
}

/** Newest first; ties broken by `order` (lower first), then title. */
export async function getPublications(): Promise<Publication[]> {
  const pubs = await getCollection('publications');
  return pubs.sort(
    (a, b) =>
      b.data.year - a.data.year ||
      a.data.order - b.data.order ||
      a.data.title.localeCompare(b.data.title),
  );
}

export interface YearGroup {
  year: number;
  items: Publication[];
}

/** Groups an already-sorted list into descending year buckets. */
export function groupByYear(pubs: Publication[]): YearGroup[] {
  const groups: YearGroup[] = [];
  for (const pub of pubs) {
    const last = groups.at(-1);
    if (last && last.year === pub.data.year) last.items.push(pub);
    else groups.push({ year: pub.data.year, items: [pub] });
  }
  return groups;
}

export async function getFeaturedPublications(limit = 3): Promise<Publication[]> {
  const pubs = await getPublications();
  return pubs.filter((p) => p.data.featured).slice(0, limit);
}

/** Every theme tag in use, deduped and alphabetised — drives the filter row. */
export function allThemes(pubs: Publication[]): string[] {
  return [...new Set(pubs.flatMap((p) => p.data.themes))].sort((a, b) => a.localeCompare(b));
}

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return projects.sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title),
  );
}

export async function getResearchThemes(): Promise<ResearchTheme[]> {
  const themes = await getCollection('research', ({ data }) => !data.draft);
  return themes.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

/** Pinned items float to the top; everything else is newest first. */
export async function getNews(limit?: number): Promise<NewsItem[]> {
  const news = await getCollection('news');
  const sorted = news.sort(
    (a, b) =>
      Number(b.data.pinned) - Number(a.data.pinned) ||
      b.data.date.getTime() - a.data.date.getTime(),
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

/** Resolves the `pubs: [...]` cross-reference on a research theme. */
export function resolvePubs(all: Publication[], ids: readonly string[]): Publication[] {
  return ids.map((id) => all.find((p) => p.id === id)).filter((p): p is Publication => Boolean(p));
}
