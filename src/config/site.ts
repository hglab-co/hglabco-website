export const siteConfig = {
	name: 'Tu Nombre',
	author: 'Tu Nombre',
	jobTitle: 'Tu rol profesional',
	title: 'Tu Nombre | Web personal',
	tagline: 'Trabajo, ideas y aprendizajes en un solo lugar.',
	description:
		'Pagina personal, blog y archivo de ideas sobre tecnologia, producto y aprendizaje.',
	url: (import.meta.env.SITE_URL ?? 'https://example.com').replace(/\/$/, ''),
	locale: 'es',
	language: 'es-GT',
	socialImage: '/og-image.png',
	keywords: ['web personal', 'blog', 'tecnologia', 'producto', 'aprendizaje'],
	social: {
		github: 'https://github.com/tu-usuario',
		linkedin: 'https://www.linkedin.com/in/tu-usuario/',
	},
};
