# CLAUDE.md — Forgeline

## Project Overview

Forgeline is a Claude Code plugin that scaffolds multi-agent development systems for any project. It reads a project's vision and tech stack, runs a structured configuration dialogue, and generates a complete `.claude/` workspace.

## Architecture Rules

1. **Plugin boundaries:** Skills handle dialogue only. The `system-architect` agent handles all file reading, analysis, and generation.
2. **Templates:** All generated file content must come from `templates/`. Never hardcode content inside skills or the agent.
3. **Context7 for best practices:** Always use Context7 (`resolve-library-id` → `query-docs`) to verify current best practices before making any decision about frameworks, libraries, or tooling. This applies to template content, agent definitions, plugin recommendations, skill logic, and contribution reviews — no exceptions.
4. **English only:** All generated files, comments, and documentation must be in English.
5. **No assumptions:** If the project files are ambiguous, the skill must ask — never guess.

## Project Structure

```
forgeline/
├── .claude-plugin/
│   ├── plugin.json              — plugin manifest (no skills/hooks fields — auto-discovery)
│   └── marketplace.json         — marketplace manifest (required for /plugin marketplace add)
├── agents/
│   └── system-architect.md      — Opus agent, reads + generates
├── skills/
│   └── setup-agents/
│       └── SKILL.md             — main skill, runs the 8-step dialogue
├── hooks/
│   └── hooks.json               — internal Forgeline plugin hooks (not the generation output)
├── templates/                   — Handlebars templates for generated files
│   ├── agents/                  — agent-specific templates (dispatch, docs)
│   ├── skills/                  — skill-specific templates
│   ├── approaches/              — approach content templates for CLAUDE.md sections
│   └── approaches-reference.md.hbs — all approaches in one file for /setup-approach
├── docs/
│   └── specs/                   — design specifications
├── .github/                     — issue/PR templates
├── CLAUDE.md                    — architecture rules (this file)
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── TASKS.md                     — active roadmap items and task tracking
├── CODE_OF_CONDUCT.md
├── SECURITY.md
└── LICENSE
```

## Plugin Packaging Rules

1. **No `skills` field in plugin.json** — Claude Code auto-discovers skills at `skills/*/SKILL.md`. Adding explicit `skills` breaks discovery or validation.
2. **`marketplace.json` required** — without it, `/plugin marketplace add` silently fails to clone the repo.
3. **Testing changes** — after pushing, clear all 5 cache locations before reinstalling (see memory for details). Restart terminal tab.

## Commands

- No build step required — this is a pure Claude Code plugin
