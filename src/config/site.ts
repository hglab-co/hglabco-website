export const siteConfig = {
	name: 'Hugo Garcia',
	author: 'Hugo Garcia',
	jobTitle: 'CEO de QPayPro, consultor de negocios y estratega',
	title: 'Hugo Garcia | Estrategia y experiencia real para negocios',
	tagline: 'Estrategia, tecnologia y experiencia real para negocios que quieren crecer.',
	description:
		'Aprendizajes, herramientas y estrategias de Hugo Garcia sobre ventas, operacion, tecnologia, IA y crecimiento de negocios en LATAM.',
	url: (import.meta.env.SITE_URL ?? 'https://hglab.co').replace(/\/$/, ''),
	locale: 'es',
	language: 'es-GT',
	socialImage: '/img/logocombined@2x.png',
	keywords: ['Hugo Garcia', 'QPayPro', 'emprendimiento LATAM', 'negocios', 'fintech'],
	social: {
		instagram: 'https://www.instagram.com/',
		tiktok: 'https://www.tiktok.com/',
		linkedin: 'https://www.linkedin.com/',
	},
};

export const contentPillars = [
	{
		number: '01',
		title: 'Construyendo el negocio',
		description: 'Ideas, validacion, ventas y modelo de negocio.',
	},
	{
		number: '02',
		title: 'Operando con datos',
		description: 'Metricas, tableros y decisiones con informacion.',
	},
	{
		number: '03',
		title: 'Liderazgo y equipo',
		description: 'Socios, cultura, equipo y conversaciones importantes.',
	},
	{
		number: '04',
		title: 'Tecnologia e IA aplicada',
		description: 'Herramientas reales para vender y operar mejor.',
	},
	{
		number: '05',
		title: 'Decisiones dificiles',
		description: 'Caja, crisis, cambios de rumbo y aprendizajes.',
	},
	{
		number: '06',
		title: 'Reinventandose',
		description: 'Evolucion, nuevos modelos y volver a construir mejor.',
	},
];
