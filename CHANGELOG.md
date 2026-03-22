# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- Initial plugin scaffold: skill, agent, hooks, templates
- 7-step configuration dialogue (`/setup-agents`)
- System Architect agent (Opus 4.6) for project analysis and generation
- Context7 integration for verifying framework best practices
- Marketplace manifest (`marketplace.json`) for self-hosted distribution
- MIT license and open-source project structure

### Fixed
- Removed `skills` field from `plugin.json` — auto-discovery at `skills/*/SKILL.md` works without it (like superpowers plugin)
- Added `marketplace.json` to fix `/plugin marketplace add` failing silently

[Unreleased]: https://github.com/nikita-voloshyn/forgeline/compare/v0.1.0-beta...HEAD
