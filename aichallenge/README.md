# Challenge de Innovación con IA · Qpaypro

Sitio estático (HTML + CSS + JS, sin frameworks) para el Challenge de Innovación con
IA de Qpaypro. Vive dentro del repo `hglab-co/hglabco-website` (un proyecto Astro),
en `public/aichallenge/`, para que Astro lo copie tal cual a `/aichallenge/` cuando
se construye el sitio — por eso no hay nada que compilar aparte de lo que ya hace el
resto de hglabco-website.

- **`/aichallenge/index.html`** — página de inicio con la explicación del Challenge, criterios y premios.
- **`/aichallenge/postular.html`** — formulario público para que cada equipo postule su idea.
- **`/aichallenge/jurado.html`** — panel protegido con clave compartida donde el jurado califica cada
  proyecto (1 a 5 por criterio) y ve el ranking ponderado en vivo.

Los datos se guardan en **Supabase** (Postgres gratuito en la nube) — el sitio es
puramente estático, no necesita servidor propio ni base de datos local.

---

## 1. Crear tu proyecto de Supabase (gratis, ~5 minutos)

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta gratuita.
2. Crea un nuevo proyecto (cualquier nombre; la contraseña de base de datos no se
   usa en este sitio, pero guárdala de todos modos).
3. Ve a **SQL Editor** → **New query**.
4. Abre [`aichallenge/supabase/schema.sql`](supabase/schema.sql) en este repo, copia
   **todo** su contenido, pégalo en el editor y presiona **Run**.
   - Crea las tablas `ideas` y `scores`, la vista `idea_rankings` (promedio ponderado
     + posición + premio automáticos) y los permisos necesarios.
5. Ve a **Project Settings** → **API** y copia:
   - **Project URL**
   - **anon public** key

## 2. Configurar el sitio

Edita `public/aichallenge/assets/js/config.js` en este repo:

```js
const SUPABASE_URL = "PEGA_AQUI_TU_SUPABASE_URL";
const SUPABASE_ANON_KEY = "PEGA_AQUI_TU_SUPABASE_ANON_KEY";
const ADMIN_PASSCODE = "qpaypro2026";        // cámbiala por tu propia clave
const JUROR_NAMES = ["Hugo", "Jurado 2", "Jurado 3", "Jurado 4"]; // nombres reales del jurado
```

Puedes editarlo directamente en GitHub (botón del lápiz) o clonando el repo. Cualquier
push a `main` con estos valores actualizados republica el sitio automáticamente si
Cloudflare Pages ya está conectado a este repositorio (ver siguiente sección).

## 3. Cómo queda publicado

Este repo (`hglabco-website`) es un proyecto **Astro**. Todo lo que está dentro de
`public/` se copia sin procesar al resultado final del build. Como este sitio vive en
`public/aichallenge/`, al compilar el proyecto (`npm run build`, que genera `dist/`)
termina disponible en `https://hglab.co/aichallenge/index.html`,
`.../postular.html` y `.../jurado.html`.

- Si **Cloudflare Pages ya está conectado** a este repo (build command `npm run build`,
  output directory `dist`), no tienes que hacer nada más: cada push a `main` lo
  vuelve a publicar solo.
- Si **todavía no lo conectaste**: en el dashboard de Cloudflare → **Workers & Pages**
  → **Create** → **Pages** → **Connect to Git**, elige `hglab-co/hglabco-website`,
  y configura:
  - Build command: `npm run build`
  - Build output directory: `dist`
- Para probarlo en tu máquina antes de un push: `npm install && npm run dev` desde la
  raíz del repo, y abre `http://localhost:4321/aichallenge/`.

## Cómo funciona la calificación

- Cada jurado entra a `/aichallenge/jurado.html`, ingresa la clave compartida, elige
  su nombre y califica cada proyecto de 1 a 5 en 6 criterios.
- El puntaje ponderado de cada calificación se calcula **dentro de la base de datos**
  (columna `weighted_total` en la tabla `scores`), con la misma fórmula del reglamento:

  ```
  (25% × Uso agéntico + 25% × Eficiencia + 15% × Reducción de riesgos
   + 15% × Productividad + 10% × Evidencia + 10% × Claridad) × 20
  ```

- La vista `idea_rankings` promedia esa nota entre todos los jurados que calificaron
  cada idea, y calcula automáticamente la posición y el premio (Q750 / Q450 / Q300).
- El panel de jurado muestra esa tabla en tiempo real (botón "Actualizar").

## Nota de seguridad (importante)

Este sitio usa una **clave compartida simple** a nivel de interfaz para el panel de
jurado, tal como pediste. Es adecuado para un challenge interno de bajo riesgo, pero
no es seguridad "a prueba de balas": cualquiera que tenga la URL de tu Supabase y la
anon key (visibles en el código del sitio, en las herramientas de desarrollador del
navegador) podría en teoría leer o escribir esas tablas directamente vía la API de
Supabase, sin pasar por la clave. Si más adelante quieres subir de nivel, la mejora
natural es reemplazar la clave compartida por **Supabase Auth** con usuario y
contraseña individual por jurado.

**Nota sobre este repo:** pediste que el repositorio quedara privado, pero como esto
se sumó como carpeta dentro de `hglabco-website` (que ya es público y es el repo de
tu sitio en producción), no cambié la visibilidad del repo — eso afectaría también el
código de tu sitio principal. Si de verdad quieres que todo `hglabco-website` pase a
privado, hazlo desde GitHub → Settings → Danger Zone → Change visibility (Cloudflare
Pages sigue funcionando igual con un repo privado).

## Personalización de marca

Los colores están centralizados como variables CSS al inicio de
`assets/css/style.css` (busca `:root`) y corresponden a la **paleta oficial de marca
Qpaypro**:

| Rol | Hex | Uso en el sitio |
| --- | --- | --- |
| Principal | `#0F206C` | Hero, títulos, encabezado de tablas, footer |
| Secundario | `#0047BA` | Enlaces, botones de acción, foco de formularios |
| Acento | `#00CAFF` | Botón principal del hero, badges, detalles |
| Neutro | `#2E2D2C` | Texto de párrafo |
| Blanco / Negro | `#FFFFFF` / `#000000` | Fondos y neutros base |

Las variables con nombre `--qp-*-light`, `--qp-*-dark`, `--qp-acento-soft`,
`--qp-gray*`, `--qp-hero-lead` y `--qp-footer-text` son **tonos derivados**, no
oficiales: se calcularon a partir de los anteriores para fondos suaves, bordes y
estados hover.

**Restricción de contraste (importante si cambias colores):** el acento `#00CAFF`
sobre blanco da una relación de contraste de 1.93:1, muy por debajo del mínimo AA de
4.5:1. Por eso nunca se usa como color de texto sobre fondo claro — solo como fondo
de botón con texto navy encima (7.55:1), como acento sobre el azul principal
(7.55:1), y en detalles decorativos. Para texto sobre blanco se usa el secundario
`#0047BA` (8.04:1).

- Logo: los archivos viven en `assets/img/` — `qpaypro-logo.png` (wordmark,
  512×165, con transparencia), `apple-touch-icon.png` y `favicon-32.png` (isotipo).
  En el footer el mismo wordmark se invierte a blanco por CSS
  (`filter: brightness(0) invert(1)`) para que se lea sobre el fondo navy.
- Colores: edita las variables `--qp-principal`, `--qp-secundario`, `--qp-acento`
  y `--qp-neutro` en `:root`. Todo el resto del sitio las hereda.

## Este proyecto como ejemplo de capacitación

Todo este sitio (formulario + base de datos + panel de jurado con ponderación
automática) se construyó con Claude en una sola sesión, incluyendo verificación
visual con capturas de pantalla antes de subirlo. Es un buen ejemplo para mostrar en
la capacitación de cómo un agente de IA puede ir de "una idea" a "una herramienta
funcionando y publicada", no solo responder preguntas.
