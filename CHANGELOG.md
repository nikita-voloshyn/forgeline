# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [1.0.1] — 2026-04-01

### Fixed

- `/dispatch` renamed to `/assign` across all templates — avoids conflict with Claude Code built-in `/dispatch` command
- `pnpm playwright test` replaced with `pnpm test:e2e` (or `npx playwright`) — Playwright is a devDependency, not a pnpm subcommand
- Package Scripts Priority rule added to system-architect.md — agent now prefers `package.json` scripts over raw CLI invocations everywhere in generated files
- Post-generation Context7 audit (Phase 2) added to system-architect.md — verifies generated commands and API patterns against current docs after generation
- Part B of Context7 audit is now dynamic — agent derives library list and queries from the detected stack and written commands instead of a hardcoded lookup table
- README rewritten for first-time Claude Code users — added "What is Claude Code?", prerequisites, step-by-step first run, and development loop walkthrough
- "production-ready" removed from all descriptions in README, plugin.json, and marketplace.json
- Version bumped to 1.0.0 in plugin.json and marketplace.json (was 0.4.0-beta)
- `$schema` URL corrected in generated `settings.json` — was pointing to `json-schema.store`, now `json.schemastore.org`

## [1.0.0] — 2026-04-01

First stable release. All v0.x features are included and considered stable. Beta designation removed.

### Summary

- 8-step configuration dialogue (`/setup-agents`) — reads project files, proposes agents, skills, plugins, hooks, and permissions
- 22 Handlebars templates across agents, skills, approaches, and docs
- Task orchestration pipeline: `/plan` → `/assign` → `/execute`
- 5 development approaches (Iterative, Shape Up, TDD, Trunk-Based, YAGNI) + Custom
- Multi-approach composition (up to 3) with conflict detection
- `/setup-approach` — change approach without re-running setup
- Documentation agent + `/docs` skill for ongoing doc coverage
- `docs/approaches-reference.md` — approach switcher reference file

### Changed

- Version bumped from 0.4.0-beta to 1.0.0
- Beta status removed from README and plugin manifests

## [0.4.0-beta] — 2026-03-26

### Added
- `/setup-approach` skill — change development approach without re-running `/setup-agents`
- `docs/approaches-reference.md` — generated reference file with all 5 approach contents, used by `/setup-approach`
- Multi-approach composition — select 1-3 approaches, first is primary (sets cadence), others layer rules on top
- Conflict matrix for incompatible approach pairs (Iterative + Shape Up)
- Custom approach — describe a methodology in free text, system architect extracts structured content
- `## Custom` section in `docs/approaches-reference.md` for storing custom approach content
- Secondary approach rendering in CLAUDE.md with precedence note
- Documentation agent + `/docs` skill — audit, update, and check documentation coverage across all project components
- Context7 compliance: `color`, `tools`, `<example>` blocks, `version` in all agent/skill templates
- YAML block scalar format for agent descriptions with `<example>` blocks

### Changed
- Standard skill set expanded from 8 to 9 (+`/setup-approach`)
- Step 2 in dialogue now supports multi-select (1-3 approaches) and custom approach option
- Model values use short form (`opus`/`sonnet`) per Claude Code plugin validator requirements

## [0.3.0-beta] — 2026-03-24

### Added
- Task orchestration pipeline: `/plan` → `/dispatch` → `/execute` — 3 new skill templates
- Dispatch agent template (`templates/agents/dispatch.md.hbs`) — task assignment agent generated per-project
- Development Approach selection — new Step 2 in dialogue (Iterative, Shape Up, TDD, Trunk-Based, YAGNI)
- 5 approach content templates (`templates/approaches/`) — generate CLAUDE.md sections per methodology
- Resume mechanism for `/execute` — per-task status tracking in dispatch files enables cross-session resume
- Development Workflow section in generated CLAUDE.md and agentic-system.md
- `docs/plans/` directory in generated projects for plan/dispatch/report audit trail

### Changed
- Setup dialogue expanded from 7 to 8 steps (new Step 2: Development Approach)
- Standard skill set expanded from 4 to 7 skills (+`/plan`, `/dispatch`, `/execute`)
- `/phase` skill refactored as backward-compat wrapper — redirects to orchestration pipeline when available
- `development-plan.md.hbs` now adapts phase structure to selected approach
- `system-architect.md` updated to generate dispatch agent, new skills, approach sections, and `docs/plans/`

## [0.2.0-beta] — 2026-03-22

### Added
- All 9 Handlebars templates for generation engine (`CLAUDE.md.hbs`, `agent.md.hbs`, `agentic-system.md.hbs`, `development-plan.md.hbs`, `commands.md.hbs`, `skills/check.md.hbs`, `skills/changelog.md.hbs`, `skills/phase.md.hbs`, `skills/deploy-check.md.hbs`)
- Context7 workflow — explicit instructions for agent lookups
- Linter/formatter auto-detection with fallback chains (Biome → ESLint, Clippy, Ruff → Black, gofmt)
- Hook command generation with stack-specific linter paths and polyglot routing
- `settings.json` / `settings.local.json` generation with full mapping from dialogue steps

## [0.1.0-beta] — 2026-03-22

### Added
- Initial plugin scaffold: skill, agent, hooks, templates
- 7-step configuration dialogue (`/setup-agents`)
- System Architect agent (Opus 4.6) for project analysis and generation
- Context7 integration for verifying framework best practices
- Marketplace manifest (`marketplace.json`) for self-hosted distribution
- MIT license and open-source project structure

### Fixed
- Removed `skills` field from `plugin.json` — auto-discovery at `skills/*/SKILL.md` works without it
- Added `marketplace.json` to fix `/plugin marketplace add` failing silently

[Unreleased]: https://github.com/nikita-voloshyn/forgeline/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/nikita-voloshyn/forgeline/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/nikita-voloshyn/forgeline/compare/v0.4.0-beta...v1.0.0
[0.4.0-beta]: https://github.com/nikita-voloshyn/forgeline/compare/v0.3.0-beta...v0.4.0-beta
[0.3.0-beta]: https://github.com/nikita-voloshyn/forgeline/compare/v0.2.0-beta...v0.3.0-beta
[0.2.0-beta]: https://github.com/nikita-voloshyn/forgeline/compare/v0.1.0-beta...v0.2.0-beta
[0.1.0-beta]: https://github.com/nikita-voloshyn/forgeline/releases/tag/v0.1.0-beta
