# Forgeline Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone Forgeline marketing site in a new `forgeline-site/` repo — Astro 5 + Tailwind v4, deployed to Vercel.

**Architecture:** Single-page Astro site (6 components). All animations are pure CSS — scroll-driven (`animation-timeline: view()`), `@starting-style`, and keyframes. Zero runtime JS required.

**Tech Stack:** Astro 5, Tailwind CSS v4, Inter via Google Fonts, Vercel static deploy.

**Spec:** `forgeline/docs/superpowers/specs/2026-04-01-landing-page-design.md`

---

### Task 1: Scaffold the project

**Files:**
- Create: `forgeline-site/` (new repo root)
- Create: `forgeline-site/astro.config.mjs`
- Create: `forgeline-site/src/styles/global.css`

- [ ] **Step 1: Create the Astro project**

```bash
npm create astro@latest forgeline-site -- --template minimal --no-git --install
cd forgeline-site
```

Expected: project created with `src/pages/index.astro`, `package.json`, `tsconfig.json`.

- [ ] **Step 2: Add Tailwind v4**

```bash
npx astro add tailwind
```

Accept all prompts. Expected: `tailwind.config.mjs` created, `astro.config.mjs` updated with `@astrojs/tailwind`.

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: `http://localhost:4321` responds with a blank page, no errors in terminal.

- [ ] **Step 4: Init git**

```bash
git init && git add . && git commit -m "chore: scaffold Astro + Tailwind project"
```

---

### Task 2: Global styles & design tokens

**Files:**
- Create: `src/styles/global.css`
- Modify: `src/pages/index.astro` (import global.css)

- [ ] **Step 1: Write `src/styles/global.css`**

```css
@import "tailwindcss";

@theme {
  --color-base: #0a0a0f;
  --color-surface: #0f0f16;
  --color-elevated: #111118;
  --color-accent: #7c3aed;
  --color-accent-light: #a78bfa;
  --color-text: #f0f0f8;
  --color-muted: #52526a;
  --color-dim: #2e2e48;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'SF Mono', 'Fira Code', 'Consolas', monospace;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  background: var(--color-base);
  color: var(--color-text);
  font-family: var(--font-sans);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* Grain overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
  opacity: 0.35;
}

/* Section divider */
.divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(124,58,237,.12), transparent);
}

/* Section label */
.section-label {
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--color-dim);
  margin-bottom: 44px;
}

/* Primary button */
.btn-primary {
  display: inline-flex;
  align-items: center;
  background: var(--color-accent);
  color: #fff;
  padding: 13px 22px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  font-family: var(--font-sans);
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  transition: transform .18s cubic-bezier(.34,1.56,.64,1), box-shadow .2s;
}
.btn-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,.09) 0%, transparent 60%);
  pointer-events: none;
}
.btn-primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 32px rgba(124,58,237,.5);
}

/* Ghost button */
.btn-ghost {
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: var(--color-muted);
  padding: 13px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  font-family: var(--font-sans);
  border: 1px solid rgba(255,255,255,.07);
  cursor: pointer;
  text-decoration: none;
  transition: border-color .2s, color .2s;
}
.btn-ghost:hover {
  border-color: rgba(255,255,255,.18);
  color: #b0b0c8;
}

/* Cursor blink */
.cursor {
  display: inline-block;
  width: 2px;
  height: 14px;
  background: var(--color-accent);
  border-radius: 1px;
  vertical-align: middle;
  margin-left: 2px;
  box-shadow: 0 0 6px var(--color-accent);
  animation: blink 1.1s steps(1) infinite;
}
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* Badge pulse */
.badge-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 6px var(--color-accent);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .35; }
}

/* Scroll-driven reveal */
@keyframes reveal-up {
  from { opacity: 0; clip-path: inset(100% 0 0 0); }
  to   { opacity: 1; clip-path: inset(0% 0 0 0); }
}
.reveal {
  animation: reveal-up .5s ease forwards;
  animation-timeline: view();
  animation-range: entry 0% entry 50%;
}
```

- [ ] **Step 2: Import in `src/pages/index.astro`**

```astro
---
import '../styles/global.css'
---
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Forgeline — Scaffold a multi-agent AI dev system in minutes</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
  </head>
  <body>
  </body>
</html>
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: `dist/` created, no errors.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: global styles, design tokens, base layout"
```

---

### Task 3: Nav component

**Files:**
- Create: `src/components/Nav.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/Nav.astro`**

```astro
---
const GITHUB = 'https://github.com/nikita-voloshyn/forgeline'
const CHANGELOG = 'https://github.com/nikita-voloshyn/forgeline/blob/main/CHANGELOG.md'
---

<nav>
  <a href="/" class="logo">FORGELINE</a>
  <div class="nav-links">
    <a href={CHANGELOG}>Changelog</a>
    <a href={GITHUB} class="nav-cta" target="_blank" rel="noopener">GitHub ↗</a>
  </div>
</nav>

<style>
nav {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 48px;
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(124, 58, 237, 0.1);
}

.logo {
  font-weight: 900;
  font-size: 17px;
  letter-spacing: -.04em;
  color: #fff;
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-links a {
  color: var(--color-muted);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: color .2s;
}
.nav-links a:hover { color: var(--color-text); }

.nav-cta {
  background: var(--color-accent) !important;
  color: #fff !important;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700 !important;
  transition: box-shadow .2s, transform .15s !important;
}
.nav-cta:hover {
  box-shadow: 0 4px 20px rgba(124, 58, 237, .45) !important;
  transform: translateY(-1px) !important;
  color: #fff !important;
}

@media (max-width: 640px) {
  nav { padding: 14px 20px; }
  .nav-links a:not(.nav-cta) { display: none; }
}
</style>
```

- [ ] **Step 2: Add Nav to `index.astro`**

```astro
---
import '../styles/global.css'
import Nav from '../components/Nav.astro'
---
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Forgeline — Scaffold a multi-agent AI dev system in minutes</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
  </head>
  <body>
    <Nav />
  </body>
</html>
```

- [ ] **Step 3: Check in browser**

```bash
npm run dev
```

Expected: sticky nav visible at top, FORGELINE wordmark on left, GitHub button on right.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: Nav component"
```

---

### Task 4: Hero component

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/Hero.astro`**

```astro
---
const GITHUB = 'https://github.com/nikita-voloshyn/forgeline'
---

<section class="hero">
  <div class="hero-glow" aria-hidden="true"></div>

  <div class="hero-badge">
    <span class="badge-dot"></span>
    CLAUDE CODE PLUGIN &nbsp;·&nbsp; v1.0.1
  </div>

  <h1>
    Scaffold a <em>multi-agent</em><br />
    AI dev system in minutes
  </h1>

  <p class="hero-sub">
    One command. 8 questions. 50+ generated files — agents, skills, hooks,
    and a task pipeline tailored to your stack.
  </p>

  <div class="hero-actions">
    <a href="#install" class="btn-primary">Forge your system →</a>
    <a href={GITHUB} target="_blank" rel="noopener" class="btn-ghost">★ Star on GitHub</a>
  </div>

  <div class="hero-terminal" id="install">
    <span class="t-prompt">$</span>
    <span class="t-cmd">/plugin marketplace add</span>
    <span class="t-arg"> nikita-voloshyn/forgeline</span>
    <span class="cursor"></span>
  </div>

  <p class="hero-hint">Run inside Claude Code · No npm · No build step</p>
</section>

<style>
.hero {
  padding: 110px 48px 90px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-glow {
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 420px;
  background: radial-gradient(ellipse, rgba(124,58,237,.15) 0%, transparent 68%);
  pointer-events: none;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(124, 58, 237, .1);
  border: 1px solid rgba(124, 58, 237, .25);
  border-radius: 20px;
  padding: 5px 14px;
  font-size: 11px;
  color: var(--color-accent-light);
  font-weight: 600;
  letter-spacing: .07em;
  margin-bottom: 30px;
}

h1 {
  font-size: clamp(40px, 5.5vw, 60px);
  font-weight: 900;
  line-height: 1.07;
  letter-spacing: -.04em;
  color: #fff;
  margin-bottom: 22px;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;

  /* @starting-style entrance */
  animation: hero-in .6s cubic-bezier(.16,1,.3,1) forwards;
}

@starting-style {
  h1 {
    opacity: 0;
    clip-path: inset(0 0 30% 0);
  }
}

@keyframes hero-in {
  from { opacity: 0; clip-path: inset(0 0 30% 0); }
  to   { opacity: 1; clip-path: inset(0 0 0% 0); }
}

h1 em {
  font-style: normal;
  color: var(--color-accent-light);
}

.hero-sub {
  font-size: 16px;
  color: var(--color-muted);
  max-width: 460px;
  margin: 0 auto 40px;
  line-height: 1.65;
}

.hero-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.hero-terminal {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #0f0f18;
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 10px;
  padding: 11px 20px;
  font-family: var(--font-mono);
  font-size: 13px;
}

.t-prompt { color: var(--color-dim); }
.t-cmd    { color: var(--color-accent-light); }
.t-arg    { color: var(--color-muted); }

.hero-hint {
  margin-top: 10px;
  font-size: 11px;
  color: var(--color-dim);
}

@media (max-width: 640px) {
  .hero { padding: 72px 20px 60px; }
  .hero-terminal { font-size: 11px; padding: 10px 14px; }
}
</style>
```

- [ ] **Step 2: Add Hero to `index.astro`**

```astro
---
import '../styles/global.css'
import Nav from '../components/Nav.astro'
import Hero from '../components/Hero.astro'
---
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Forgeline — Scaffold a multi-agent AI dev system in minutes</title>
    <meta name="description" content="One command. 8 questions. 50+ generated files — agents, skills, hooks, and a task pipeline tailored to your stack." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
  </head>
  <body>
    <Nav />
    <Hero />
  </body>
</html>
```

- [ ] **Step 3: Check in browser — hero visible, h1 entrance animation plays on load**

```bash
npm run dev
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: Hero component with entrance animation"
```

---

### Task 5: BeforeAfter component

**Files:**
- Create: `src/components/BeforeAfter.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/BeforeAfter.astro`**

```astro
---
const before = [
  'Read every project file yourself',
  'Define each agent from scratch',
  'Write CLAUDE.md with no template',
  'Configure skills and hooks by hand',
  'Redo it all for every new project',
]

const after = [
  'Reads your project automatically',
  'Proposes agents for your exact stack',
  'Generates CLAUDE.md with approach',
  'Stack-aware defaults, you adjust',
  'Works on any project, any language',
]
---

<section class="ba-section">
  <p class="section-label">The problem it solves</p>

  <div class="ba-grid">
    <div class="ba-panel ba-before">
      <div class="ba-header">
        <span class="ba-x-mark">✕</span> Setting up agents manually
      </div>
      {before.map((item, i) => (
        <div class="ba-row ba-row-before reveal" style={`animation-range: entry ${i * 5}% entry ${40 + i * 5}%`}>
          <span class="ba-icon">—</span>
          {item}
        </div>
      ))}
    </div>

    <div class="ba-panel ba-after">
      <div class="ba-header ba-header-after">
        <span class="ba-check-mark">✓</span> With Forgeline
      </div>
      {after.map((item, i) => (
        <div class="ba-row ba-row-after reveal" style={`animation-range: entry ${i * 5}% entry ${40 + i * 5}%`}>
          <span class="ba-icon-after">→</span>
          {item}
        </div>
      ))}
    </div>
  </div>
</section>

<style>
.ba-section {
  padding: 80px 48px;
  max-width: 880px;
  margin: 0 auto;
}

.ba-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.ba-panel {
  background: var(--color-surface);
  border: 1px solid rgba(255,255,255,.06);
  border-radius: 14px;
  padding: 24px;
}

.ba-after {
  border-color: rgba(124,58,237,.2);
  background: #0d0b18;
}

.ba-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .06em;
  color: var(--color-dim);
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(255,255,255,.05);
}

.ba-header-after { color: var(--color-accent-light); }
.ba-x-mark { color: #3a3a52; }
.ba-check-mark { color: var(--color-accent); }

.ba-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 0;
  font-size: 13px;
  line-height: 1.5;
  border-bottom: 1px solid rgba(255,255,255,.03);
}
.ba-row:last-child { border-bottom: none; }

.ba-row-before { color: var(--color-dim); }
.ba-row-after  { color: #c4b5fd; }

.ba-icon      { color: #3a3a52; flex-shrink: 0; }
.ba-icon-after { color: var(--color-accent); flex-shrink: 0; }

@media (max-width: 640px) {
  .ba-section { padding: 60px 20px; }
  .ba-grid { grid-template-columns: 1fr; }
}
</style>
```

- [ ] **Step 2: Add to `index.astro`**

```astro
import BeforeAfter from '../components/BeforeAfter.astro'
```

Add `<div class="divider"></div><BeforeAfter />` after `<Hero />`.

- [ ] **Step 3: Check scroll-reveal in browser — rows appear as you scroll in**

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: BeforeAfter component with scroll-driven stagger"
```

---

### Task 6: HowItWorks component

**Files:**
- Create: `src/components/HowItWorks.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/HowItWorks.astro`**

```astro
---
const steps = [
  {
    num: '01',
    icon: '🔌',
    title: 'Install',
    desc: 'One command inside Claude Code. No npm, no compilation, no build step.',
  },
  {
    num: '02',
    icon: '💬',
    title: 'Answer 8 questions',
    desc: 'Forgeline reads your project files and proposes agents tailored to your stack.',
  },
  {
    num: '03',
    icon: '⚡',
    title: 'Get your system',
    desc: '50+ generated files: specialized agents, workflow skills, hooks, and a full task pipeline.',
  },
]
---

<section class="hiw-section">
  <p class="section-label">How it works</p>
  <div class="steps">
    {steps.map((s) => (
      <div class="step reveal">
        <div class="step-top-line"></div>
        <div class="step-num">STEP {s.num}</div>
        <div class="step-icon">{s.icon}</div>
        <h3>{s.title}</h3>
        <p>{s.desc}</p>
      </div>
    ))}
  </div>
</section>

<style>
.hiw-section {
  padding: 80px 48px;
  max-width: 880px;
  margin: 0 auto;
}

.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.step {
  background: var(--color-surface);
  border: 1px solid rgba(255,255,255,.06);
  border-radius: 14px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  transition: border-color .2s, transform .2s cubic-bezier(.34,1.56,.64,1);
}

.step:hover {
  border-color: rgba(124,58,237,.35);
  transform: translateY(-4px);
}

.step-top-line {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(124,58,237,.5), transparent);
  opacity: 0;
  transition: opacity .2s;
}

.step:hover .step-top-line { opacity: 1; }

.step-num {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .12em;
  color: var(--color-accent);
  margin-bottom: 14px;
}

.step-icon {
  font-size: 26px;
  margin-bottom: 10px;
}

.step h3 {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 7px;
}

.step p {
  font-size: 13px;
  color: var(--color-muted);
  line-height: 1.65;
}

@media (max-width: 640px) {
  .hiw-section { padding: 60px 20px; }
  .steps { grid-template-columns: 1fr; }
}
</style>
```

- [ ] **Step 2: Add to `index.astro`**

```astro
import HowItWorks from '../components/HowItWorks.astro'
```

Add `<div class="divider"></div><HowItWorks />` after `<BeforeAfter />`.

- [ ] **Step 3: Check hover effect on cards in browser**

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: HowItWorks component"
```

---

### Task 7: TerminalDemo component

**Files:**
- Create: `src/components/TerminalDemo.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/TerminalDemo.astro`**

```astro
---
const lines = [
  { cls: 'tc-prompt-line', content: '<span class="tc-prompt">$ </span><span class="tc-cmd">/setup-agents</span>' },
  { cls: 'tc-dim',  content: '────────────────────────────────────' },
  { cls: 'tc-sys',  content: '⚒  Forgeline v1.0.1' },
  { cls: 'tc-white', content: 'Reading your project files...' },
  { cls: 'tc-dim',  content: '&nbsp;' },
  { cls: 'tc-q',    content: 'Step 1/8 — Detected: Next.js 15, Prisma 6, Vitest, Playwright' },
  { cls: 'tc-q',    content: 'Proposed agents: backend · database · frontend · testing · docs' },
  { cls: 'tc-qa',   content: '<span class="tc-q">Confirm or adjust? </span><span class="tc-a">confirm</span>' },
  { cls: 'tc-dim',  content: '&nbsp;' },
  { cls: 'tc-q',    content: 'Step 2/8 — Development approach:' },
  { cls: 'tc-muted', content: '&nbsp;&nbsp;[1] Iterative&nbsp;&nbsp;[2] Shape Up&nbsp;&nbsp;[3] TDD&nbsp;&nbsp;[4] Trunk-Based&nbsp;&nbsp;[5] YAGNI' },
  { cls: 'tc-qa',   content: '<span class="tc-q">Choose (1–5 or describe your own): </span><span class="tc-a">3</span>' },
  { cls: 'tc-dim',  content: '&nbsp;' },
  { cls: 'tc-sys',  content: '✓ Generating 54 files...<span class="cursor"></span>' },
]
---

<section class="demo-section">
  <p class="section-label">See it in action</p>

  <div class="term-win">
    <div class="term-bar">
      <span class="td td-red"></span>
      <span class="td td-yellow"></span>
      <span class="td td-green"></span>
      <span class="term-title">claude-code — ~/my-project</span>
    </div>
    <div class="term-body">
      {lines.map((line, i) => (
        <span
          class={`tl ${line.cls}`}
          style={`animation-range: entry ${Math.min(i * 4, 60)}% entry ${Math.min(i * 4 + 20, 80)}%`}
          set:html={line.content}
        />
      ))}
    </div>
  </div>
</section>

<style>
.demo-section {
  padding: 80px 48px;
  max-width: 760px;
  margin: 0 auto;
}

.term-win {
  background: #0d0d14;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 0 80px rgba(124,58,237,.1), 0 40px 80px rgba(0,0,0,.6);
}

.term-bar {
  background: var(--color-elevated);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-bottom: 1px solid rgba(255,255,255,.05);
}

.td {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.td-red    { background: #ff5f57; }
.td-yellow { background: #febc2e; }
.td-green  { background: #28c840; }

.term-title {
  color: var(--color-dim);
  font-size: 11px;
  font-family: var(--font-mono);
  margin-left: 10px;
}

.term-body {
  padding: 22px 26px 18px;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.9;
}

.tl {
  display: block;
  animation: reveal-up .35s ease forwards;
  animation-timeline: view();
  opacity: 0;
}

.tc-prompt { color: var(--color-dim); }
.tc-cmd    { color: var(--color-accent-light); }
.tc-sys    { color: var(--color-accent); font-weight: 600; }
.tc-q      { color: #5a6acc; }
.tc-a      { color: #4ade80; }
.tc-white  { color: #c0c0d8; }
.tc-muted  { color: var(--color-dim); }
.tc-dim    { color: #1e1e2e; }

@media (max-width: 640px) {
  .demo-section { padding: 60px 20px; }
  .term-body { font-size: 11px; padding: 16px; }
}
</style>
```

- [ ] **Step 2: Add to `index.astro`**

```astro
import TerminalDemo from '../components/TerminalDemo.astro'
```

Add `<div class="divider"></div><TerminalDemo />` after `<HowItWorks />`.

- [ ] **Step 3: Scroll down to terminal in browser — lines appear as you scroll**

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: TerminalDemo with scroll-driven line reveal"
```

---

### Task 8: Footer component

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/Footer.astro`**

```astro
---
const GITHUB = 'https://github.com/nikita-voloshyn/forgeline'
const CHANGELOG = `${GITHUB}/blob/main/CHANGELOG.md`
const CONTRIBUTING = `${GITHUB}/blob/main/CONTRIBUTING.md`
const LICENSE = `${GITHUB}/blob/main/LICENSE`
---

<footer>
  <div class="footer-glow" aria-hidden="true"></div>
  <h2>Ready to forge yours?</h2>
  <p class="footer-sub">Free, open-source. Works with any project, any language.</p>
  <a href="#install" class="btn-primary" style="font-size:15px;padding:14px 26px">
    Forge your system →
  </a>
  <nav class="footer-links">
    <a href={GITHUB} target="_blank" rel="noopener">GitHub</a>
    <a href={CHANGELOG}>Changelog</a>
    <a href={CONTRIBUTING}>Contributing</a>
    <a href={LICENSE}>MIT License</a>
  </nav>
</footer>

<style>
footer {
  padding: 90px 48px 60px;
  text-align: center;
  border-top: 1px solid rgba(255,255,255,.05);
  position: relative;
  overflow: hidden;
}

.footer-glow {
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 300px;
  background: radial-gradient(ellipse, rgba(124,58,237,.1) 0%, transparent 70%);
  pointer-events: none;
}

footer h2 {
  font-size: 34px;
  font-weight: 900;
  letter-spacing: -.03em;
  color: #fff;
  margin-bottom: 10px;
}

.footer-sub {
  font-size: 15px;
  color: var(--color-muted);
  margin-bottom: 32px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.footer-links a {
  color: var(--color-dim);
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
  transition: color .2s;
}
.footer-links a:hover { color: var(--color-accent-light); }

@media (max-width: 640px) {
  footer { padding: 60px 20px 40px; }
  footer h2 { font-size: 26px; }
}
</style>
```

- [ ] **Step 2: Final `src/pages/index.astro`**

```astro
---
import '../styles/global.css'
import Nav from '../components/Nav.astro'
import Hero from '../components/Hero.astro'
import BeforeAfter from '../components/BeforeAfter.astro'
import HowItWorks from '../components/HowItWorks.astro'
import TerminalDemo from '../components/TerminalDemo.astro'
import Footer from '../components/Footer.astro'
---
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Forgeline — Scaffold a multi-agent AI dev system in minutes</title>
    <meta name="description" content="One command. 8 questions. 50+ generated files — agents, skills, hooks, and a task pipeline tailored to your stack." />
    <meta property="og:title" content="Forgeline" />
    <meta property="og:description" content="Scaffold a multi-agent AI dev system in minutes." />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
  </head>
  <body>
    <Nav />
    <Hero />
    <div class="divider"></div>
    <BeforeAfter />
    <div class="divider"></div>
    <HowItWorks />
    <div class="divider"></div>
    <TerminalDemo />
    <div class="divider"></div>
    <Footer />
  </body>
</html>
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: Footer component + final page assembly"
```

---

### Task 9: Favicon

**Files:**
- Create: `public/favicon.svg`

- [ ] **Step 1: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#7c3aed"/>
  <text x="6" y="24" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="20" fill="white">F</text>
</svg>
```

- [ ] **Step 2: Verify favicon appears in browser tab**

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: favicon"
```

---

### Task 10: Build verification

**Files:** None (read-only verification step)

- [ ] **Step 1: Production build**

```bash
npm run build
```

Expected: `dist/` generated, zero errors, zero warnings.

- [ ] **Step 2: Preview production build**

```bash
npm run preview
```

Open `http://localhost:4321`. Check all sections render, animations play on scroll.

- [ ] **Step 3: Mobile check**

Open DevTools → toggle device toolbar → set to 375px width (iPhone SE). Verify:
- Nav shows only FORGELINE + GitHub button
- Hero text wraps cleanly, no overflow
- Before/After stacks to single column
- Steps stack to single column
- Terminal has no horizontal scroll

- [ ] **Step 4: Final commit**

```bash
git add -A && git commit -m "chore: verify build and mobile layout"
```

---

### Task 11: Deploy to Vercel

- [ ] **Step 1: Push repo to GitHub**

```bash
gh repo create forgeline-site --public --source=. --push
```

- [ ] **Step 2: Connect to Vercel**

Go to vercel.com → Add New Project → import `forgeline-site`. Framework: Astro (auto-detected). Deploy.

- [ ] **Step 3: Verify live deploy**

Open the Vercel preview URL. Check all sections, scroll animations, hover states.

- [ ] **Step 4: Set custom domain (optional)**

In Vercel project settings → Domains → add `forgeline.dev` or similar.

---

## Verification Checklist

- [ ] `npm run build` completes with zero errors
- [ ] FORGELINE wordmark renders in Inter 900 (check DevTools → Fonts)
- [ ] Hero h1 animates in on page load (`@starting-style`)
- [ ] Before/After rows reveal on scroll
- [ ] Step cards lift on hover with spring effect
- [ ] Terminal lines appear as you scroll into section
- [ ] CTA button has spring hover + glow shadow
- [ ] Grain overlay visible (subtle texture over whole page)
- [ ] Mobile layout correct at 375px
- [ ] Lighthouse performance ≥ 90
