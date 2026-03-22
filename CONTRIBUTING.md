# Contributing to Forgeline

Thanks for your interest in contributing to Forgeline! Here's how to get started.

## How It Works

Forgeline is a Claude Code plugin — there is no build step. You install it via the plugin marketplace and it runs inside Claude Code directly.

## Project Structure

```
.claude-plugin/plugin.json   — plugin manifest
agents/system-architect.md   — Opus agent that reads + generates
skills/setup-agents/SKILL.md — main skill, runs the 7-step dialogue
hooks/hooks.json             — internal hooks
templates/                   — Handlebars templates for generated files
docs/                        — documentation and specs
```

## Development Workflow

1. Fork the repo and clone it
2. Install as a local plugin: `/plugin add /path/to/forgeline`
3. Make your changes
4. Test by running `/setup-agents` in a sample project
5. Open a PR

## Guidelines

- **English only** — all code, comments, and documentation must be in English
- **Context7 for best practices** — always use Context7 (`resolve-library-id` → `query-docs`) to verify current best practices before making any decision about frameworks, libraries, or tooling. This applies to template content, agent definitions, plugin recommendations, skill logic, and contribution reviews — no exceptions
- **Templates are the source of truth** — generated file content comes from `templates/`, never hardcoded in skills or the agent
- **No assumptions** — if something is ambiguous, ask. Don't guess.

## Template Development

Templates live in `templates/` and use [Handlebars](https://handlebarsjs.com/) syntax (`.hbs` extension). They are the single source of truth for all generated content — nothing is hardcoded in skills or the agent.

### Expected Templates

Per the [design spec](docs/specs/2026-03-22-forgeline-design.md):

| Template | Generates |
|----------|-----------|
| `CLAUDE.md.hbs` | Architecture rules for target project |
| `agent.md.hbs` | Agent definition (one per agent) |
| `agentic-system.md.hbs` | Full system docs with Mermaid diagrams |
| `development-plan.md.hbs` | Phase tracker |
| `commands.md.hbs` | Command reference |
| `skills/check.md.hbs` | `/check` skill |
| `skills/changelog.md.hbs` | `/changelog` skill |
| `skills/phase.md.hbs` | `/phase` skill |
| `skills/deploy-check.md.hbs` | `/deploy-check` skill |

### Key Variables

Templates receive the confirmed configuration from the 7-step dialogue:

- `{{projectName}}` — target project name
- `{{agents}}` — array of confirmed agents (name, model, domain, forbidden zones)
- `{{skills}}` — array of confirmed skills (name, description, steps)
- `{{plugins}}` — array of confirmed plugins
- `{{hooks}}` — PostToolUse and Stop hook definitions
- `{{permissions}}` — allow and deny lists
- `{{stack}}` — detected tech stack details
- `{{linter}}` — linter config object (`command`)
- `{{typeChecker}}` — type checker config object (`command`)
- `{{testRunner}}` — test runner config object (`command`)
- `{{changelogDepth}}` — number of commits for changelog diff (default: 1)

### Helpers

Templates use the following custom Handlebars helpers:

- `{{inc value}}` — increments a number by 1 (used for 1-based indexing)

### Testing Templates

1. Install Forgeline as a local plugin: `/plugin add /path/to/forgeline`
2. Run `/setup-agents` in a test project with a known tech stack
3. Verify the generated files match the expected structure
4. Check that all Handlebars expressions resolve correctly

## Reporting Issues

Use [GitHub Issues](https://github.com/nikita-voloshyn/forgeline/issues) to report bugs or request features. Please include:

- What you expected to happen
- What actually happened
- Your tech stack (so we can reproduce)

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). Be respectful.
