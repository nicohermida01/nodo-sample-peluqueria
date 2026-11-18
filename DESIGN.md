---
name: NUDO Estudio de Pelo
description: Auteur hair salon in Palermo; the printed price carta on cream paper is the interface.
colors:
  cream-ground: "#F4EEE5"
  sand-band: "#EADFCD"
  carta-paper: "#FBF8F3"
  espresso-ink: "#1F1915"
  walnut-muted: "#6B5F52"
  linen-rule: "#D6C7B0"
  bronze: "#9C7349"
  bronze-strong: "#7A5533"
  chocolate: "#5B3A25"
  on-chocolate: "#F4EEE5"
  espresso-night: "#1F1A16"
  on-night: "#EFE7DB"
  bronze-on-night: "#C9A47A"
typography:
  display:
    fontFamily: "Fraunces Variable, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.75rem, 1.6rem + 5vw, 5.75rem)"
    fontWeight: 380
    lineHeight: 1.02
    letterSpacing: "-0.03em"
    fontVariation: "normal (opsz auto)"
  hero:
    fontFamily: "Fraunces Variable, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.75rem, 1.5rem + 3.4vw, 5.25rem)"
    fontWeight: 380
    lineHeight: 1.02
    letterSpacing: "-0.03em"
    fontVariation: "normal (opsz auto)"
  headline-lg:
    fontFamily: "Fraunces Variable, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.25rem, 1.5rem + 3.2vw, 4rem)"
    fontWeight: 380
    lineHeight: 1.05
    letterSpacing: "-0.025em"
    fontVariation: "normal (opsz auto)"
  headline:
    fontFamily: "Fraunces Variable, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.875rem, 1.4rem + 2vw, 3rem)"
    fontWeight: 380
    lineHeight: 1.08
    letterSpacing: "-0.02em"
    fontVariation: "normal (opsz auto)"
  title:
    fontFamily: "Fraunces Variable, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem)"
    fontWeight: 380
    lineHeight: 1.15
    letterSpacing: "-0.01em"
    fontVariation: "normal (opsz auto)"
  body:
    fontFamily: "Manrope Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Manrope Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Manrope Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.14em"
  figures:
    fontFamily: "Manrope Variable, ui-sans-serif, system-ui, sans-serif"
    fontFeature: "\"tnum\" 1, \"lnum\" 1"
rounded:
  button: "2px"
  photo: "4px"
  feature: "16px"
  pill: "999px"
spacing:
  gutter-sm: "16px"
  gutter-md: "24px"
  gutter-lg: "32px"
  section-sm: "72px"
  section-md: "104px"
  section-lg: "144px"
  container: "1280px"
  container-wide: "1440px"
  header: "68px"
components:
  button-primary:
    backgroundColor: "{colors.chocolate}"
    textColor: "{colors.on-chocolate}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "12px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "transparent"
    textColor: "{colors.chocolate}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.chocolate}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "12px 24px"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.chocolate}"
    textColor: "{colors.on-chocolate}"
  button-primary-night:
    backgroundColor: "{colors.bronze-on-night}"
    textColor: "{colors.espresso-night}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "12px 24px"
    height: "48px"
  button-secondary-night:
    backgroundColor: "transparent"
    textColor: "{colors.on-night}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "12px 24px"
    height: "48px"
  chip-category:
    backgroundColor: "transparent"
    textColor: "{colors.walnut-muted}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "40px"
  chip-category-active:
    backgroundColor: "{colors.chocolate}"
    textColor: "{colors.on-chocolate}"
  badge:
    backgroundColor: "transparent"
    textColor: "{colors.bronze-strong}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  carta-card:
    backgroundColor: "{colors.carta-paper}"
    textColor: "{colors.espresso-ink}"
    rounded: "{rounded.photo}"
  sticky-booking-bar:
    backgroundColor: "{colors.carta-paper}"
    padding: "12px 16px"
---

# Design System: NUDO Estudio de Pelo

## Overview

**Creative North Star: "The Printed Carta"**

The salon's price card is the interface. Everything reads like a well-set printed menu on warm cream paper: a soft, low-contrast serif for names and promises, a precise sans with tabular figures for prices and durations, 1px rules and dotted leaders joining a service to its "desde" price. The site is calm and unhurried, the way the salon claims to be: generous section air, one dark espresso band per page for the room itself, and photography of the work carrying the persuasion.

The system is flat and editorial. Depth comes from paper tones (cream ground, sand bands, lighter carta paper, one espresso night band), never from shadows. Actions are chocolate, rectangular and nearly square-cornered with tracked uppercase labels; pills are reserved for things you pick (category chips) or read as a tag (badges). The one signature form is the arch, a mirror-shaped photo crop used once per page.

Motion is quiet and directional: hero headlines enter word by word, sections reveal with a short upward clip-path wipe, salon photos drift a few percent on scroll, a slow keyword marquee runs at 60s. Every one of these is off under reduced motion, and content is visible without JS.

**Key Characteristics:**
- Cream paper ground with sand and espresso bands; flat, no elevation.
- Fraunces (wght + opsz subset, optical size auto) at weight 380, never bold; one italic bronze word per key headline.
- Manrope for UI, tabular lining figures for every price and duration.
- Carta rows: name, dotted leader, "desde $" price, clock-and-duration line, Reservar link, 1px rules.
- Rectangular 2px chocolate buttons with uppercase tracked labels.
- Photos at 4px; one arch-cropped photo per page.
- Headlines stand alone: no small label above them.

## Colors

A warm, low-chroma paper-and-coffee palette (all hues 53 to 81 degrees in OKLCH), where the only saturated moments are chocolate actions and bronze emphasis.

### Primary
- **Chocolate** (accent): every primary action (Reservar buttons, active category chip, open FAQ toggle), focus rings, text selection and the caret. Inverts to outlined on hover.
- **On Chocolate**: label text on chocolate; the same cream as the ground.

### Secondary
- **Bronze** (brand): the single italic emphasized word in a headline, decorative icons (clock, proposal icons, menu arrows), the marquee separator dots and link underline decoration. Text use only at 24px and above (3.7:1 on cream).
- **Bronze Strong** (brand-strong): bronze for small text: block labels in uppercase, badges, "ver carta" links, hover color of nav links and team names (5.7:1).
- **Bronze on Night** (brand-on-night): bronze inside the espresso band: emphasis word, night primary button, focus ring (7.5:1).

### Neutral
- **Cream Ground** (bg): page background, header, hero text panel, mobile menu.
- **Sand Band** (surface): alternating full-width bands (Team, Promos, Category scroller, Footer) and photo placeholder fill in every frame.
- **Carta Paper** (paper): the lighter sheet the carta card, FAQ band and sticky booking bar sit on.
- **Espresso Ink** (ink): primary text, the announcement bar.
- **Walnut Muted** (muted): leads, secondary text, durations, inactive chips, "desde" prefix (5.4:1 on cream).
- **Linen Rule** (line): every 1px divider and card border, dotted leaders at 60%, scrollbar thumb.
- **Espresso Night** (night): the one dark band per page (the salon and its products).
- **On Night**: text inside the night band; secondary copy at 80% opacity, rules at 20%.

### Named Rules
**The Paper Stack Rule.** Surfaces separate by tone, in the order cream ground, sand band, carta paper, espresso night. A new section picks a paper; it never lifts with a shadow.

**The Small Bronze Rule.** Bronze below 24px is always Bronze Strong. Plain Bronze at small sizes is for icons and decoration only.

**The One Night Rule.** One espresso band per page, carrying the room (photos of the salon, philosophy, products). Inside it, every accent switches to its on-night pair.

## Typography

**Display Font:** Fraunces Variable (with Iowan Old Style, Georgia, serif)
**Body Font:** Manrope Variable (with ui-sans-serif, system-ui, sans-serif)

**Character:** A soft, warm, high-contrast serif at a light 380 weight for anything a person would say aloud (headlines, service names, stylist names, FAQ questions, quotes), paired with a crisp geometric sans for everything operational. The serif never goes bold; hierarchy comes from size and air.

### Hierarchy
- **Display** (380, clamp 44 to 92px, 1.02, -0.03em): page intro H1s on inner pages, entering word by word.
- **Hero** (380, clamp 44 to 84px, 1.02, -0.03em): the home hero headline only, max 13ch.
- **Headline Large** (380, clamp 36 to 64px, 1.05): night band and major section titles.
- **Headline** (380, clamp 30 to 48px, 1.08): default section headings, max 18ch, balanced wrap.
- **Title** (380, clamp 22 to 28px, 1.15): stylist names, product line names, card titles.
- **Body** (400, 16 to 18px, 1.6): running text and leads, leads capped at 44 to 54ch, prose at 68ch.
- **Small** (400, 15px, 1.55): addresses, hours, stylist roles, product descriptions.
- **Label** (600, 13px, 0.14em, uppercase): buttons, nav, inline action links, block labels in footer and location; 12px variant for badges, captions and the announcement bar.
- **Figures**: tabular lining numerals on every price, duration, count and hour.

Service names in carta rows use the serif at 18 to 20px; FAQ questions at 18 to 22px; the salon philosophy opener at 20 to 26px.

### Named Rules
**The One Italic Word Rule.** A key headline may italicize one word or short phrase in bronze, written in copy as `*word*`. Today: hero, night band, final CTA, Servicios carta heading. Not every heading gets one.

**The Standalone Headline Rule.** Nothing sits above a headline. Uppercase labels title lists and info blocks (Dirección, Horarios, Condiciones), never a section heading.

**The Figures Rule.** Any number a client compares (price, duration, hours, counts) is tabular and lining.

## Layout

Two containers: the site container (max 1280px) for content and the wide container (max 1440px) for the header and hero edge. Side gutters are 16px on phones, 24px from 768px, 32px from 1280px. Sections breathe on a three-step vertical rhythm (72px, 104px from 768px, 144px from 1024px). The header is a 68px sticky bar; anchors scroll with that height plus 16px of padding.

Composition runs on a 12-column grid from 1024px. The home hero splits 5/12 text and carta on the left, 7/12 photo on the right bleeding to the top and right edge under a transparent header, masked to fade into cream on its left 22%. On phones the photo comes first at 4:5 (max 78svh) and the cream text panel overlaps its lower edge by 96px with a 4px top radius. Sections often pair a 4-column sticky heading with an 8-column body (FAQ) or set photos off-grid with negative top margins so an image straddles two bands (the arch photo pulls 112 to 160px up into the band above).

Below 768px a fixed booking bar on carta paper pins Reservar and a WhatsApp icon button to the bottom, respecting the safe area. Category navigation on Servicios is a sticky, horizontally scrolling chip row under the header. Hover effects apply only to hover-capable fine pointers; every target is at least 44px.

## Elevation & Depth

Completely flat. There is no box-shadow anywhere in the build. Depth is tonal (paper stack), structural (1px linen rules and borders) and photographic (images straddling band edges, gentle 4% scroll parallax). The only gradients are the hero photo's left-edge mask into cream and the cream scrim under the transparent header on desktop, both fading toward the ground color.

### Named Rules
**The No-Lift Rule.** Nothing casts a shadow, at rest or on hover. State is shown by fill inversion, color, underline offset or a 2px translate of an arrow icon.

## Shapes

Small, editorial corners. Buttons are near-square (2px); photos, the carta card and bordered cards use 4px; the feature radius (16px) belongs to the large salon photos in the night band. Full pills (999px) are for category chips, badges, gift card amounts, and circular controls (FAQ toggle, marquee dots). The signature silhouette is the arch: a fully rounded top over 4px bottom corners, inspired by oval salon mirrors, used on one portrait photo per page (night band on Home, page intro or team photo elsewhere). Borders are always 1px; dotted only for carta leaders.

### Named Rules
**The One Arch Rule.** One arch-cropped photo per page, always a 3:4 or 4:5 portrait. A second arch dilutes the signature.

## Components

### Buttons
Confident and quiet: a solid chocolate block that empties on hover.
- **Shape:** near-square (2px), 1px border, min height 48px.
- **Primary:** chocolate fill, cream label in uppercase tracked Manrope 13px/600, 12px 24px padding, 10px icon gap.
- **Hover / Focus:** fill inverts to transparent with chocolate text over 300ms soft ease-out; trailing arrow nudges 2px right. Focus is a 2px chocolate outline at 3px offset (bronze-on-night inside the night band).
- **Secondary:** transparent with chocolate border and label; fills chocolate on hover. WhatsApp variant leads with the message icon.
- **Night variants:** primary in bronze-on-night with espresso label; secondary outlined in on-night at 60%, filling on-night on hover.

### Text Action Links
Inline actions (Reservar in a carta row, Ver perfil, Ver carta completa) are uppercase label links in chocolate or bronze strong with an arrow icon, min 44px tall. The underline sits at 35% of the text color with a 0.28em offset and tightens to full color at 0.18em on hover.

### Chips
- **Style:** pill, 40px tall in the carta (44px in the Servicios nav), 14px horizontal padding, Manrope 14px/600, muted text on a transparent 1px border.
- **State:** the selected chip fills chocolate with cream text; inactive chips darken to ink on hover. The Servicios nav chips carry a 1px linen border and a tabular count at 70% opacity.

### Badges
Pill outline tags at 12px/600: bronze strong for "requiere consulta", linen and muted for deposit notes. In the night band they switch to on-night or bronze-on-night outlines.

### Cards / Containers
- **Corner Style:** 4px.
- **Background:** carta paper for the carta card, otherwise the band's own paper with a 1px linen border (promo and gift card articles).
- **Shadow Strategy:** none (see Elevation & Depth).
- **Internal Padding:** 24px, 40px from 768px for promo cards; the carta is tighter (16 to 20px sides).

### Navigation
Desktop: logo plus uppercase tracked links in ink, current page underlined in bronze at a 0.5em offset, hover to bronze strong, primary Reservar button at the right; the bar is cream with a linen bottom rule and goes transparent over the home hero. Mobile: a full-height dialog on cream with stacked serif links at 36px separated by linen rules, each with a bronze arrow, address and hours below, and stacked Reservar and WhatsApp buttons pinned to the bottom.

### Carta Switcher (signature)
The hero's printed price card: a carta-paper sheet with a 1px linen border and 4px corners, a scrolling ARIA tablist of category chips over a linen rule, and three featured carta rows per category. Arrow, Home and End keys move between tabs; the panel enters with a 380ms 6px rise. Each row's Reservar composes a prefilled booking message for that service. Ends with an uppercase "Ver carta completa" link in bronze strong.

### Carta Row (signature)
The atomic unit of the system. Serif service name (18 to 20px), a dotted muted leader stretching to the price, "desde" in muted plus the amount in semibold ink with tabular figures; beneath, a bronze clock icon with the duration in muted, optional badges, and the Reservar text link on the right. Rows divide with 1px linen top rules (16px vertical padding, tighter in the hero).

### Before / After Comparator
A photo pair split by a clip-path at a draggable position, driven by a native range input (keyboard operable), with an `ew-resize` cursor and a paper-colored focus ring on the handle.

### FAQ Accordion
Native exclusive `details` rows on carta paper, divided by linen rules; serif questions at 18 to 22px; a 40px circular toggle that fills chocolate when open; answers rise in over 380ms.

### Marquee
A slow (60s) loop of serif keywords at 28 to 52px separated by 6px bronze dots between linen rules; pauses on hover and focus, collapses to a static row under reduced motion.

## Do's and Don'ts

### Do:
- **Do** separate sections by paper tone (cream, sand, carta paper, one espresso night band) and 1px linen rules.
- **Do** set every price and duration in tabular lining figures, prefixed with "desde" in muted.
- **Do** keep primary actions as 2px rectangular chocolate buttons with uppercase 13px labels tracked at 0.14em, at least 48px tall.
- **Do** switch every accent to its on-night pair inside the night band (bronze-on-night, on-night at 80% for copy, 20% for rules).
- **Do** use Bronze Strong for any bronze text under 24px.
- **Do** crop exactly one portrait photo per page with the arch; keep other photos at 4px (16px only for large salon photos in the night band).
- **Do** use Lucide icons as inline SVG at stroke 1.5 in currentColor or bronze.
- **Do** gate motion behind reduced-motion and keep content visible without JS; ease with cubic-bezier(0.22, 1, 0.36, 1).

### Don't:
- **Don't** add shadows to anything, at rest or on hover.
- **Don't** set Fraunces bold or in all caps; hierarchy is size, never weight.
- **Don't** place a small label, kicker or eyebrow above a headline.
- **Don't** italicize more than one word or phrase per headline, or give every heading one.
- **Don't** use pills for primary buttons; pills are for chips, badges and circular controls.
- **Don't** hardcode colors in components; use the palette tokens only.
- **Don't** add decorative gradients; the only fades run from a photo into the cream ground.
- **Don't** use plain Bronze for body-size text.
