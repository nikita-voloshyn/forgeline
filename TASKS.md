# Forgeline — Tasks

## Active

### v0.4
- [x] `/setup-approach` skill — standalone approach reconfiguration without re-running /setup-agents
- [ ] Multi-approach composition — selecting 2-3 approaches with conflict resolution
- [ ] Custom approach (free text) — describe methodology, system architect extracts config

---

## Maybe Someday

### SkillHub Integration (Optional Source)
- [ ] Offer choice in `/setup-agents`: **custom generation** or **adapt from existing skills**
- [ ] Use SkillHub.club as catalog only (names, ratings, descriptions of top S/A-rank skills)
- [ ] Pull actual skill code from GitHub (not via paid API)
- [ ] Adapt found skills to the specific project (not copy as-is)
- [ ] Add as optional step in dialogue (between the Skills step and the Plugins step)

## Done

- [x] Documentation agent + `/docs` skill + Context7 compliance fix (v0.4, PR #6)
- [x] Task orchestration pipeline: `/plan` → `/dispatch` → `/execute` (v0.3.0-beta)
- [x] Development Approach selection (Step 2 in dialogue)
- [x] Design spec v2 (`docs/specs/2026-03-23-orchestration-design.md`)
- [x] Documentation & architecture update (README, CHANGELOG, version badge)
- [x] Initial plugin scaffold: skill, agent, hooks, templates
- [x] 8-step configuration dialogue (`/setup-agents`)
- [x] System Architect agent (Opus 4.6)
- [x] Context7 integration
- [x] Marketplace manifest (`marketplace.json`)
- [x] Fix plugin packaging (auto-discovery, no explicit skills field)
