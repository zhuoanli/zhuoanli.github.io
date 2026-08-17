/**
 * BibTeX is generated from the frontmatter that already exists rather than
 * maintained as a second copy alongside it — one less thing to keep in sync.
 * If `links.bibtex` is filled in, that hand-written entry wins.
 */

import type { Publication } from './collections';

const ENTRY_TYPE: Record<Publication['data']['type'], string> = {
  conference: 'inproceedings',
  journal: 'article',
  workshop: 'inproceedings',
  abstract: 'inproceedings',
  preprint: 'misc',
};

/** Strips the equal-contribution marker; BibTeX has no notion of it. */
const cleanName = (a: string) => a.trim().replace(/\*$/, '').trim();

const asciiSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

export function bibtexKey(pub: Publication): string {
  const first = pub.data.authors[0];
  const surname = first ? asciiSlug(cleanName(first).split(/\s+/).at(-1) ?? '') : 'anon';
  const word =
    pub.data.title
      .split(/\s+/)
      .map(asciiSlug)
      .find((w) => w.length > 3) ?? 'untitled';
  return `${surname || 'anon'}${pub.data.year}${word}`;
}

export function toBibtex(pub: Publication): string {
  if (pub.data.links.bibtex?.trim().startsWith('@')) return pub.data.links.bibtex.trim();

  const { data } = pub;
  const type = ENTRY_TYPE[data.type];
  const container = data.venueLong || data.venue;

  const fields: [string, string | undefined][] = [
    ['author', data.authors.map(cleanName).join(' and ') || undefined],
    // Double braces protect the capitalisation of acronyms like MRI and LV.
    ['title', `{${data.title}}`],
    [type === 'article' ? 'journal' : type === 'misc' ? 'howpublished' : 'booktitle', container],
    ['year', String(data.year)],
    ['doi', data.links.doi],
    ['url', data.links.arxiv || data.links.pdf],
  ];

  const body = fields
    .filter((f): f is [string, string] => Boolean(f[1]))
    .map(([k, v]) => `  ${k.padEnd(9)}= {${v}}`)
    .join(',\n');

  return `@${type}{${bibtexKey(pub)},\n${body}\n}`;
}
