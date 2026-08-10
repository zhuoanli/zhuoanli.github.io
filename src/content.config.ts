import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const link = z
  .object({
    pdf: z.string().optional(),
    code: z.string().optional(),
    arxiv: z.string().optional(),
    doi: z.string().optional(),
    poster: z.string().optional(),
    slides: z.string().optional(),
    bibtex: z.string().optional(),
    project: z.string().optional(),
  })
  .default({});

const publications = defineCollection({
  loader: glob({ base: './src/content/publications', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Use the exact author order. Mark yourself so the site can bold it. */
      authors: z.array(z.string()).default([]),
      /** '*' after a name in `authors` marks equal contribution; kept verbatim. */
      venue: z.string(),
      venueLong: z.string().optional(),
      year: z.number(),
      type: z.enum(['conference', 'journal', 'workshop', 'abstract', 'preprint']),

      /**
       * `under-review` + `anonymized: true` renders title, venue and status
       * only — no abstract, no numbers, no figure, no PDF. Double-blind venues
       * treat an author-identified posting as a policy breach, and a rejected
       * paper is far more expensive than a thinner card. Flip `anonymized` to
       * false the day it is accepted and the full entry appears.
       */
      status: z.enum(['published', 'accepted', 'under-review', 'in-preparation']).default('published'),
      anonymized: z.boolean().default(false),

      /** One sentence. Shows on the card; the body markdown shows on hover/detail. */
      tldr: z.string().optional(),
      highlights: z.array(z.string()).default([]),
      /** Cross-references src/data themes; drives /research grouping. */
      themes: z.array(z.string()).default([]),
      links: link,
      figure: image().optional(),
      figureAlt: z.string().optional(),
      featured: z.boolean().default(false),
      /** Lower sorts first within a year. */
      order: z.number().default(0),
    }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      period: z.string(),
      role: z.string().optional(),
      stack: z.array(z.string()).default([]),
      /** Rendered as a compact metric strip at the top of the card. */
      metrics: z
        .array(z.object({ label: z.string(), value: z.string(), note: z.string().optional() }))
        .default([]),
      links: link,
      cover: image().optional(),
      coverAlt: z.string().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(0),
      draft: z.boolean().default(false),
    }),
});

const news = defineCollection({
  loader: glob({ base: './src/content/news', pattern: '**/*.md' }),
  schema: z.object({
    date: z.coerce.date(),
    text: z.string(),
    link: z.string().optional(),
    pinned: z.boolean().default(false),
  }),
});

export const collections = { publications, projects, news };
