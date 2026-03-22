# DevForge

> Scaffold a production-ready multi-agent development system for any project — from vision to a fully configured Claude Code workspace.

## What It Does

DevForge reads your project's `vision.md` and `tech-stack.md` (or falls back to `README.md`, `package.json`, `Cargo.toml`, etc.), runs a detailed interactive dialogue, and generates a complete agent system tailored to your stack:

- Specialized agents with strict domain boundaries
- Custom skills (`/check`, `/changelog`, `/phase`, `/deploy-check`, and more)
- Plugins configured for your tech stack (Context7 always included)
- Hooks for auto-linting and safety scans
- Permissions pre-configured (allow + deny)
- Full documentation: `agentic-system.md`, `development-plan.md`, `commands.md`

## Installation

```bash
/plugin marketplace add nikita-voloshyn/devforge
```

## Usage

Navigate to any project and run:

```bash
/setup-agents
```

DevForge will read your project, walk you through a 7-step configuration dialogue, and generate the full agent system in place.

## Input Files

| Priority | Files |
|----------|-------|
| Primary | `vision.md` + `tech-stack.md` |
| Fallback | `README.md`, `package.json`, `Cargo.toml`, `pyproject.toml`, etc. |

## What Gets Generated

```
.claude/
├── agents/*.md          — one file per agent
├── skills/*/SKILL.md    — selected skills
├── settings.json        — plugins, hooks, deny permissions
├── settings.local.json  — allow permissions, MCP servers
└── project.md           — tech stack context for all agents

CLAUDE.md                — architecture rules for your stack
docs/
├── agentic-system.md    — full system documentation with diagrams
├── development-plan.md  — phase tracker
└── commands.md          — command reference
```

## Configuration Dialogue

DevForge walks you through 7 steps before generating anything:

1. **Project understanding** — confirms what it read from your files
2. **Agents** — proposes agents based on your stack, you adjust
3. **Skills** — standard set + stack-specific additions
4. **Plugins** — Context7 always on, others recommended by stack
5. **Hooks** — PostToolUse linting + Stop safety scan
6. **Permissions** — allow/deny pre-filled, you extend
7. **Final confirmation** — full summary before generation

## License

MIT
