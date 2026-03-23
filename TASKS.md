# Forgeline — Tasks

## Active

### Task Orchestration System (Post-Setup Workflow)
Transparent workflow that automates repetitive instructions (split into subtasks, use agent X, run skill Y) while keeping full developer control. Nothing executes without manual approval.

**Flow:** `/plan` → `/dispatch` → developer review → `/execute` → report

**New components:**
- [ ] Dispatch agent template (`templates/agents/dispatch.md.hbs`) — "Tech lead" that translates human plan into machine-readable dispatch with agent/skill assignments per task
- [ ] Documentation agent template (`templates/agents/docs.md.hbs`) — formats all plans and reports as clean markdown
- [ ] `/plan` skill template (`templates/skills/plan.md.hbs`) — planning session: user + domain agent produce human-readable plan
- [ ] `/dispatch` skill template (`templates/skills/dispatch.md.hbs`) — calls dispatch agent, produces dispatch plan, waits for developer approval
- [ ] `/execute` skill template (`templates/skills/execute.md.hbs`) — runs approved dispatch plan task by task, produces execution report
- [ ] Plan markdown templates (`templates/plans/`) — Handlebars templates for plan, dispatch, and report files
- [ ] Approach config templates (`templates/approaches/`) — per methodology (Shape Up, Iterative, TDD, etc.)

**Modified components:**
- [ ] Refactor `templates/skills/phase.md.hbs` to use /plan → /dispatch → /execute flow
- [ ] Update `skills/setup-agents/SKILL.md` — add dev approach selection step + new skills to standard set
- [ ] Update `agents/system-architect.md` — generate dispatch agent, docs agent, new skills
- [ ] Update `templates/CLAUDE.md.hbs` — add workflow docs for plan → dispatch → execute lifecycle
- [ ] Update `templates/agentic-system.md.hbs` — add orchestration diagram

**Generated output in target project:**
```
docs/plans/
├── <feature>-plan.md          ← human-readable plan
├── <feature>-dispatch.md      ← agent/skill assignments per task
└── <feature>-report.md        ← execution report with analysis
```

**Full plan:** `.claude/plans/concurrent-wondering-phoenix.md`

---

### Development Approach Layer (New Step in Dialogue)
Currently phases and workflow are hardcoded. Need a new step in the dialogue where the user selects a development approach, and generation adapts accordingly.

**Available approaches:**
- **Iterative + Timeboxing** — short 1-3 day cycles, working result at the end of each
- **Shape Up** — 6-week cycles + 2 weeks cooldown, appetite instead of estimates, pitches instead of backlog
- **TDD-first** — tests as a replacement for code review, critical business logic always covered
- **Trunk-Based** — single main branch, daily commits, branches only for features > 1 day, feature flags
- **YAGNI/KISS** — minimal solution, refactor only when a second similar case appears

**Tasks:**
- [ ] Add new step to `/setup-agents` dialogue (before the Agents step)
- [ ] Suggest approaches based on context (solo/team, project type)
- [ ] Allow combining approaches (e.g. Shape Up + TDD)
- [ ] Adapt generation output: phases, skills, hooks, commit templates — all depend on selected approach
- [ ] Remove hardcoded phases from current templates
- [ ] Save research as `docs/specs/development-approaches.md`

---

### SkillHub Integration (Optional Source)
- [ ] Offer choice in `/setup-agents`: **custom generation** or **adapt from existing skills**
- [ ] Use SkillHub.club as catalog only (names, ratings, descriptions of top S/A-rank skills)
- [ ] Pull actual skill code from GitHub (not via paid API)
- [ ] Adapt found skills to the specific project (not copy as-is)
- [ ] Add as optional step in dialogue (between the Skills step and the Plugins step)

---

### Documentation & Architecture Update
- [ ] Update README.md architecture diagram to reflect new dialogue steps and orchestration flow
- [ ] Update design spec (`docs/specs/2026-03-22-forgeline-design.md`) with orchestration system and dev approach step
- [ ] Update CLAUDE.md if architecture rules change
- [ ] Update CHANGELOG.md with new features

## Backlog

_(empty)_

## Done

- [x] Initial plugin scaffold: skill, agent, hooks, templates
- [x] 7-step configuration dialogue (`/setup-agents`)
- [x] System Architect agent (Opus 4.6)
- [x] Context7 integration
- [x] Marketplace manifest (`marketplace.json`)
- [x] Fix plugin packaging (auto-discovery, no explicit skills field)
