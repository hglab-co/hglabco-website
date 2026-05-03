import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export function formatDate(date: Date) {
	return new Intl.DateTimeFormat('es', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(date);
}

export function slugify(value: string) {
	return value
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

export function getPostUrl(post: BlogPost) {
	return `/blog/${post.id}/`;
}

export function getCategoryUrl(category: string) {
	return `/blog/categoria/${slugify(category)}/`;
}

export function sortPosts(posts: BlogPost[]) {
	return [...posts].sort(
		(a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
	);
}

export async function getBlogPosts() {
	const posts = await getCollection('blog');
	const visiblePosts = import.meta.env.PROD
		? posts.filter((post) => !post.data.draft)
		: posts;

	return sortPosts(visiblePosts);
}

export function getCategories(posts: BlogPost[]) {
	const categories = new Map<string, { name: string; slug: string; count: number }>();

	for (const post of posts) {
		const name = post.data.category;
		const slug = slugify(name);
		const current = categories.get(slug);

		categories.set(slug, {
			name,
			slug,
			count: (current?.count ?? 0) + 1,
		});
	}

	return [...categories.values()].sort((a, b) => a.name.localeCompare(b.name));
}
