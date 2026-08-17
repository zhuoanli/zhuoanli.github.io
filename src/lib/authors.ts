/**
 * Author-list rendering.
 *
 * Two conventions from the content schema are honoured here:
 *   - a trailing '*' on a name marks equal contribution
 *   - the site owner's name is emphasised, so a reader scanning a long author
 *     list finds you without reading it
 */

import { site } from '../data/site';

export type AuthorToken =
  | { kind: 'author'; name: string; isMe: boolean; equal: boolean }
  | { kind: 'gap' }
  | { kind: 'etal' };

const normalise = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '');

function parse(raw: string): { name: string; equal: boolean; isMe: boolean } {
  const trimmed = raw.trim();
  const equal = trimmed.endsWith('*');
  const name = equal ? trimmed.slice(0, -1).trim() : trimmed;
  return { name, equal, isMe: normalise(name) === normalise(site.name) };
}

export function hasEqualContribution(authors: readonly string[]): boolean {
  return authors.some((a) => a.trim().endsWith('*'));
}

/**
 * Turns the raw author array into tokens ready to render.
 *
 * When `max` truncates the list, the owner is spliced back in after an ellipsis
 * if the cut would have hidden them — a compact card that omits your own name
 * is worse than a slightly longer one.
 */
export function formatAuthors(
  authors: readonly string[],
  { max }: { max?: number } = {},
): AuthorToken[] {
  const parsed = authors.map(parse);

  if (max === undefined || parsed.length <= max) {
    return parsed.map((a) => ({ kind: 'author', ...a }));
  }

  const head = parsed.slice(0, max);
  const tokens: AuthorToken[] = head.map((a) => ({ kind: 'author', ...a }));

  const meIndex = parsed.findIndex((a) => a.isMe);
  if (meIndex >= max) {
    tokens.push({ kind: 'gap' });
    tokens.push({ kind: 'author', ...parsed[meIndex]! });
  }

  tokens.push({ kind: 'etal' });
  return tokens;
}
