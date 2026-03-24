---
name: setup-agents
description: Scaffold a complete multi-agent Claude Code development system for any project. Run this in any repo to generate agents, skills, hooks, and documentation tailored to your tech stack. Triggers on "setup agents", "scaffold agents", "initialize agent system", "setup forgeline".
---

# /setup-agents

Scaffold a complete multi-agent Claude Code development system for the current project.

This skill runs an 8-step configuration dialogue, then delegates generation to the `system-architect` agent. Nothing is written until you confirm in Step 8.

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

Extract: project name, type, primary languages, frameworks, database/storage, AI/ML components, testing frameworks, CI/CD setup, package manager, team size (if mentioned).

Present a confirmation summary and wait for the user to confirm or correct before proceeding.

---

## Step 2 — Development Approach

Based on the project context from Step 1, suggest a development approach. Present all 5 options with a recommended pick:

| Signal | Suggested approach |
|--------|--------------------|
| Solo developer, small project | Iterative + Timeboxing |
| Team project, existing CI/CD | Trunk-Based |
| Product with deadlines | Shape Up |
| Greenfield, unclear scope | Iterative + Timeboxing |
| Library/OSS | TDD-First |

**Available approaches:**
1. **Iterative + Timeboxing** — Ship working increments every 1-3 days. Each cycle has a tangible deliverable.
2. **Shape Up** — 6-week build cycles, 2-week cooldown. Appetites, not estimates.
3. **TDD-First** — Tests before implementation. Coverage is the primary quality signal.
4. **Trunk-Based** — Single main branch, short-lived branches, feature flags.
5. **YAGNI/KISS** — Build the minimum. Refactor only on second similar case.

The developer selects exactly one approach. Save the selection as `{{approach}}` in the confirmed configuration. The selected approach will generate a "Development Approach" section in the project's CLAUDE.md.

If the developer wants to skip approach selection, proceed without it — the approach section will not be generated.

---

## Step 3 — Agents

Based on the detected stack, propose specialized agents. Rules:

- **claude-opus-4-6** for safety-critical domains: backend logic, database, AI/ML pipelines, infrastructure
- **claude-sonnet-4-6** for high-iteration domains: frontend/UI, testing, CI/CD, documentation
- Each agent must have a clearly defined domain and explicit forbidden zones
- Always include a `testing` agent
- A `dispatch` agent is always generated automatically for the orchestration pipeline — do not include it in the proposals
- Minimum 2 agents, maximum 8

Present proposals and wait for the user to add, remove, or rename before proceeding.

---

## Step 4 — Skills

Always include the standard set. Add stack-specific skills when relevant tooling is detected.

**Standard (always):**
- `/check` — full quality pipeline (lint + typecheck + tests)
- `/changelog` — session changelog from git diff
- `/phase` — phase-level feature executor (backward-compat wrapper)
- `/deploy-check` — pre-deployment audit
- `/plan` — plan a feature: decompose into tasks with domain assignments
- `/dispatch` — assign agents and skills to a plan's tasks
- `/execute` — execute an approved dispatch plan task by task

**Stack-specific examples:**
- `/migrate` — if Prisma, Drizzle, Alembic, or similar detected
- `/e2e` — if Playwright, Cypress, or Puppeteer detected
- `/container` — if Docker/docker-compose detected
- `/infra` — if Terraform, Pulumi, or CDK detected

Present the full list with checkboxes and wait for confirmation.

---

## Step 5 — Plugins

**Context7 is always enabled. Non-negotiable.**

Delegate to the `system-architect` agent: pass it the detected tech stack from Steps 1–4 and ask it to use Context7 (`resolve-library-id` → `query-docs`) to verify current best practices and return plugin recommendations. Do not perform Context7 lookups directly from the skill — this is analysis work that belongs to the agent.

Once the agent returns its recommendations, present them to the user. Always include:
- `context7` — mandatory for all projects

Default recommendations based on detected stack:
- `typescript-lsp` — if TypeScript detected
- `rust-analyzer-lsp` — if Cargo.toml detected
- `github` — if GitHub remote detected
- `playwright` — if Playwright in dependencies
- `code-simplifier` — always recommended

Present with checkboxes and wait for confirmation.

---

## Step 6 — Hooks

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

## Step 7 — Permissions

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

## Step 8 — Final Confirmation

Present the complete system summary in a single block covering: selected approach, all agents (including dispatch), all skills (including plan/dispatch/execute), plugins, hooks, and permissions.

Include a brief description of the development workflow:
> After generation, use `/plan` to start a feature, `/dispatch` to assign agents, and `/execute` to run the plan. All artifacts are saved in `docs/plans/`.

Ask:

```
Generate this system into the current repo? [yes / change]
```

- If **yes**: delegate to the `system-architect` agent with the full confirmed configuration (including `approach` if selected)
- If **change**: return to the relevant step

Do not write any files until this confirmation is received.
