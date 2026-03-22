# Templates

This directory contains [Handlebars](https://handlebarsjs.com/) templates (`.hbs`) used by the `system-architect` agent to generate files in target projects.

**Status: Under active development.** See the [design spec](../docs/specs/2026-03-22-forgeline-design.md) for the full schema.

## Expected Templates

| Template | Generates |
|----------|-----------|
| `CLAUDE.md.hbs` | Architecture rules for target project |
| `agent.md.hbs` | Agent definition (one per agent) |
| `agentic-system.md.hbs` | Full system docs with Mermaid diagrams |
| `development-plan.md.hbs` | Phase tracker |
| `commands.md.hbs` | Command reference |
| `skills/check.md.hbs` | `/check` skill — full quality pipeline |
| `skills/changelog.md.hbs` | `/changelog` skill — session changelog |
| `skills/phase.md.hbs` | `/phase` skill — multi-step feature executor |
| `skills/deploy-check.md.hbs` | `/deploy-check` skill — pre-deployment audit |

## How Templates Work

1. The `/setup-agents` skill runs a 7-step dialogue with the user
2. The confirmed configuration is passed to the `system-architect` agent
3. The agent fills in these templates with the configuration and writes the output to the target project

All generated content must come from templates — nothing is hardcoded in skills or the agent.

## Contributing Templates

See the [Template Development](../CONTRIBUTING.md#template-development) section in CONTRIBUTING.md.
