/**
 * Page-level prose, kept out of the templates.
 *
 * Two reasons. First, editing the wording of a page should not mean reading
 * JSX. Second, this is the i18n seam: a future `copy.zh.ts` mirrors this shape
 * and the templates never change.
 *
 * Voice note: declarative, no adjective doing work a number could do. Matches
 * the statement in site.ts.
 */

export const copy = {
  home: {
    selected: {
      eyebrow: 'Selected work',
      title: 'Selected work',
      lede: 'Three papers that carry most of the argument. The rest are on the publications page.',
      empty: 'Papers marked `featured: true` appear here.',
      more: 'All publications',
    },
    research: {
      eyebrow: 'Research',
      title: 'What I work on',
      lede: 'Four threads. They share a question: where do foundation models quietly fail, and how would you know?',
      empty: 'Research themes appear here once src/content/research/ has entries.',
      more: 'Read the long version',
    },
    news: {
      eyebrow: 'News',
      empty: 'No news yet.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Get in touch',
      lede: 'I read everything, and I answer questions about the work in more detail than most people expect.',
    },
  },

  research: {
    eyebrow: 'Research',
    title: 'Research',
    lede: 'The threads that connect the papers, and why each one exists.',
    empty:
      'Research themes live in src/content/research/. Copy src/content/_templates/research.md to add one.',
    relatedLabel: 'Related work',
  },

  publications: {
    eyebrow: 'Publications',
    title: 'Publications',
    lede: 'Newest first. Papers under review at anonymous venues show title and venue only.',
    empty:
      'Publications live in src/content/publications/. Copy src/content/_templates/publication.md to add one.',
    filterLabel: 'Filter by topic',
    filterAll: 'All',
    equalNote: '* Equal contribution.',
    redactedNote: 'Under double-blind review — details withheld until a decision.',
    noMatch: 'No publications match that topic.',
  },

  publication: {
    backLabel: 'All publications',
    tldrLabel: 'In one sentence',
    highlightsLabel: 'What it shows',
    citeLabel: 'Cite',
    copyBibtex: 'Copy BibTeX',
    copiedBibtex: 'Copied',
    themesLabel: 'Topics',
  },

  projects: {
    eyebrow: 'Projects',
    title: 'Projects',
    lede: 'Code, tooling and infrastructure — the things that had to exist before the papers could.',
    empty:
      'Projects live in src/content/projects/. Copy src/content/_templates/project.md to add one.',
  },

  cv: {
    eyebrow: 'Curriculum vitae',
    title: 'Curriculum vitae',
    printLabel: 'Print / Save as PDF',
    pdfLabel: 'Download PDF',
    empty: 'This section is not filled in yet.',
  },

  notFound: {
    eyebrow: 'Error 404',
    title: 'No page here',
    lede: 'The link is broken or the page moved. The main sections are all one click away.',
  },
} as const;
