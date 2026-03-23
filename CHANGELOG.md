# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

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

[Unreleased]: https://github.com/nikita-voloshyn/forgeline/compare/v0.2.0-beta...HEAD
[0.2.0-beta]: https://github.com/nikita-voloshyn/forgeline/compare/v0.1.0-beta...v0.2.0-beta
[0.1.0-beta]: https://github.com/nikita-voloshyn/forgeline/releases/tag/v0.1.0-beta
