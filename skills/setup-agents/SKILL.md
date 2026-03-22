---
name: setup-agents
description: Scaffold a complete multi-agent Claude Code development system for any project. Run this in any repo to generate agents, skills, hooks, and documentation tailored to your tech stack. Triggers on "setup agents", "scaffold agents", "initialize agent system", "setup devforge".
---

# /setup-agents

Scaffold a complete multi-agent Claude Code development system for the current project.

This skill runs a 7-step configuration dialogue, then delegates generation to the `system-architect` agent. Nothing is written until you confirm in Step 7.

---

## Step 1 — Read the Project

Search the current directory for project files in this order:

**Primary (preferred):**
- `vision.md`
- `tech-stack.md`

**Fallback (if primary not found):**
- `README.md`
- `package.json`, `pnpm-lock.yaml`, `package-lock.json`
- `Cargo.toml`
- `pyproject.toml`, `requirements.txt`
- `go.mod`
- `Gemfile`
- Root-level `*.config.ts`, `*.config.js`

Extract: project name, type, primary languages, frameworks, database/storage, AI/ML components, testing frameworks, CI/CD setup, package manager.

Present a confirmation summary and wait for the user to confirm or correct before proceeding.

---

## Step 2 — Agents

Based on the detected stack, propose specialized agents. Rules:

- **claude-opus-4-6** for safety-critical domains: backend logic, database, AI/ML pipelines, infrastructure
- **claude-sonnet-4-6** for high-iteration domains: frontend/UI, testing, CI/CD, documentation
- Each agent must have a clearly defined domain and explicit forbidden zones
- Always include a `testing` agent
- Minimum 2 agents, maximum 8

Present proposals and wait for the user to add, remove, or rename before proceeding.

---

## Step 3 — Skills

Always include the standard set. Add stack-specific skills when relevant tooling is detected.

**Standard (always):**
- `/check` — full quality pipeline (lint + typecheck + tests)
- `/changelog` — session changelog from git diff
- `/phase` — multi-step feature executor
- `/deploy-check` — pre-deployment audit

**Stack-specific examples:**
- `/migrate` — if Prisma, Drizzle, Alembic, or similar detected
- `/e2e` — if Playwright, Cypress, or Puppeteer detected
- `/container` — if Docker/docker-compose detected
- `/infra` — if Terraform, Pulumi, or CDK detected

Present the full list with checkboxes and wait for confirmation.

---

## Step 4 — Plugins

**Context7 is always enabled. Non-negotiable.**

Use Context7 now (`resolve-library-id` → `query-docs`) to verify current best practices and plugin recommendations for the detected tech stack before presenting options.

Always include:
- `context7` — mandatory for all projects

Recommend based on detected stack:
- `typescript-lsp` — if TypeScript detected
- `rust-analyzer-lsp` — if Cargo.toml detected
- `github` — if GitHub remote detected
- `playwright` — if Playwright in dependencies
- `code-simplifier` — always recommended

Present with checkboxes and wait for confirmation.

---

## Step 5 — Hooks

Detect the primary linter/formatter:
- TypeScript → Biome or ESLint (check config files)
- Rust → Clippy (`cargo clippy`)
- Python → Ruff or Black
- Go → `gofmt`

Propose:

**PostToolUse** (after every file edit): run linter on `$CLAUDE_FILE_PATH`
**Stop** (end of session): scan for hardcoded secrets and unsafe patterns

Present the proposed commands and wait for the user to modify or add custom hooks.

---

## Step 6 — Permissions

Pre-fill based on detected package manager and tools. Always include:

**Allow:**
- `Bash(git:*)`
- `Bash(gh pr:*)`
- `Bash(<package-manager>:*)` — detected package manager
- `Bash(make:*)` — if Makefile detected

**Deny (secrets protection — always):**
- `Read(.env)`
- `Read(.env.*)`
- `Read(secrets/**)`
- `Read(~/.ssh/**)`
- `Write(.env)`
- `Write(.env.*)`

Ask if there are additional commands to allow (docker, terraform, aws, kubectl, etc.) and wait for response.

---

## Step 7 — Final Confirmation

Present the complete system summary in a single block covering all agents, skills, plugins, hooks, and permissions. Ask:

```
Generate this system into the current repo? [yes / change]
```

- If **yes**: delegate to the `system-architect` agent with the full confirmed configuration
- If **change**: return to the relevant step

Do not write any files until this confirmation is received.
