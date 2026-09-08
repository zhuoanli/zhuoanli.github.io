/**
 * Single source of truth for everything that names or points at you.
 *
 * Anything marked TODO is a placeholder I could not verify — replace before the
 * site goes public. Everything else is drawn from your actual working tree.
 */

export const site = {
  name: 'Zhuoan Li',
  // TODO: confirm — shown in the <title> suffix and structured data
  nameCn: '',

  /** One line. It sits under your name in the hero and nowhere else. */
  tagline: 'AI for medical imaging',

  /**
   * The positioning statement. Two sentences, declarative, no adjectives doing
   * work that a number could do. Written in the voice of your own abstracts.
   */
  statement:
    'I build and stress-test foundation models for medical imaging — and I am mostly interested in where they quietly fail. My work runs from zero-shot cardiac segmentation that matches supervised baselines without a single label, to showing that a benchmark the field reports as one number is measuring four different things.',

  role: 'PhD Candidate',
  affiliation: 'Purdue University',
  department: 'Weldon School of Biomedical Engineering',
  /** Deliberately empty — advisors are not featured anywhere on this site. */
  advisor: '',
  location: 'West Lafayette, IN, USA',
  email: 'zhuoanli07@gmail.com',

  /**
   * Profile photo. Empty renders the placeholder SVG instead, so the page
   * never shows a broken image. Lives in public/ rather than src/assets/ on
   * purpose: a missing file under src/assets/ fails the build outright.
   *
   * This is a URL path, not a file path: everything in public/ is served from
   * the site root, so public/avatar.jpg is '/avatar.jpg'.
   */
  photo: '/avatar.jpg',

  /** Links render only when non-empty, so blanks are safe to leave. */
  links: {
    github: 'https://github.com/zhuoanli',
    scholar: 'https://scholar.google.com/citations?user=dH-y8OMAAAAJ&hl=en',
    orcid: 'https://orcid.org/0009-0005-0647-8579',
    dblp: 'https://dblp.org/pid/309/2988.html',
    linkedin: 'https://www.linkedin.com/in/zhuoan-li-lza1207/',
    // Personal rather than academic, so it only shows where it is asked for
    // — see the `personal` flag in lib/profiles.ts.
    instagram: 'https://www.instagram.com/zhuoan_li/',
    twitter: '',
    // Points at the HTML CV, which always exists. Change this to '/cv.pdf'
    // once you drop the file in public/ — the CV page shows a download button
    // only when this ends in .pdf, so there is never a dead link.
    cv: '/cv',
  },

  /**
   * Visitor analytics. GoatCounter: no cookies, no personal data, no consent
   * banner needed — it reports page views, referrers and countries, never who
   * someone is.
   *
   * TODO: register a subdomain at goatcounter.com and put the code here, e.g.
   * 'zhuoanli' for zhuoanli.goatcounter.com. While this is empty nothing is
   * rendered at all, so there is no dead script and no failing request.
   *
   * It is also inert outside production builds, and GoatCounter itself ignores
   * localhost, so local previews never pollute the numbers.
   */
  analytics: {
    goatcounter: 'zhuoanli',
  },

  /**
   * The message box on the home page.
   *
   * GitHub Pages serves static files and nothing else, so a form cannot send
   * mail on its own — it has to POST to a service that forwards it. Until
   * `endpoint` is set the form still works: it falls back to opening the
   * reader's mail client with the subject and their message pre-filled, which
   * needs no account and no third party.
   *
   * The access key is public by design — it appears in the page source, and
   * all it can do is deliver mail to the address it was registered against.
   * It grants no read access to anything, so it is not a secret to protect.
   *
   * Formspree works too: put its form URL in `endpoint` and leave `accessKey`
   * empty. Either way the mail lands in whichever inbox you registered.
   */
  contactForm: {
    endpoint: 'https://api.web3forms.com/submit',
    accessKey: '94b48322-1b01-4a71-8bba-1806f857cf2f',
    /** Prefixes the subject line so these are filterable in your inbox. */
    subject: 'Personal website message',
  },

  /** Feeds both the nav chips and the anchor targets on the home page. */
  capabilities: [
    { id: 'foundation-models', label: 'Foundation models' },
    { id: 'zero-shot', label: 'Zero-shot adaptation' },
    { id: 'clinical', label: 'Clinical validation' },
    { id: 'scale', label: 'Registry scale' },
  ],

  nav: [
    { href: '/', label: 'Home' },
    { href: '/research', label: 'Research' },
    { href: '/publications', label: 'Publications' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About me' },
    { href: '/cv', label: 'CV' },
  ],
} as const;

/**
 * The hero caption. Kept next to the media it describes rather than in the
 * component, so it cannot drift from what build_hero_media.py actually rendered.
 */
export const hero = {
  media: {
    cine: '/media/hero-cine.webp',
    poster: '/media/hero-poster.webp',
  },
  caption: 'Short-axis cine MRI, one cardiac cycle',
  provenance:
    'ACDC patient 022 (HCM). Contours are MedSAM2 output under dual-anchored bidirectional propagation: zero-shot, no cardiac-specific training.',
  labels: [
    { key: 'rv', label: 'RV', varName: '--rv' },
    { key: 'myo', label: 'Myocardium', varName: '--myo' },
    { key: 'lv', label: 'LV', varName: '--lv' },
  ],
} as const;

/**
 * NOT CURRENTLY RENDERED. The metric band was taken off the home page; these
 * numbers now live in the highlights of src/content/publications/miua-4dseg.md,
 * with the paper they belong to. MetricBand.astro is still here — drop
 * `<MetricBand />` back into a page to bring it back.
 *
 * Headline numbers, each one traceable to the MIUA camera-ready.
 *
 * The first two and the last come from results/metrics_acdc_val.json; the 51%
 * is quoted from the abstract itself ("reducing mean HD95 and ASSD by
 * approximately 51% and 62%, respectively, compared with single-anchor").
 *
 * A "136 patients / 4 scanner vendors, M&Ms" figure used to sit here. It was
 * draft-stage external validation that got cut from the camera-ready, so it
 * appears in no paper — do not put it back. The cross-vendor number that did
 * survive is CycleQA's 320 M&Ms patients, which is a different paper.
 */
export const metrics = [
  { value: 0.85, format: 'dp3', label: 'RV Dice', note: 'zero-shot, ACDC' },
  { value: 2.94, format: 'dp2', unit: 'mm', label: 'RV HD95', note: 'beats supervised DINOv2 4×' },
  { value: 51, format: 'int', unit: '%', label: 'Lower HD95', note: 'vs single-anchor propagation' },
  { value: 0, format: 'int', label: 'Target labels used', note: 'no fine-tuning' },
] as const;
