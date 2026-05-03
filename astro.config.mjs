// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: process.env.SITE_URL ?? 'https://example.com',
	integrations: [sitemap()],
});
