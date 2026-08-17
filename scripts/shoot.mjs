/**
 * Full-page screenshots of every route in both themes.
 *
 *   npm run build && npm run preview      # in one terminal
 *   npm run shoot                         # in another
 *
 * Writes .screenshots/<theme>/<route>.png. Point it elsewhere with
 * BASE_URL=http://localhost:4321 npm run shoot
 */

import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const OUT = '.screenshots';

const ROUTES = [
  ['/', 'home'],
  ['/research', 'research'],
  ['/publications', 'publications'],
  ['/publications/miua-4dseg', 'publication-detail'],
  ['/projects', 'projects'],
  ['/cv', 'cv'],
  ['/this-route-does-not-exist', '404'],
];

const THEMES = ['light', 'dark'];

// The headless shell is the smaller download and all this script needs; fall
// back to a full chromium install if that is what the machine happens to have.
async function launch() {
  try {
    return await chromium.launch({ channel: 'chromium-headless-shell' });
  } catch {
    return await chromium.launch();
  }
}

const browser = await launch();
let failures = 0;

for (const theme of THEMES) {
  await mkdir(`${OUT}/${theme}`, { recursive: true });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: theme,
  });
  // The layout's anti-FOUC script reads this before first paint.
  await context.addInitScript(`localStorage.setItem('theme', '${theme}')`);

  const page = await context.newPage();

  for (const [route, name] of ROUTES) {
    const res = await page.goto(BASE + route, { waitUntil: 'networkidle' });
    const status = res?.status() ?? 0;

    // 404 is the expected status for the last route only.
    const expected = name === '404' ? 404 : 200;
    if (status !== expected) {
      console.error(`  ✗ ${theme} ${route} — HTTP ${status}, expected ${expected}`);
      failures++;
    }

    await page.addStyleTag({
      content: `
        /* \`astro preview\` injects the dev toolbar. It is position:fixed, so a
           fullPage shot strands it mid-document. It is not in dist/. */
        astro-dev-toolbar { display: none !important; }

        /* Reveal-on-scroll starts at opacity 0 and a fullPage capture resizes
           the viewport mid-flight, which photographs sections half-faded or
           not at all. Force the settled state — this is a layout review, and
           the animation is verified in a real viewport instead. */
        [data-reveal] {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        }
      `,
    });

    await page.screenshot({ path: `${OUT}/${theme}/${name}.png`, fullPage: true });
    console.log(`  ✓ ${OUT}/${theme}/${name}.png`);
  }

  await context.close();
}

await browser.close();

if (failures > 0) {
  console.error(`\n${failures} route(s) returned an unexpected status.`);
  process.exit(1);
}
