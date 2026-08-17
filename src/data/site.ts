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
  tagline: 'Foundation models for cardiac imaging',

  /**
   * The positioning statement. Two sentences, declarative, no adjectives doing
   * work that a number could do. Written in the voice of your own abstracts.
   */
  statement:
    'I build and stress-test foundation models for medical imaging — and I am mostly interested in where they quietly fail. My work runs from zero-shot cardiac segmentation that matches supervised baselines without a single label, to showing that a benchmark the field reports as one number is measuring four different things.',

  role: 'PhD Researcher', // TODO: confirm exact title
  affiliation: 'Purdue University', // TODO: confirm department / lab
  department: '', // TODO
  advisor: '', // TODO — rendered on /cv only if set
  location: 'West Lafayette, IN',
  email: 'zhuoanli07@gmail.com',

  /** Links render only when non-empty, so blanks are safe to leave. */
  links: {
    github: 'https://github.com/zhuoanli',
    scholar: '', // TODO
    orcid: '', // TODO
    linkedin: '', // TODO
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
    goatcounter: '',
  },

  /** Feeds both the nav chips and the anchor targets on the home page. */
  capabilities: [
    { id: 'foundation-models', label: 'Foundation models' },
    { id: 'zero-shot', label: 'Zero-shot adaptation' },
    { id: 'clinical', label: 'Clinical validation' },
    { id: 'scale', label: 'Large-scale training' },
  ],

  nav: [
    { href: '/research', label: 'Research' },
    { href: '/publications', label: 'Publications' },
    { href: '/projects', label: 'Projects' },
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
    overlay: '/media/hero-overlay.webp',
    poster: '/media/hero-poster.webp',
  },
  caption: 'Short-axis cine MRI, one cardiac cycle',
  provenance:
    'ACDC patient 022 (HCM). Contours are MedSAM2 output under dual-anchored bidirectional propagation — zero-shot, no cardiac-specific training.',
  labels: [
    { key: 'rv', label: 'RV', varName: '--rv' },
    { key: 'myo', label: 'Myocardium', varName: '--myo' },
    { key: 'lv', label: 'LV', varName: '--lv' },
  ],
} as const;

/**
 * Headline numbers. Every one of these traces to results/metrics_acdc_val.json
 * in the MIUA working tree — no hand-copied figures.
 */
export const metrics = [
  { value: 0.85, format: 'dp3', label: 'RV Dice', note: 'zero-shot, ACDC' },
  { value: 2.94, format: 'dp2', unit: 'mm', label: 'RV HD95', note: 'beats supervised DINOv2 4×' },
  { value: 136, format: 'int', label: 'Patients held out', note: '4 scanner vendors, M&Ms' },
  { value: 0, format: 'int', label: 'Target labels used', note: 'no fine-tuning' },
] as const;
