# Forgeline Roadmap

**Current version:** 0.1.0-beta
**Status:** Architecture and dialogue flow complete. Generation engine not yet functional.

---

## v0.1.0-beta (current)

- [x] Plugin scaffold (plugin.json, agents/, skills/, hooks/)
- [x] `/setup-agents` skill — 7-step configuration dialogue
- [x] `system-architect` agent definition (Opus 4.6)
- [x] Design spec (approved)
- [x] Open-source project structure (LICENSE, CONTRIBUTING, CHANGELOG, etc.)
- [x] Context7 mandate across all files
- [x] GitHub issue/PR templates

---

## v0.2.0 — Generation Engine

**Goal:** Make the plugin actually generate files.

### Handlebars Templates (BLOCKING)

All 9 templates required for the system-architect agent to produce output:

- [ ] `templates/CLAUDE.md.hbs` — architecture rules for target project
- [ ] `templates/agent.md.hbs` — agent definition (one per agent)
- [ ] `templates/agentic-system.md.hbs` — system docs with Mermaid diagrams
- [ ] `templates/development-plan.md.hbs` — phase tracker
- [ ] `templates/commands.md.hbs` — command reference
- [ ] `templates/skills/check.md.hbs` — `/check` quality pipeline
- [ ] `templates/skills/changelog.md.hbs` — `/changelog` session changelog
- [ ] `templates/skills/phase.md.hbs` — `/phase` feature executor
- [ ] `templates/skills/deploy-check.md.hbs` — `/deploy-check` pre-deployment audit

### Agent Implementation Details

- [x] Context7 workflow — explicit instructions for how the agent performs lookups and returns results to the skill
- [x] Linter/formatter auto-detection — detection logic with fallback chain (Biome → ESLint, Clippy, Ruff → Black, gofmt)
- [x] Hook command generation — templated commands with stack-specific linter paths, polyglot routing, Stop secrets scan
- [x] settings.json / settings.local.json generation — full format with mapping from dialogue steps

### ~~Output Path Consistency~~ (resolved)

- [x] Output uses `.claude/settings.json` + `.claude/settings.local.json` (standalone workspace, not plugin)
- [x] Design spec, agent definition, and README aligned

---

## v0.3.0 — Stack-Specific Skills

- [ ] `/migrate` template — for Prisma, Drizzle, Alembic
- [ ] `/e2e` template — for Playwright, Cypress, Puppeteer
- [ ] `/container` template — for Docker/docker-compose
- [ ] `/infra` template — for Terraform, Pulumi, CDK
- [ ] Trigger keywords for all generated skills

---

## v1.0.0 — Stable Release

- [ ] All templates tested on real projects (minimum 3 different stacks)
- [ ] Edge cases handled (monorepos, polyglot projects, empty repos)
- [ ] Plugin marketplace listing
- [ ] User documentation beyond README
- [ ] Remove beta badge from README
