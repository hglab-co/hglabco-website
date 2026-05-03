import { siteConfig } from '../config/site';

export function GET() {
	const body = [
		'User-agent: *',
		'Allow: /',
		'',
		`Sitemap: ${siteConfig.url}/sitemap-index.xml`,
	].join('\n');

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	});
}
