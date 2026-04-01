# Contributing to Forgeline

Thanks for your interest in contributing to Forgeline! Here's how to get started.

## How It Works

Forgeline is a Claude Code plugin — there is no build step. You install it via the plugin marketplace and it runs inside Claude Code directly.

## Project Structure

```
.claude-plugin/plugin.json   — plugin manifest
agents/system-architect.md   — Opus agent that reads + generates
skills/setup-agents/SKILL.md — main skill, runs the 8-step dialogue
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

| Template | Generates |
|----------|-----------|
| `CLAUDE.md.hbs` | Architecture rules + approach sections for target project |
| `agent.md.hbs` | Agent definition (one per domain agent) |
| `agentic-system.md.hbs` | Full system docs with Mermaid diagrams |
| `development-plan.md.hbs` | Phase tracker (adapts to selected approach) |
| `commands.md.hbs` | Command reference |
| `skills/check.md.hbs` | `/check` quality pipeline |
| `skills/changelog.md.hbs` | `/changelog` session changelog |
| `skills/phase.md.hbs` | `/phase` feature executor |
| `skills/deploy-check.md.hbs` | `/deploy-check` pre-deployment audit |
| `skills/plan.md.hbs` | `/plan` feature decomposition |
| `skills/assign.md.hbs` | `/assign` task-to-agent assignments |
| `skills/execute.md.hbs` | `/execute` task runner with resume |
| `skills/docs.md.hbs` | `/docs` documentation coverage |
| `skills/setup-approach.md.hbs` | `/setup-approach` approach switcher |
| `agents/dispatch.md.hbs` | Dispatch agent (task orchestration) |
| `agents/docs.md.hbs` | Docs agent (documentation coverage) |
| `approaches/iterative.md.hbs` | Iterative + Timeboxing approach content |
| `approaches/shape-up.md.hbs` | Shape Up approach content |
| `approaches/tdd.md.hbs` | TDD-First approach content |
| `approaches/trunk-based.md.hbs` | Trunk-Based approach content |
| `approaches/yagni.md.hbs` | YAGNI/KISS approach content |
| `approaches-reference.md.hbs` | All 5 approaches in one reference file |

### Key Variables

Templates receive the confirmed configuration from the 8-step dialogue:

- `{{projectName}}` — target project name
- `{{projectDescription}}` — one-line project description
- `{{projectStructure}}` — directory tree overview
- `{{agents}}` — array of confirmed agents (`name`, `model`, `displayName`, `domain`, `directives`, `owns`, `forbidden`, `verification`)
- `{{skills}}` — array of confirmed skills (`name`, `description`, `steps`)
- `{{plugins}}` — array of confirmed plugins (`name`, `reason`)
- `{{hooks}}` — PostToolUse and Stop hook definitions (`command`)
- `{{permissions}}` — allow and deny lists
- `{{stack}}` — detected tech stack details
- `{{commands}}` — project command reference
- `{{phases}}` — development plan phases (`number`, `name`, `status`, `description`)
- `{{packageManager}}` — package manager config (`commands`, `auditCommand`)
- `{{linter}}` — linter config (`command`, `fixCommand`)
- `{{typeChecker}}` — type checker config (`command`)
- `{{testRunner}}` — test runner config (`command`, `watchCommand`)
- `{{buildCommand}}` — project build command
- `{{changelogDepth}}` — number of commits for changelog diff (default: 1)
- `{{currentDate}}` — current date for changelog entries

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
