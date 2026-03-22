# Forgeline — Design Spec

**Date:** 2026-03-22
**Status:** Approved

---

## Overview

Forgeline is a Claude Code plugin that scaffolds a complete multi-agent development system for any project. Given a project's vision and tech stack, it runs a structured 7-step configuration dialogue and generates a fully configured Claude Code workspace tailored to the detected stack.

---

## Architecture

### Approach: Skill + Specialized Agent

The `/setup-agents` skill handles the interactive dialogue with the developer. The `system-architect` agent (Opus 4.6) handles all file reading, analysis, and generation. Clear separation: skill orchestrates, agent executes.

### Plugin Structure

```
forgeline/
├── .claude-plugin/
│   └── plugin.json              — plugin manifest
├── agents/
│   └── system-architect.md      — Opus 4.6, reads + generates
├── skills/
│   └── setup-agents/
│       └── SKILL.md             — main skill, runs the dialogue
├── hooks/
│   └── hooks.json               — forgeline-internal hooks
├── templates/                   — generation templates
│   ├── CLAUDE.md.hbs
│   ├── agent.md.hbs
│   ├── agentic-system.md.hbs
│   ├── development-plan.md.hbs
│   ├── commands.md.hbs
│   └── skills/
│       ├── check.md.hbs
│       ├── changelog.md.hbs
│       ├── phase.md.hbs
│       └── deploy-check.md.hbs
├── CLAUDE.md
└── README.md
```

### Installation

```bash
/plugin marketplace add nikita-voloshyn/forgeline
```

### Usage

```bash
# Navigate to any project
/setup-agents
```

---

## Input

| Priority | Files |
|----------|-------|
| Primary | `vision.md` + `tech-stack.md` |
| Fallback | `README.md`, `package.json`, `Cargo.toml`, `pyproject.toml`, `go.mod`, etc. |

---

## Configuration Dialogue (7 Steps)

### Step 1 — Project Understanding
Reads project files and presents a structured summary for confirmation. Extracts: name, type, languages, frameworks, database, AI/ML, testing, CI/CD, package manager.

### Step 2 — Agents
Proposes agents based on tech stack. Opus 4.6 for safety-critical domains, Sonnet 4.6 for high-iteration domains. Always includes a `testing` agent. User can add, remove, or rename.

### Step 3 — Skills
Standard set always included (`/check`, `/changelog`, `/phase`, `/deploy-check`). Stack-specific skills proposed when relevant tooling detected.

### Step 4 — Plugins
Context7 always enabled (non-negotiable). Additional plugins recommended based on detected stack. Context7 queried before presenting recommendations to ensure best practices.

### Step 5 — Hooks
PostToolUse: auto-lint on file edit (linter detected from stack). Stop: secrets and unsafe pattern scan at session end.

### Step 6 — Permissions
Allow list pre-filled with git, gh, package manager. Deny list always includes .env, secrets/**, ~/.ssh/**. User extends as needed.

### Step 7 — Final Confirmation
Full system summary presented. Generation only starts after explicit confirmation.

---

## Output (generated in target project)

```
.claude-plugin/
└── plugin.json              — plugins, hooks references

agents/
└── <name>.md                — one per confirmed agent

skills/
└── <name>/SKILL.md          — one per confirmed skill

hooks/
└── hooks.json               — PostToolUse + Stop hooks

CLAUDE.md                    — architecture rules for the stack
docs/
├── agentic-system.md        — full system docs with Mermaid diagrams
├── development-plan.md      — phase tracker
└── commands.md              — command reference
```

---

## Key Constraints

- Nothing is written before Step 7 confirmation
- Context7 is always used in Step 4 for current best practices
- All generated content is in English
- `system-architect` agent does not touch source code, tests, or CI files
- Templates in `templates/` are the single source of truth for generated content

---

## Agent Model Strategy

| Domain | Model | Rationale |
|--------|-------|-----------|
| Backend, database, AI/ML, infrastructure | claude-opus-4-6 | Safety-critical code |
| Frontend, testing, CI/CD, docs | claude-sonnet-4-6 | High iteration speed |
