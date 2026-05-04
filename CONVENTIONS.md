# CONVENTIONS.md
**hglab.co — Marca personal de Hugo García**

> Este archivo es la constitución del repo. Lo leen humanos y agentes (Codex, 
> Cowork, Claude). Cualquier contenido nuevo debe respetar lo que está acá.
> Cuando haya conflicto entre instrucciones puntuales y este archivo, gana 
> este archivo.

---

## 1. Quién es Hugo García

Hugo García, 42 años (cumple 43 el 22 de mayo de 2026), guatemalteco, 
emprendedor en serie. Fundador y CEO de QPayPro (pasarela de pagos fintech 
LATAM, 9 años en operación). Antes construyó y cerró/vendió/pausó otros 
6 negocios: cafetería Guafres, empresa de software con socio (cedida), 
Plackit (organizadores magnéticos, en pausa por pandemia), sublimación 
(quebró), juguetes (cerró), asesoría en presentaciones gerenciales.

Su esposa **Mariana** es socia activa de QPayPro con acciones (no es esposa 
que ayuda — es socia). Tiene hijos. El mayor (~8 años) ya quiere vender 
en su colegio.

Lifestyle: madrugador, ejercicio diario, sin vicios, cocina para relajarse, 
familia y amigos en buen plan.

**Identidad central:** *constructor crónico, solucionador compulsivo, líder 
al frente.* No es coach. No es influencer. No es "experto en IA". Es un 
CEO operador integral que ha vivido cada silla del negocio y comparte lo 
que aprendió con honestidad.

**Audiencia:** emprendedores y CEOs de LATAM en cualquier etapa (validando 
MVP, escalando, en crisis, reinventándose). El que está perdido y necesita 
guía real.

---

## 2. Tono y voz

### Cómo escribe Hugo

- **Casual experto.** Conversacional, directo, sin humo, sin jerga 
  innecesaria.
- **Vulnerable sin victimismo.** Cuenta fracasos como aprendizajes, no como 
  drama.
- **Autoridad sin arrogancia.** No "yo soy el mejor" — "esto me funcionó 
  a mí, lo comparto por si te sirve".
- **Humor callado.** Frases tipo *"típico emprendedor que piensa en un 
  negocio y lo primero que hace es un negocio de comida"*. Ironía suave, 
  nunca burla.
- **Específico antes que abstracto.** Habla con números, fechas, nombres, 
  lugares. Ejemplo: *"En la cuenta del banco teníamos solo para un mes de 
  servidor"*, no *"Estábamos al borde de la quiebra"*.
- **Frases cortas, párrafos cortos.** Lectura mobile-first.

### Frases firma de Hugo (usar cuando encajen, no forzar)

- *"Algunos pegan, otros no."*
- *"Recuperamos pero no perdimos."*
- *"Una sociedad es como casarse."*
- *"Vendí mi pasarela antes de tenerla."*
- *"Tenía un mes de servidor en la cuenta."*
- *"Soluciono problemas. Esa es mi causa de insomnio."*
- *"Lidero no para ordenar, sino para guiar."*

### Palabras y frases prohibidas

No usar nunca, ni en captions ni en artículos:
- "Hack" / "hacks de productividad" / "growth hack"
- "Mindset" (decir "forma de pensar" o "actitud")
- "Disruptivo" / "disrupción"
- "Sinergia" / "valor agregado"
- "Hacer match" / "es trending"
- "Como CEO/founder" usado como muletilla autoritaria
- "Te voy a contar el secreto" / "el truco es"
- "Si yo pude, vos podés"
- Hashtags genéricos en artículos (no #emprendedor #ceo #latam genéricos)
- Emojis decorativos en cuerpo del artículo (sí en hooks de redes, no en blog)
- Frases motivacionales de Pinterest tipo "los grandes nunca se rinden"

### Reglas de "yo / nosotros / vos"

- "Yo" cuando habla de su experiencia personal
- "Nosotros" cuando habla del equipo/empresa o cuando incluye a Mariana
- "Vos" o "tú" según consistencia: el sitio usa **"vos"** (más cercano 
  a la audiencia LATAM amplia, especialmente Argentina, Uruguay, 
  Centroamérica). NO mezclar tú/vos en un mismo texto.

### Modismos guatemaltecos

Hugo es guatemalteco. Puede usar palabras locales **si son entendibles 
en LATAM**: "patojo" (con explicación contextual la primera vez), "ahorita", 
"plata" (siempre, en lugar de "dinero" en la mayoría de casos). 
**Evitar:** "shute", "chilero", "chapín" — demasiado locales para audiencia 
LATAM amplia.

---

## 3. Estructura obligatoria de un artículo

### Frontmatter (siempre)

```yaml
---
title: "Título del artículo"
description: "Resumen de 1-2 frases, máximo 160 caracteres, optimizado SEO"
pubDate: 2026-05-13
author: "Hugo García"
pilar: "Construyendo el negocio"
tags: ["dominio", "marca", "fundamentos"]
slug: "el-com-primero"
ogImage: "/img/og/el-com-primero.png"
draft: false
readingTime: 5
relatedResource: "el-com-primero.pdf"  # opcional
---
```

**Reglas del frontmatter:**
- `title`: en minúsculas o sentence case, NO Title Case. Puede llevar punto 
  final.
- `description`: máximo 160 caracteres. Debe incluir hook + promesa + 
  beneficio.
- `slug`: kebab-case, sin acentos, sin eñes (ñ → n), máximo 60 caracteres
- `pilar`: uno de los 6 oficiales (ver lista abajo)
- `tags`: máximo 5, en minúsculas, en singular cuando aplique
- `ogImage`: si no existe imagen específica, usar `/img/og/default.png`

### Los 6 pilares oficiales (uso exacto en frontmatter)

```
- "Construyendo el negocio"
- "Operando con datos"
- "Liderazgo y equipo"
- "Tecnología e IA aplicada"
- "Cuando las cosas no van"
- "Reinventándose"
```

### Estructura del cuerpo del artículo

**Longitud objetivo:** 800-1500 palabras. Lectura entre 4-7 minutos.

**Anatomía obligatoria:**

1. **Apertura (1-2 párrafos)** — hook con anécdota específica. NO empezar 
   con definición ("El emprendimiento es..."). Empezar con escena: 
   *"En 2018 tenía un mes de servidor en la cuenta del banco."*

2. **Contexto (1-2 párrafos)** — por qué este tema importa para el lector. 
   Aterrizar al dolor real del emprendedor.

3. **Desarrollo principal** — 2-5 secciones con `## Subtítulo`. Cada 
   sección:
   - Idea principal en 1 frase
   - Anécdota o ejemplo concreto (preferentemente de Hugo)
   - Aprendizaje accionable
4. **Cierre con la lección** — 1-2 párrafos. La regla que Hugo aplica hoy. 
   No moralizante.

5. **Cierre con CTA** — uno solo, simple:
   - Si hay PDF: "Te dejé esto resumido en una guía que podés descargar 
     abajo."
   - Si no hay PDF: "Si te sirvió, seguime en [red] o compartilo con quien 
     lo necesite."

### Reglas de subtítulos

- `## H2` para secciones principales (mínimo 2 por artículo, máximo 5)
- `### H3` solo si la sección H2 lo requiere para subdividir
- Subtítulos en sentence case, pueden llevar punto final
- NO subtítulos genéricos tipo "Conclusión" o "Introducción"
- SÍ subtítulos específicos: "El día que casi cierro QPayPro" / "La 
  pregunta que hago hoy antes de firmar con un socio"

### Bloques permitidos en markdown

- Párrafos
- `## H2`, `### H3` (no usar H1 — ese es el title)
- Listas con guiones (`-`), no con asteriscos
- Listas numeradas cuando es secuencia real, no decorativa
- `> Blockquote` para frases destacadas o citas
- `**negrita**` con criterio (máximo 2-3 por sección)
- Código con backticks solo cuando aplique (ejemplo: dominios, comandos)
- Imágenes: `![alt descriptivo](/img/articulos/slug-X.jpg)` — siempre con alt

### Bloques prohibidos

- Tablas decorativas (sí cuando hay datos reales)
- Acordeones / collapsibles
- Embeds de Twitter, YouTube embebido (linkeá si querés citar)
- Emojis dentro del cuerpo (excepto en blockquotes citando captions)

---

## 4. Estructura de una guía PDF

Cada guía PDF descargable acompaña a un artículo. **El artículo es la 
versión completa, el PDF es un resumen accionable.**

### Composición

- **Página 1 (portada):** título de la guía, autor "Hugo García", fecha 
  o versión, firma cursiva HG, link a hglab.co
- **Página 2 (contexto):** 1 párrafo + manifiesto o frase firma
- **Páginas 3-N (contenido):** los puntos accionables con espacio 
  para anotar
- **Página final:** CTA a redes + agradecimiento personal de Hugo

### Reglas

- Máximo **8 páginas** por guía. Si necesita más, dividir en 2 guías.
- Tipografía: igual que el sitio (Inter o Geist)
- Colores: blanco + negro + amarillo accent (#FFE600) con criterio
- Firma cursiva HG en cada página (esquina inferior)
- Cada punto accionable debe ser **verificable** ("Comprá tu .com hoy" no 
  "Pensá en tu marca")
- Generación: PDF se diseña en Figma o Canva con plantilla de marca, se 
  exporta y se sube a `/public/pdfs/[slug].pdf`

---

## 5. Reglas de SEO

### Slug

- kebab-case (palabras separadas por guion)
- Sin acentos, sin eñes (ñ → n)
- Sin artículos al inicio ("la-", "el-", "una-") salvo cuando son parte 
  esencial
- Máximo 60 caracteres
- Buen ejemplo: `el-com-primero`, `sociedad-como-matrimonio`
- Mal ejemplo: `el-articulo-sobre-como-comprar-tu-dominio-com-primero`

### Meta description

- Máximo 160 caracteres
- Debe incluir: hook + qué aprenderá el lector
- En primera persona o segunda persona, nunca en tercera
- No empieza con "En este artículo..."
- Ejemplo bueno: *"La primera cosa que compro al pensar un negocio: el .com. 
  Si no está disponible, capaz tu idea no es tan original. Te explico por qué."*
- Ejemplo malo: *"En este artículo aprenderás todo sobre cómo comprar 
  dominios para tu negocio."*

### Open Graph

- `og:title` igual al title del artículo
- `og:description` igual al description
- `og:image` debe existir, dimensiones 1200x630px, con título visible y 
  marca HG
- `og:type` = "article"

### Tags

- Mínimo 2, máximo 5
- En minúsculas, en singular cuando aplique
- Específicos al contenido, no genéricos
- Buenos: `dominio`, `marca-personal`, `mvp`, `socios`, `profit-first`
- Malos: `emprendedor`, `negocios`, `latam`, `ceo`

---

## 6. Reglas de imágenes

### Cuándo usar imagen

- Hero del artículo (opcional pero recomendado): 1200x630px, simple, sobre 
  fondo blanco o negro, con elemento gráfico signature (punto amarillo)
- Imágenes dentro del artículo: solo si aportan valor real (screenshot, 
  diagrama, foto contextual)

### Cuándo NO usar imagen

- Stock photos genéricas (gente sonriendo en oficinas, manos en teclado)
- Memes o ilustraciones cursis
- Fotos de Hugo si no aportan al texto

### Reglas técnicas

- Formato: `.jpg` para fotos, `.png` para gráficos con transparencia, 
  `.webp` cuando sea posible
- Peso máximo: 200KB por imagen (optimizar antes de subir)
- Alt text obligatorio, descriptivo, no decorativo
- Ubicación: `/public/img/articulos/[slug]-N.jpg`

---

## 7. Reglas de citas, datos y honestidad

### Sobre datos personales y empresariales

- **NUNCA inventar números.** Si Hugo no recuerda la cifra exacta, escribir 
  "varios miles", "pocos clientes", "casi un año" — no "5,247 clientes" 
  inventado.
- **NUNCA inventar fechas.** Si la fecha es aproximada, escribir "alrededor 
  de 2018" no "el 14 de marzo de 2018".
- **Datos verificables:** se pueden mencionar libremente (QPayPro fundada 
  2016-2017, 9 años de operación, etc.)
- **Datos sensibles a evitar:** facturación exacta, salarios, montos de 
  inversión específicos, nombres de clientes corporativos sin permiso.

### Sobre nombres de personas

- **Mariana:** se puede nombrar libremente (es socia pública).
- **Hijos:** NO mencionar nombres ni edades exactas. Decir "mi hijo mayor", 
  "mis hijos".
- **Padre fallecido:** se puede mencionar con respeto. NO llamarlo por 
  nombre completo.
- **Mamá:** se puede mencionar.
- **Socios pasados:** NO nombrar. Usar "mi socio en ese entonces", "el 
  socio del software", etc.
- **Personas de QPayPro actuales:** consultar antes de nombrar.

### Citas externas

- Si se cita un libro, autor, empresa: dar atribución completa.
- Si se cita una estadística: incluir fuente y año.
- Si la fuente no se recuerda: NO citar el dato, reescribir sin él.

---

## 8. Checklist final antes de publicar

Antes de mover un artículo de "Listo para revisión" a "Publicado" en Notion 
y dispararlo al sitio, verificar:

- [ ] Frontmatter completo y válido (todos los campos obligatorios)
- [ ] Slug en kebab-case sin acentos
- [ ] Pilar es uno de los 6 oficiales con escritura exacta
- [ ] Description ≤ 160 caracteres
- [ ] Title NO está en Title Case (sentence case o minúsculas)
- [ ] Apertura con anécdota específica, NO con definición
- [ ] Mínimo 2 H2, máximo 5
- [ ] Cierre con UNA lección clara y UN CTA simple
- [ ] Ningún término prohibido (lista en sección 2)
- [ ] Consistencia "vos" o "tú" en todo el artículo (no mezclar)
- [ ] Sin emojis en cuerpo (sí en blockquotes citando captions)
- [ ] Sin números/fechas inventados
- [ ] Sin nombres de hijos, padres, socios pasados
- [ ] Imágenes con alt text descriptivo
- [ ] Si hay PDF asociado: link funcional al final
- [ ] Longitud entre 800-1500 palabras
- [ ] Lectura en mobile validada (párrafos cortos)

---

## 9. Estructura del repo (referencia rápida)

```
hglab.co/
├── CONVENTIONS.md          ← este archivo
├── README.md
├── astro.config.mjs
├── package.json
├── public/
│   ├── img/
│   │   ├── hgsignatureblack.png
│   │   ├── hgsignaturewhite.png
│   │   ├── og/
│   │   │   └── default.png
│   │   └── articulos/
│   │       └── [slug]-N.jpg
│   ├── pdfs/
│   │   └── [slug].pdf
│   └── favicon.png
├── src/
│   ├── content/
│   │   ├── config.ts
│   │   ├── articulos/
│   │   │   └── [slug].md
│   │   └── recursos/
│   │       └── [slug].md
│   ├── pages/
│   ├── components/
│   ├── layouts/
│   └── styles/
│       └── global.css
```

---

## 10. Para agentes (Cowork, Codex)

Si vos sos un agente y estás leyendo esto:

1. **Antes de escribir un artículo nuevo:** leé este archivo completo + 
   leé al menos 2 artículos publicados en `/src/content/articulos/` para 
   internalizar tono.
2. **Si una instrucción puntual contradice este archivo:** ganan estas 
   convenciones. Si la contradicción es mayor, pausá y notificá a Hugo.
3. **Si te falta un dato (fecha, número, nombre):** NO lo inventes. Dejá 
   placeholder `[VERIFICAR CON HUGO]` y pausá.
4. **Si dudás del pilar correcto:** pausá y consultá. NO uses pilar al azar.
5. **Tu output esperado:** archivo `.md` listo para commit con frontmatter 
   completo y cuerpo respetando todas las reglas. Nunca prosa explicativa 
   alrededor del archivo.

---

*Última actualización: 3 de mayo de 2026*
*Versión: 1.0*
*Mantenido por: Hugo García + Claude*
