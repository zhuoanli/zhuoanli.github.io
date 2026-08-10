// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://zhuoanli.github.io',
  integrations: [sitemap()],
  build: {
    // One stylesheet instead of a per-page cascade of <link> tags. The design
    // system is small enough that a single file beats the extra round trips.
    inlineStylesheets: 'auto',
  },
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
  },
});
