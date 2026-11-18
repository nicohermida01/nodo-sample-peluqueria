---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/servicios.astro","src/pages/galeria.astro","src/pages/equipo/index.astro"]
---

# Surface: NUDO site (Home, Servicios, Galería, Equipo, legales)

Mode: Persuade (Home, Servicios, Equipo); Experience (Galería); Read (legales).
Audience/job/action: see PRODUCT.md. Primary action: "Reservar turno" via bookingHref() (WhatsApp fallback in the demo). Proof: the gallery works, before/after pairs, visible "desde" prices and durations. Constraints: CLAUDE.md (pinned brief + referencias/).

## Direction contract

THESIS: The salon's carta is the interface. Instead of a hero that talks and a "ver servicios" link, the first viewport hands the visitor the printed price card of the salon: pick a category, see "desde" price and duration, tap Reservar. Refuses the category default of a mood hero + three equal service cards + "conocé más".

OWN-WORLD: Cream paper ground #F4EEE5 with sand bands #EADFCD and one espresso band #1F1A16. Chocolate #5B3A25 ink for actions, bronze #9C7349 for the one italic word per headline and hairline rules. Fraunces (SOFT 50, weight ~380) for names and headlines, Manrope for UI with tabular figures. Carta rows: name, dotted leader, "desde $" price, duration with a clock glyph, 1px rules. Rectangular 2px buttons with uppercase tracked labels; pills only for category chips. Photos 4px radius, one arch-cropped photo per page. No shadows, no eyebrows above headings.

STORY: In one screen the visitor sees a real result, the salon's name and promise, and the carta itself; they understand prices are "desde" and that the salon works without hurry; they book a specific service in two taps, or scroll to see the work, the team and the place.

FIRST VIEWPORT: Desktop: right 7/12 a tall photo of a work (balayage) bleeding to the top and right edge, running under a transparent header, fading toward the cream ground on its left edge; left 5/12 the brand line as display headline ("Pelo con criterio, turnos *sin apuro*."), one-line lead, then the carta card: category chips (Cortes, Color, Tratamientos, Peinados, Barbería) and the 3 featured rows of the active category, each with price, duration and a Reservar link; under it the primary CTA "Reservar turno" (chocolate) and WhatsApp secondary. Mobile: photo 4:5 full width, headline overlapping its lower edge on a cream panel, carta below within the first scroll, sticky Reservar bar at the bottom.

FORM: Pinned by the user's brief (references in referencias/ plus the full page plan). seed: none (pinned) — hero: "hero con foto o video corto en loop del salón o de un trabajo + bajada + CTAs" / CLAUDE.md "Hero dividido en desktop (texto ~5/12, foto ~7/12 a sangre derecha con fundido suave al fondo)"; world: "Salón de autor contemporáneo: cálido, táctil, sofisticado sin ser frío, relajado, editorial y con un toque de actitud" / "igualá la sensación y el estilo (paleta, texturas, ritmo, tratamiento de fotos, peso tipográfico, presentación de servicios, interacciones)". Signature interaction: the carta switcher (CSS/ARIA tabs) whose Reservar composes "Hola! Quiero turno para [servicio]"; second moment: the before/after range slider. Motion grammar: hero headline enters by words; sections reveal with a short clip-path wipe upward (scroll-driven, IO fallback), 200-700ms, cubic-bezier(0.22,1,0.36,1); slow keyword marquee; everything off under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
