# Forgeline — Tasks

## Active

### Task Orchestration System (Post-Setup Workflow)
Transparent workflow that automates repetitive instructions (split into subtasks, use agent X, run skill Y) while keeping full developer control. Nothing executes without manual approval.

**Flow:** `/plan` → `/dispatch` → developer review → `/execute` → report

**Spec:** `docs/specs/2026-03-23-orchestration-design.md` (Approved v2)

**New components:**
- [x] Dispatch agent template (`templates/agents/dispatch.md.hbs`) — assigns agents/skills to plan tasks
- [x] `/plan` skill template (`templates/skills/plan.md.hbs`) — planning session with embedded output format
- [x] `/dispatch` skill template (`templates/skills/dispatch.md.hbs`) — agent assignment with embedded output format
- [x] `/execute` skill template (`templates/skills/execute.md.hbs`) — guided execution with resume mechanism and embedded report format
- [x] Approach content templates (`templates/approaches/*.md.hbs` x5) — CLAUDE.md section content per methodology

**Modified components:**
- [x] Refactor `templates/skills/phase.md.hbs` — backward-compat wrapper redirecting to /plan
- [x] Update `skills/setup-agents/SKILL.md` — add Step 2 (approach, single-select) + new skills to standard set (7 total)
- [x] Update `agents/system-architect.md` — generate dispatch agent, new skills, approach section in CLAUDE.md
- [x] Update `templates/CLAUDE.md.hbs` — add approach section + workflow docs
- [x] Update `templates/agentic-system.md.hbs` — add dispatch agent, workflow diagram, new skills
- [x] Update `templates/development-plan.md.hbs` — approach-adapted phase structure
- [x] Update `templates/commands.md.hbs` — add /plan, /dispatch, /execute

**Generated output in target project:**
```
agents/dispatch.md                  ← task assignment agent
skills/{plan,dispatch,execute}/     ← 3 new skills
CLAUDE.md                           ← +approach section, +workflow section
docs/plans/                         ← feature planning directory
  ├── <feature>-plan.md             ← human-readable plan
  ├── <feature>-dispatch.md         ← agent assignments (with per-task Status)
  └── <feature>-report.md           ← execution report
```

---

### Development Approach Layer (New Step in Dialogue)
Currently phases and workflow are hardcoded. New Step 2 in dialogue where the user selects a development approach. Approach generates a section in CLAUDE.md that Claude naturally follows.

**Available approaches (single-select for v0.3):**
- **Iterative + Timeboxing** — short 1-3 day cycles, working result at the end of each
- **Shape Up** — 6-week cycles + 2 weeks cooldown, appetite instead of estimates
- **TDD-First** — tests written before implementation, coverage as quality signal
- **Trunk-Based** — single main branch, daily commits, feature flags for WIP
- **YAGNI/KISS** — minimal solution, refactor only when a second similar case appears

**Tasks:**
- [x] Add Step 2 to `/setup-agents` dialogue (before Agents step, single-select)
- [x] Suggest one approach based on context (solo/team, project type)
- [x] Create 5 approach content templates (`templates/approaches/`)
- [x] Adapt `CLAUDE.md.hbs` to include approach section via `{{approachContent}}`
- [x] Adapt `development-plan.md.hbs` phase structure per approach

---

### Documentation & Architecture Update
- [x] Update README.md architecture diagram to reflect new dialogue steps and orchestration flow
- [x] Update CHANGELOG.md with new features
- [x] Update README.md version badge to v0.3.0-beta
- [x] Update CLAUDE.md project structure if needed

---

### SkillHub Integration (Optional Source)
- [ ] Offer choice in `/setup-agents`: **custom generation** or **adapt from existing skills**
- [ ] Use SkillHub.club as catalog only (names, ratings, descriptions of top S/A-rank skills)
- [ ] Pull actual skill code from GitHub (not via paid API)
- [ ] Adapt found skills to the specific project (not copy as-is)
- [ ] Add as optional step in dialogue (between the Skills step and the Plugins step)

## Backlog

### Deferred to v0.4
- [ ] Documentation agent (`agents/docs.md`) — dedicated agent for system docs and diagrams
- [ ] `/setup-approach` skill — standalone approach reconfiguration without re-running /setup-agents
- [ ] Multi-approach composition — selecting 2-3 approaches with conflict resolution
- [ ] Custom approach (free text) — describe methodology, system architect extracts config

## Done

- [x] Task orchestration pipeline: `/plan` → `/dispatch` → `/execute` (v0.3.0-beta)
- [x] Development Approach selection (Step 2 in dialogue)
- [x] Design spec v2 (`docs/specs/2026-03-23-orchestration-design.md`)
- [x] Initial plugin scaffold: skill, agent, hooks, templates
- [x] 8-step configuration dialogue (`/setup-agents`)
- [x] System Architect agent (Opus 4.6)
- [x] Context7 integration
- [x] Marketplace manifest (`marketplace.json`)
- [x] Fix plugin packaging (auto-discovery, no explicit skills field)
