# Forgeline

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Claude Code Plugin](https://img.shields.io/badge/Claude%20Code-Plugin-blueviolet)](https://github.com/nikita-voloshyn/forgeline)
[![Version](https://img.shields.io/badge/version-0.1.0--beta-orange)](CHANGELOG.md)
[![Status](https://img.shields.io/badge/status-beta-orange)](CHANGELOG.md)

> Scaffold a production-ready multi-agent development system for any project — from vision to a fully configured Claude Code workspace.
>
> **Beta:** Forgeline is under active development. The core dialogue and agent architecture are in place, but Handlebars templates are not yet implemented. Expect breaking changes before v1.0.

## What It Does

Forgeline reads your project's `vision.md` and `tech-stack.md` (or falls back to `README.md`, `package.json`, `Cargo.toml`, etc.), runs a detailed interactive dialogue, and generates a complete agent system tailored to your stack:

- Specialized agents with strict domain boundaries
- Custom skills (`/check`, `/changelog`, `/phase`, `/deploy-check`, and more)
- Plugins configured for your tech stack (Context7 always included)
- Hooks for auto-linting and safety scans
- Permissions pre-configured (allow + deny)
- Full documentation: `agentic-system.md`, `development-plan.md`, `commands.md`

## Architecture

Forgeline follows a strict **skill + agent** separation:

```mermaid
flowchart LR
    User -->|/setup-agents| Skill[Setup Agents Skill]
    Skill -->|7-step dialogue| User
    Skill -->|confirmed config| Agent[System Architect Agent]
    Agent -->|Context7| C7[Best Practices]
    Agent -->|templates/| Templates[Handlebars Templates]
    Agent -->|generates| Output[.claude/ workspace]
```

| Component | Role | Model |
|-----------|------|-------|
| `/setup-agents` skill | Interactive dialogue, user confirmation | runs in user session |
| `system-architect` agent | File analysis, Context7 lookups, generation | claude-opus-4-6 |
| `templates/` | Source of truth for all generated content | N/A |

## Installation

```bash
/plugin marketplace add nikita-voloshyn/forgeline
```

## Usage

Navigate to any project and run:

```bash
/setup-agents
```

Forgeline will read your project, walk you through a 7-step configuration dialogue, and generate the full agent system in place.

## Input Files

| Priority | Files |
|----------|-------|
| Primary | `vision.md` + `tech-stack.md` |
| Fallback | `README.md`, `package.json`, `Cargo.toml`, `pyproject.toml`, etc. |

## What Gets Generated

```
.claude/
├── settings.json        — plugins, hooks, deny permissions
└── settings.local.json  — allow permissions, MCP servers

agents/*.md              — one file per agent
skills/*/SKILL.md        — selected skills

CLAUDE.md                — architecture rules for your stack
docs/
├── agentic-system.md    — full system documentation with diagrams
├── development-plan.md  — phase tracker
└── commands.md          — command reference
```

## Configuration Dialogue

Forgeline walks you through 7 steps before generating anything:

1. **Project understanding** — confirms what it read from your files
2. **Agents** — proposes agents based on your stack, you adjust
3. **Skills** — standard set + stack-specific additions
4. **Plugins** — Context7 always on, others recommended by stack
5. **Hooks** — PostToolUse linting + Stop safety scan
6. **Permissions** — allow/deny pre-filled, you extend
7. **Final confirmation** — full summary before generation

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## Security

To report vulnerabilities, see [SECURITY.md](SECURITY.md).

## License

MIT
