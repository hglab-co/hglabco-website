# Web personal

Sitio personal construido con Astro, preparado para blog, SEO y despliegue en Cloudflare Pages.

## Scripts

```sh
npm run dev
npm run build
npm run preview
```

## Estructura

```text
src/
  components/      Componentes reutilizables
  config/          Identidad y configuracion del sitio
  content/blog/    Articulos en Markdown
  layouts/         Layouts globales
  lib/             Utilidades del blog
  pages/           Rutas del sitio
```

## Identidad

Edita `src/config/site.ts` para cambiar:

- Nombre
- Rol profesional
- Descripcion SEO
- Dominio
- GitHub
- LinkedIn
- Palabras clave

Usa la variable `SITE_URL` en Cloudflare Pages para fijar el dominio canonico.

## Cloudflare Pages

Configuracion recomendada:

- Production branch: `main`
- Build command: `npm run build`
- Build directory: `dist`
- Node version: `22.16.0`

Variable de entorno recomendada:

```text
SITE_URL=https://tu-dominio.com
```

## GitHub

Si el repo remoto aun no existe:

```sh
git add .
git commit -m "Initial Astro personal site"
git remote add origin https://github.com/hglab-co/hglabco-website.git
git push -u origin main
```

Luego importa ese repositorio desde Cloudflare Pages.
