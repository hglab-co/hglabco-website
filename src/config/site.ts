export const siteConfig = {
	name: 'Hugo Garcia',
	author: 'Hugo Garcia',
	jobTitle: 'Fundador de QPayPro y constructor de negocios',
	title: 'Hugo Garcia | Construyo negocios en LATAM',
	tagline: 'Construyo negocios. Algunos pegan, otros no. Te cuento todo.',
	description:
		'Historias, aprendizajes y recursos de Hugo Garcia sobre construir, operar y reinventar negocios en LATAM.',
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
		description: 'Ideas, validacion y primeras ventas.',
	},
	{
		number: '02',
		title: 'Operando con datos',
		description: 'Metricas, tablero y decisiones frias.',
	},
	{
		number: '03',
		title: 'Liderazgo y equipo',
		description: 'Socios, cultura y conversaciones dificiles.',
	},
	{
		number: '04',
		title: 'Tecnologia e IA aplicada',
		description: 'Herramientas reales para operar mejor.',
	},
	{
		number: '05',
		title: 'Cuando las cosas no van',
		description: 'Errores, crisis y costos de aprender.',
	},
	{
		number: '06',
		title: 'Reinventandose',
		description: 'Cerrar ciclos y volver a construir.',
	},
];
