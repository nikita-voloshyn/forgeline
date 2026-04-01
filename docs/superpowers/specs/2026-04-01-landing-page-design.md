# Design Spec: Forgeline Landing Page

**Date:** 2026-04-01
**Status:** Approved

---

## Context

Forgeline v1.0.1 has no dedicated landing page — only a README on GitHub. The goal is a standalone marketing site that converts developers who've never heard of Forgeline into plugin installs. The site must be fast to build, easy to deploy, and visually credible for a developer-focused tool.

---

## Stack

- **Framework:** Astro (static output, zero JS by default)
- **Styling:** Tailwind CSS v4
- **Hosting:** Vercel or Netlify (static, no server)
- **Repo:** Separate repository (`forgeline-site` or similar)
- **Language:** English only

---

## Visual Identity

### Color palette — Electric Violet
| Token | Value | Usage |
|---|---|---|
| `bg-base` | `#0a0a0f` | Page background |
| `bg-surface` | `#0f0f16` | Cards, panels |
| `bg-elevated` | `#111118` | Nav, terminal bar |
| `border` | `rgba(255,255,255,.06)` | Default borders |
| `border-accent` | `rgba(124,58,237,.25)` | Accent borders |
| `accent` | `#7c3aed` | Primary accent, buttons, glow |
| `accent-light` | `#a78bfa` | Secondary accent, headings highlight |
| `text-primary` | `#f0f0f8` | Headings, body |
| `text-muted` | `#52526a` | Subtitles, descriptions |
| `text-dim` | `#2e2e48` | Hints, decorative |

### Typography
- **Font:** Inter (Google Fonts) — weights 400, 500, 700, 800, 900
- **Logo:** `FORGELINE` — Inter 900, all-caps, `letter-spacing: -.04em`, no icon
- **Hero h1:** 900 weight, `letter-spacing: -.04em`, clamp 40px–60px
- **Body:** 400/500, 14–16px, `line-height: 1.65`
- **Labels:** 700, 11px, `letter-spacing: .12em`, uppercase

### Texture
- Grain overlay: fixed SVG noise at 35% opacity over the entire page (subtle depth)
- Radial glow behind hero headline: `rgba(124,58,237,.15)`, 700×420px ellipse

---

## Page Structure

### 1. Nav (sticky)
- Logo: `FORGELINE` wordmark (Inter 900, white, `letter-spacing: -.04em`)
- Links: Docs · Changelog
- CTA: `GitHub ↗` — violet button, hover: lift + glow shadow
- Background: `rgba(10,10,15,.85)` + `backdrop-filter: blur(16px)`
- Bottom border: `rgba(124,58,237,.1)`

### 2. Hero
- Badge: `● CLAUDE CODE PLUGIN · v1.0.1` — pulsing violet dot, pill shape
- Headline: `Scaffold a <em>multi-agent</em> AI dev system in minutes` — "multi-agent" in `#a78bfa`
- Subtext: one sentence, max 460px wide, muted color
- Actions: `Forge your system →` (primary) + `★ Star on GitHub` (ghost)
- Terminal block: install command with blinking cursor + glow

**Animations:**
- Headline: `@starting-style` fade + clip-path from bottom on page load
- Badge: pulsing dot with CSS `animation: pulse 2s infinite`
- CTA button: spring physics on hover (`cubic-bezier(.34,1.56,.64,1)`) + ambient glow
- Cursor in terminal block: `blink 1.1s steps(1) infinite` + `box-shadow: 0 0 6px #7c3aed`

### 3. Before / After
- Section label: `THE PROBLEM IT SOLVES`
- Two-column grid, equal width, 16px gap
- Left panel (dark, neutral): "Setting up agents manually" — 5 pain points with `—` markers
- Right panel (violet tint): "With Forgeline" — 5 solutions with `→` markers
- No time metrics — behavior comparison only

**Animation:** Scroll-driven clip-path stagger — each row reveals bottom-to-top with 40ms delay between items, triggered by `animation-timeline: scroll()` + `animation-range`

### 4. How It Works
- Section label: `HOW IT WORKS`
- Three equal cards in a row
  - Step 01 · 🔌 · **Install** — one command, no npm
  - Step 02 · 💬 · **Answer 8 questions** — reads your project, proposes agents
  - Step 03 · ⚡ · **Get your system** — 50+ files generated
- Cards: `bg-surface`, subtle border
- On hover: `translateY(-4px)`, border switches to `rgba(124,58,237,.35)`, top edge gets gradient line

### 5. Terminal Demo
- Section label: `SEE IT IN ACTION`
- macOS-style window chrome (three dots, title bar)
- Shows real `/setup-agents` dialogue: detect stack → confirm agents → choose approach → "Generating 54 files..."
- Blinking cursor on last line

**Animation:** Scroll-driven typewriter — text appears character by character as the user scrolls into the section. Each line has a staggered `animation-delay`. Implementation: `animation-timeline: view()` + `@keyframes` that steps through characters.

### 6. Footer CTA
- Headline: `Ready to forge yours?`
- Subtext: `Free, open-source. Works with any project, any language.`
- CTA: `Forge your system →` (same primary button)
- Footer links: GitHub · Changelog · Contributing · MIT License
- Ambient glow from below (same radial gradient as hero, flipped)

---

## Animations — Technical Summary

| Element | Technique | Notes |
|---|---|---|
| Section entrance | CSS `@starting-style` + `clip-path` | No JS required |
| Scroll reveal | `animation-timeline: scroll()` | Native CSS, no IntersectionObserver |
| Before/After stagger | `animation-range` per row | 40ms delay increments |
| Terminal typewriter | `animation-timeline: view()` | Synced to scroll position |
| CTA hover | `cubic-bezier(.34,1.56,.64,1)` spring | Slight overshoot feel |
| Cursor blink | `steps(1) infinite` + glow | `box-shadow: 0 0 6px accent` |
| Badge pulse | `opacity` keyframe, 2s | Breathing effect |
| Card hover | `translateY(-4px)` + border fade | Smooth, no jank |

---

## File Structure

```
forgeline-site/
├── src/
│   ├── pages/
│   │   └── index.astro          — single page
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── BeforeAfter.astro
│   │   ├── HowItWorks.astro
│   │   ├── TerminalDemo.astro
│   │   └── Footer.astro
│   └── styles/
│       └── global.css           — tokens, grain, base reset
├── public/
│   └── favicon.svg
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## Verification

- [ ] Renders correctly in Chrome, Firefox, Safari
- [ ] All animations work without JavaScript disabled (progressive enhancement)
- [ ] Lighthouse performance score ≥ 90
- [ ] No layout shift (CLS = 0) from font loading
- [ ] Mobile-responsive at 375px (single column, stacked sections)
- [ ] Deploy preview on Vercel before going live
