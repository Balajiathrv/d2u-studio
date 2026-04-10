# Design Brief

## Direction

D2U Studio — Brutalist editorial architecture studio website with pure deep black background, oversized bold serif headings, indexed project listings, full-bleed imagery, and minimalist layout emphasizing visual hierarchy through negative space.

## Tone

Architectural editorial restraint — uncompromising, bold, gallery-like. Every element serves information hierarchy. No decoration; photography and typography carry the weight. Inspired by Archcraft Studio and premium architecture publications.

## Differentiation

Deep pure black (#0a0a0a) + boldface Cormorant Garamond + indexed P.01 project numbering + full-bleed photography creates a distinctly unforgettable, editorial-first aesthetic rarely seen in studio portfolios.

## Color Palette

| Token      | OKLCH      | Role                    |
| ---------- | ---------- | ----------------------- |
| background | 0.06 0.01  | Deep black, primary bg  |
| foreground | 0.95 0.01  | Off-white text          |
| card       | 0.1 0.01   | Darker black, sections  |
| muted      | 0.12 0.01  | Section alternate       |
| accent     | 0.62 0.08  | Gold/champagne accents  |
| border     | 0.15 0.01  | Thin divider lines      |

## Typography

- Display: Cormorant Garamond — bold serif for hero (text-7xl–9xl), section headings (text-5xl–7xl), project titles
- Body: DM Sans — clean sans-serif for body copy, labels, UI elements
- Label: text-xs uppercase tracking-widest, accent color for category labels

## Elevation & Depth

No shadows. Surface hierarchy through background color (pure black / deep charcoal alternation) and thin horizontal dividers. Full-bleed imagery provides visual depth.

## Structural Zones

| Zone      | Background    | Border                 | Notes                             |
| --------- | ------------- | ---------------------- | --------------------------------- |
| Header    | `bg-card`     | `border-b border-border` | Sticky, minimal, thin top line    |
| Hero      | `bg-background` | —                      | Full-bleed image, 80px padding    |
| Sections  | Alternating   | `divider-line` between | `bg-background` / `bg-muted`      |
| Footer    | `bg-card`     | `border-t border-border` | Contact info, links               |

## Spacing & Rhythm

Extreme negative space (min 8rem vertical gaps between sections). Full-width indexed project list. Max line-length ~70ch for body text. Editorial grid: 1-col mobile, 2-col desktop for projects.

## Component Patterns

- Buttons: Gold accent bg, black text, no border, no shadow, hover: slight opacity change
- Project cards: Full-bleed image + index number (P.01) + title below, thin divider below
- Dividers: Thin 1px horizontal lines between sections, full-width
- Labels: Accent gold text, uppercase, serif font

## Motion

- Entrance: fade-in from bottom over 0.6s, applied to sections on scroll
- Line wipe: dividers animate from left to right on section entrance
- Hover: subtle text color shift to accent on links, no scale transform

## Constraints

- No rounded corners except form inputs. All cards/sections: rectangle only
- No shadows, no overlays, no gradients. Pure black + white + gold only
- Typography hierarchy through size/weight, never color alone
- Image-first; photography is the primary visual element

## Signature Detail

Pure deep black + oversized bold serif + indexed project numbering (P.01, P.02) creates uncompromising editorial architecture aesthetic — gallery-like, professional, unforgettable.
