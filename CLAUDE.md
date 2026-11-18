# NUDO Estudio de Pelo — sitio demo / template

Sitio de demostración de una peluquería **ficticia** ("NUDO Estudio de Pelo", Palermo, CABA), usado por Estudio Nodo como template para vender a clientes. Dos objetivos: mostrar el trabajo y el estilo del salón, y conseguir turnos (elegir servicio → reservar por el sistema de turnos o por WhatsApp).

Estado: setup terminado. **Todavía no hay páginas ni secciones** (solo el `src/pages/index.astro` stub de Astro). No crear páginas hasta que se pida.

## Stack

- **Astro 7.4** (static, `output: "static"`), TypeScript strict (`astro/tsconfigs/strict`). Node ≥ 22.23.4.
- **Tailwind CSS 4.3** vía `@tailwindcss/vite`. Tokens en el bloque `@theme` de `src/styles/global.css`.
- **@astrojs/sitemap**. `site` se define en `src/config/site.ts` (`site.url`).
- Imágenes: servicio **sharp** (default de Astro, explícito en `astro.config.mjs`), `<Image />` / `<Picture />`.
- Fuentes self-hosted: `@fontsource-variable/fraunces` (display) y `@fontsource-variable/manrope` (cuerpo/UI).
- Zod 4 vía `astro/zod`. Ojo: la doc de Context7 puede ir atrasada respecto de Astro 7; verificar APIs en `node_modules/astro`.
- Sin frameworks de UI. JS solo en islands chicas (filtros, lightbox, comparador). Motion (motion.dev) solo si CSS no alcanza.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Dev server en http://localhost:4321 (para agentes: `npx astro dev --background`, parar con `npx astro dev stop`) |
| `npm run build` | Build estático en `dist/` + valida las collections |
| `npm run preview` | Sirve `dist/` |
| `npx astro sync` | Regenera tipos y valida esquemas y referencias de las collections |
| `node scripts/placeholder.mjs <out.jpg> <4:5\|3:4\|1:1\|3:2\|16:9> "<label>"` | Genera un placeholder de foto rotulado, sin metadatos |

## Dónde viven los datos

- `src/config/site.ts` — marca, bajada, SEO, navegación, contacto, dirección, horarios, redes, reserva (link externo + plantillas de WhatsApp), copy global de cada sección, fotos del salón y del hero, promos, gift cards, seña, cancelación, descuento por medio de pago, FAQ, testimonios (marcados `placeholder`) y aviso de demo (`demoNotice.enabled`).
- `src/lib/booking.ts` — `bookingHref()`, `whatsappHref()`, `bookingMessage()`. **Todo botón "Reservar" usa `bookingHref()`**: si `site.booking.externalUrl` está vacío (demo), cae a WhatsApp con el mensaje prearmado.
- `src/content.config.ts` — esquemas Zod de las collections:
  - `services` → `src/content/services/*.json` (19). Relación "quién lo hace": `stylists: reference('team')[]` (único lugar donde se guarda).
  - `team` → `src/content/team/*.json` (4). `signatureServices: reference('services')[]` = servicios destacados del perfil.
  - `gallery` → `src/content/gallery/*.json` (24, 4 con `before`). `stylist: reference('team')`, `service?: reference('services')`.
- Fotos: `src/assets/{team,gallery,salon,hero}/`. Las rutas en los JSON son relativas al JSON (`../../assets/...`).
- El id de cada entrada es el **nombre del archivo** (sin `.json`); `slug` debe coincidir. Las referencias usan ese id.

### Validación

- `astro sync` / `build` fallan si un JSON no cumple el esquema o si una referencia apunta a una entrada inexistente.
- Las imágenes (`image()`) se resuelven cuando una página consume la collection: con páginas hechas, una foto faltante rompe el build. Sin páginas, no.

## Cómo agregar contenido

### Un servicio

1. Crear `src/content/services/<slug>.json` (el nombre de archivo = `slug`, kebab-case).
2. Campos: `name`, `slug`, `category` (`cortes` | `color` | `tratamientos` | `peinados-y-eventos` | `barberia`), `description` (≤ 220 caracteres), `duration: { min, max? }` en minutos múltiplos de 5, `priceFrom` en ARS (entero), `requiresConsultation`, `stylists` (ids de `team`), `featured`, `order`.
3. Si el servicio dura más de `site.commercial.deposit.minDurationMinutes`, se le aplica la seña automáticamente.
4. `npx astro sync` para validar.

### Una estilista

1. Generar o copiar dos fotos 1:1 en `src/assets/team/`: `<slug>.jpg` (retrato) y `<slug>-trabajando.jpg` (segunda foto para el crossfade del hover).
2. Crear `src/content/team/<slug>.json` con `name`, `slug`, `role`, `specialties`, `yearsOfExperience`, `quote` (≤ 140), `bio`, `instagram { handle, url }`, `photo`, `photoAlt`, `photo2`, `photo2Alt`, `signatureServices` (1–4 ids de `services`), `order`.
3. Sumar su id en `stylists` de cada servicio que haga.
4. `npx astro sync`.

### Un trabajo de la galería

1. Foto en `src/assets/gallery/<id>.jpg` (4:5 o 3:4 vertical; 1:1 o 3:2 si hace falta). Si tiene antes/después: `<id>-antes.jpg` con el **mismo encuadre y luz**.
2. Crear `src/content/gallery/<id>.json` con `title`, `category` (`corte` | `color` | `peinado` | `barberia`), `stylist`, `service?`, `image`, `alt` (descriptivo: técnica, largo, color, vista), `orientation` (`portrait` | `landscape` | `square`), `before? { image, alt }`, `featured`, `date` (YYYY-MM-DD), `credit?`.
3. Solo fotos con autorización de la clienta y sin retoque engañoso.

### Rebrandear para un cliente real

Editar `src/config/site.ts` (marca, contacto, `booking.externalUrl`, `demoNotice.enabled: false`, `url`), reemplazar fotos manteniendo nombres y proporciones, y ajustar los tokens de `@theme`.

---

## ESTÉTICA

Salón de autor contemporáneo: cálido, táctil, sofisticado sin ser frío, relajado, editorial y con un toque de actitud.

Ajustado con `referencias/` (4 mockups de barberías: "Mane", "Nordic Cut", "Sand & Steel", "Cuttheory"):

- **Base clara y cálida, no blanca**: crema y arena, con tinta casi negra cálida. Tres de las cuatro referencias van por ahí; la cuarta (Cuttheory, negro urbano) es la excepción y se usa solo como **banda oscura de contraste**, no como base.
- **Lujo silencioso, no rústico**: serif de alto contraste en peso regular, mucho aire, pocos elementos por bloque. La "actitud" sale de la escala tipográfica grande, los recortes de foto cerrados y una banda oscura, no de ornamentos.
- **Marrones con identidad**: chocolate para CTAs y un bronce/caramelo como color de marca para detalles (palabra destacada en titulares, filetes, íconos). Reemplaza la idea de terracota/oliva/bordó: ninguna referencia los usa.
- **Textura por fotografía y superficies, no por efectos**: las referencias son planas (sin grano visible); la calidez la dan la madera, la luz natural y los cambios de fondo crema → arena. El grano queda opcional y apagado por defecto.
- Las referencias son de barbería masculina; NUDO es un salón mixto con foco en mujeres: igualar la sensación, mostrar diversidad de tipos de pelo (lacio, ondulado, rulos) y largos.

## REFERENCIA

Las imágenes de `referencias/`: igualá la sensación y el estilo (paleta, texturas, ritmo, tratamiento de fotos, peso tipográfico, presentación de servicios, interacciones), no el contenido. No copies textos, logos, fotos ni marcas. **No mover, renombrar ni borrar `referencias/`.**

Lo que se toma de cada una:

- **Mane**: barra de anuncio oscura arriba; header logo a la izquierda, navegación chica en mayúsculas, CTA sólido oscuro a la derecha; hero dividido (texto a la izquierda, foto a la derecha que se funde con el fondo); eyebrow en mayúsculas con filete; una palabra del titular en color de marca; franja de 4 beneficios con ícono lineal y divisores verticales; cards de servicio foto + nombre en mayúsculas + precio; banda oscura con foto del salón + bloque de reserva.
- **Nordic Cut**: aire, foto del salón con radio grande, interiores con luz natural, espejos ovalados → la forma de **arco** como acento.
- **Sand & Steel**: fondo arena + crema en dos tonos, con la foto "puenteando" el cambio de color; CTA chocolate; titular serif centrado en minúsculas/sentence case.
- **Cuttheory**: bloques que se superponen (foto + caja de texto oscura encima) y footer oscuro.

## INTENCIÓN

Quien entra tiene que sentir en segundos el estilo del salón (qué tipo de trabajo hacen y si "es para mí"), ver resultados reales y llegar a reservar en dos o tres toques: elegir el servicio, ver cuánto sale y cuánto dura, y pedir turno. Tiene que transmitir que la atienden con tiempo y criterio, no en una cadena. Quien compra el template tiene que percibir un sitio terminado, en el que solo cambia sus fotos, precios y equipo.

## JERARQUÍA Y LAYOUT

Lo que más tiene que destacar son las fotos de trabajos, el nombre del salón con su propuesta y el botón "Reservar turno" (con WhatsApp como acción secundaria).

Páginas previstas (no las crees todavía):

- **Home**: barra de anuncio opcional (promo vigente) → header con logo, navegación y CTA de reserva → hero con foto o video corto en loop del salón o de un trabajo + bajada + CTAs → servicios destacados por categoría → galería de trabajos (selección) con antes/después → el equipo → el salón (fotos del espacio, filosofía, productos que usan) → testimonios → promos y gift cards → ubicación y horarios con mapa → preguntas frecuentes → CTA final → footer.
- **Servicios**: carta completa por categoría (tabs o anclas), cada servicio con duración, precio "desde", descripción, indicación de "requiere consulta" y botón "Reservar" que abre el sistema de turnos o WhatsApp con el mensaje armado ("Hola! Quiero turno para [servicio]").
- **Galería**: todos los trabajos con filtro por categoría y por estilista, del lado del cliente sin recargar, y lightbox.
- **Equipo**: perfiles de cada estilista con especialidades, sus trabajos (desde la collection gallery) y botón para reservar con esa persona.
- **Páginas legales**: política de privacidad y política de turnos y cancelaciones.

Contenido en un contenedor de 1200-1320px; fotos destacadas y galería pueden ir más anchas. Botón fijo de "Reservar" en mobile.

Patrones de layout tomados de las referencias:

- **Hero dividido** en desktop (texto ~5/12, foto ~7/12 a sangre derecha con fundido suave al fondo); en mobile, foto 4:5 arriba y texto abajo.
- **Franja de propuesta** debajo del hero: 3-4 puntos ("turnos largos", "diagnóstico antes de empezar", "productos profesionales", "reservás en dos toques") con ícono lineal y divisores verticales de 1px; en mobile, scroll horizontal o 2×2.
- **Servicios destacados en home**: cards foto (4:5) + nombre en mayúsculas + "desde $" + duración, en fila con scroll-snap horizontal y flechas manuales (nunca autoplay). La **carta completa** es otra cosa: filas con divisores de 1px.
- **Cambios de fondo por bloque** (crema → arena → crema) y una foto que puentea el cambio; **una sola banda oscura** (espresso) por página, para el salón o el CTA final.
- **Eyebrow** en mayúsculas chicas con filete corto de 1px (24-40px) antes o después.
- Densidad baja: un mensaje por bloque, mucho aire vertical (96-160px entre bloques en desktop, 64-96px en mobile).

## SISTEMA VISUAL

### Tipografía

- **Display: Fraunces** (variable, `@fontsource-variable/fraunces`). Serif de alto contraste como las de las referencias, pero con más calidez y un poco de carácter (eje `SOFT` ~50, `WONK` 0, `opsz` automático). Peso 350-420, **nunca bold**. Sentence case (no todo mayúsculas), tracking -0.02em en tamaños grandes, interlineado 1.0-1.1. Una palabra clave del titular puede ir en **itálica** con `--color-brand` (patrón de Mane).
- **Cuerpo y UI: Manrope** (variable, `@fontsource-variable/manrope`). 16-18px, peso 400-500, interlineado 1.6.
- **Etiquetas / eyebrows / navegación / botones**: Manrope 12-13px, peso 600, **mayúsculas, tracking 0.12-0.16em** (patrón de Mane y Nordic).
- Precios y duraciones: `font-variant-numeric: tabular-nums` (Manrope tiene cifras tabulares).
- Escala fluida con `clamp()`:
  - display: `clamp(2.75rem, 1.6rem + 5vw, 5.75rem)`
  - h1: `clamp(2.25rem, 1.5rem + 3.2vw, 4rem)`
  - h2: `clamp(1.875rem, 1.4rem + 2vw, 3rem)`
  - h3: `clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem)`
  - body: `clamp(1rem, 0.96rem + 0.2vw, 1.125rem)`
  - small/label: `0.8125rem`
- Fuentes self-hosted (Fontsource) con `font-display: swap`; precargar solo el `woff2` latin de Fraunces del hero.

### Color

Tokens a cargar en `@theme` (`--color-*`). Contrastes medidos (WCAG) sobre `bg`:

| Token | Hex | Uso | Contraste |
| --- | --- | --- | --- |
| `--color-bg` | `#F4EEE5` | Fondo base crema | — |
| `--color-surface` | `#EADFCD` | Fondo arena alternado, cards | — |
| `--color-paper` | `#FBF8F3` | Superficie clara (carta, formularios) | — |
| `--color-ink` | `#1F1915` | Texto principal, barra de anuncio | 15.1:1 |
| `--color-muted` | `#6B5F52` | Texto secundario, bajadas | 5.4:1 (4.7 sobre surface) |
| `--color-line` | `#D6C7B0` | Divisores de 1px, bordes | decorativo |
| `--color-brand` | `#9C7349` | Bronce: palabra destacada, filetes, íconos. **Solo texto ≥ 24px** | 3.7:1 |
| `--color-brand-strong` | `#7A5533` | Bronce para texto chico (eyebrows, links) | 5.7:1 |
| `--color-accent` | `#5B3A25` | Chocolate: fondo de CTAs principales | 8.8:1 (texto `bg` encima) |
| `--color-on-accent` | `#F4EEE5` | Texto sobre CTA | 8.8:1 |
| `--color-night` | `#1F1A16` | Banda oscura, footer opcional | — |
| `--color-on-night` | `#EFE7DB` | Texto sobre banda oscura | 14.1:1 |
| `--color-brand-on-night` | `#C9A47A` | Bronce sobre banda oscura | 7.5:1 |

Nunca colores hardcodeados en componentes. Sin gradientes decorativos; el único degradé permitido es el fundido de la foto del hero hacia `--color-bg`.

### Bordes, radios y sombras

- Las referencias mezclan 0px (Mane) y 12-16px (Nordic, Sand & Steel). Decisión: **radios chicos y editoriales**.
  - Fotos: `--radius-photo: 4px`. Foto del salón destacada: `16px`.
  - Botones: `--radius-button: 2px`, rectangulares, etiqueta en mayúsculas con tracking.
  - Pills (`999px`) solo para chips de filtro, tabs de categorías y badges ("requiere consulta").
  - **Arco** (`border-radius: 999px 999px 4px 4px`) como forma firma, 1-2 usos por página (una foto del salón o del equipo), inspirado en los espejos ovalados de Nordic.
- Divisores de 1px `--color-line` en la carta de servicios y en la franja de propuesta.
- **Sin sombras**. Las cards se separan por color de superficie (arena sobre crema), no por elevación.

### Texturas

- Las referencias son planas. Grano/papel **opcional y apagado por defecto** (flag en el layout), SVG `feTurbulence` liviano, opacidad ≤ 0.04, `pointer-events: none`, sin afectar contraste ni performance.

### Espaciado

- Escala de 4/8px. Mucho aire entre bloques (ver Layout). Carta de servicios compacta pero legible: filas de 16-20px de padding vertical, mínimo 44px de alto táctil.

### Fotografía

- Proporciones: 4:5 y 3:4 para trabajos, 16:9 para el salón, 1:1 para el equipo, 4:5 (mobile) / 16:9 (desktop) para el hero.
- Tratamiento (de las referencias): color cálido y algo desaturado, contraste medio-alto, sin filtros fuertes ni blanco y negro. Recortes cerrados que muestren el trabajo (perfil, vista posterior, detalle de textura). Interiores con luz natural lateral, madera y espejos.
- Placeholders actuales: neutros, rotulados ("FOTO: …", con proporción) y generados con `scripts/placeholder.mjs`; intercambiables desde las collections y `site.ts`.
- Si se usan fotos de bancos libres (Unsplash/Pexels): registrar autor y link en `CREDITS.md` y en el campo `credit` de cada imagen.

### Iconografía

- Mínima, un solo set lineal: **Lucide como SVG inline**, stroke 1.25-1.5, color `currentColor` o `--color-brand`. Solo donde aporte (reloj para duración, ubicación, redes, flechas, los 3-4 íconos de la franja de propuesta). Nada de tijeras/peines decorativos.

## RESTRICCIONES

Siempre:

- HTML semántico y accesibilidad AA (contraste, foco visible, alt descriptivo en cada foto definido en la collection, tabs y acordeones con ARIA correcto, lightbox y comparador antes/después operables con teclado, áreas táctiles ≥ 44px).
- Optimización de imágenes: `<Image />` y `<Picture />` de Astro con AVIF/WebP, srcset y sizes por layout, width/height para evitar CLS, carga diferida salvo el hero, y placeholder de baja resolución o color dominante. Metadatos EXIF eliminados en las imágenes publicadas. Si el hero usa video: mudo, en loop, playsinline, corto (≤ 10 s), comprimido (MP4/WebM), con poster y sin cargarse en conexiones lentas ni con reduced motion.
- Reserva: todos los botones "Reservar" leen de `site.ts` vía `bookingHref()`; si el link al sistema de turnos está vacío, usan WhatsApp con el mensaje prearmado (wa.me con texto codificado). En el demo, el link de turnos queda vacío.
- Mapa embebido cargado recién al hacer click (facade).
- Datos estructurados JSON-LD (schema.org HairSalon con dirección, horarios (openingHoursSpecification), teléfono, rango de precios y sameAs a redes; y Service/Offer para los servicios), Open Graph, sitemap y SEO local ("peluquería en Palermo", "balayage en Palermo" en títulos y descripciones).
- Copy en `site.ts`, servicios, equipo y trabajos solo en las collections, y cero JS fuera de las islands que lo necesiten (filtros, lightbox, comparador, tabs si no alcanzan con CSS).
- Footer con la línea "Sitio de demostración: la peluquería, el equipo y los precios son ficticios" mientras `site.demoNotice.enabled` sea `true`.
- Lighthouse ≥ 95 en performance, accesibilidad, buenas prácticas y SEO.

Nunca:

- Fotos de antes/después retocadas de forma engañosa, ni fotos de clientes reales sin su autorización.
- Testimonios o reseñas inventados presentados como reales (los de ejemplo van marcados como placeholder), ni promos con condiciones ocultas: cada promo muestra sus condiciones.
- Precios sin aclarar que son "desde" cuando dependen del largo o el estado del pelo.
- Un sistema de reservas o de pagos propio que pida datos de tarjeta, o una venta de gift cards funcional en el demo (es solo informativa, con CTA a WhatsApp).
- Carruseles automáticos rápidos, popups al entrar, música automática, librerías de componentes genéricas, frameworks de UI (React/Vue) salvo que sea imprescindible, emojis como íconos, lorem ipsum (usá copy creíble con la voz del salón), clichés visuales (tijeras y peines como decoración, fotos de stock de modelos) ni gradientes genéricos de "IA".

## COMPORTAMIENTO

- Responsive mobile-first (breakpoints sm/md/lg/xl/2xl); casi todo el tráfico llega desde Instagram y Google Maps en el celular. En mobile: botón "Reservar" fijo abajo, carta de servicios con categorías en tabs deslizables horizontalmente, galería en 2 columnas, menú en panel a pantalla completa y lightbox con swipe.
- Hover (solo con `@media (hover: hover)`): en los trabajos de la galería, zoom muy leve (≤ 1.03) y aparición de la categoría y la estilista; en las cards del equipo, cambio a una segunda foto con crossfade; en las filas de la carta, resaltado suave y aparición del botón "Reservar"; links con subrayado animado; botones con inversión de color.
- Comparador antes/después: slider con un `<input type="range">` accesible por encima de las dos imágenes (clip-path), arrastrable con mouse, touch y teclado, con etiquetas "Antes" y "Después".
- Animaciones: reveal on scroll (fade + translate 16-24px o máscara con clip-path, con stagger en grillas) usando CSS scroll-driven animations y fallback en IntersectionObserver; marquee lento con palabras clave o servicios (que se pausa con hover/foco); parallax muy sutil en las fotos del salón; titular del hero que entra por palabras. Duraciones de 200-700ms con easing `cubic-bezier(0.22, 1, 0.36, 1)`. Solo animar transform, opacity y clip-path. Si hace falta JS de animación, usar Motion (motion.dev) en islands chicas.
- Las referencias son estáticas y sobrias: el movimiento acompaña, no protagoniza. El fundido de la foto del hero puede revelarse con clip-path de izquierda a derecha.
- Transiciones entre páginas con View Transitions de Astro (`<ClientRouter />`), con `transition:name` para que la foto de una estilista o de un trabajo se transforme al abrir su detalle.
- Respetar `prefers-reduced-motion`: sin parallax, marquee, video automático ni desplazamientos (el hero queda con la imagen poster), solo fades instantáneos.

## Convenciones

- Código, identificadores y comentarios en inglés; copy de la UI en español rioplatense (voz del salón: cercana, relajada, con onda pero profesional).
- Commits convencionales, sin atribución de IA.
- Impeccable: pendiente de instalar para este proyecto (scope local) y correr su `teach`.
