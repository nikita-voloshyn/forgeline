# Forgeline — Tasks

## Active

### Development Approach Layer (New Step in Dialogue)
Currently phases and workflow are hardcoded. Need a new step in the dialogue where the user selects a development approach, and generation adapts accordingly.

**Available approaches:**
- **Iterative + Timeboxing** — short 1-3 day cycles, working result at the end of each
- **Shape Up** — 6-week cycles + 2 weeks cooldown, appetite instead of estimates, pitches instead of backlog
- **TDD-first** — tests as a replacement for code review, critical business logic always covered
- **Trunk-Based** — single main branch, daily commits, branches only for features > 1 day, feature flags
- **YAGNI/KISS** — minimal solution, refactor only when a second similar case appears

**Tasks:**
- [ ] Add new step to `/setup-agents` dialogue (before current Step 2 — Agents)
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
- [ ] Add as optional step in dialogue (between Step 3 and Step 4)

---

### Documentation & Architecture Update
- [ ] Update README.md architecture diagram to reflect new dialogue steps
- [ ] Update design spec (`docs/specs/2026-03-22-forgeline-design.md`) with Development Approach step
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
