import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/[^_]*.md' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		category: z.string(),
		pillar: z.string(),
		excerpt: z.string(),
		readingTime: z.string().default('4 min'),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		image: z.string().optional(),
		pdf: z.string().optional(),
		seoTitle: z.string().optional(),
		seoDescription: z.string().optional(),
	}),
});

export const collections = { blog };
