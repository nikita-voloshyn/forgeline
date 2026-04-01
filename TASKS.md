# Forgeline — Tasks

## Active

_No active tasks._

---

## Maybe Someday

### SkillHub Integration (Optional Source)
- [ ] Offer choice in `/setup-agents`: **custom generation** or **adapt from existing skills**
- [ ] Use SkillHub.club as catalog only (names, ratings, descriptions of top S/A-rank skills)
- [ ] Pull actual skill code from GitHub (not via paid API)
- [ ] Adapt found skills to the specific project (not copy as-is)
- [ ] Add as optional step in dialogue (between the Skills step and the Plugins step)

## Done

- [x] `/dispatch` → `/assign` rename — avoids built-in Claude Code command conflict (v1.0.1, PR #9/#10)
- [x] Package Scripts Priority rule — agent prefers `package.json` scripts over raw CLI (v1.0.1, PR #10)
- [x] Post-generation Context7 audit (Phase 2) — verifies commands and patterns after generation (v1.0.1, PR #10)
- [x] Dynamic Context7 audit (Part B) — derives library list and queries from detected stack, no hardcoded table (v1.0.1, PR #10)
- [x] README rewrite for first-time Claude Code users (v1.0.1, PR #9)
- [x] "production-ready" removed from all descriptions (v1.0.1, PR #9)
- [x] Version bump 0.4.0-beta → 1.0.0 in plugin manifests (v1.0.1, PR #9)
- [x] `/setup-approach` skill — standalone approach reconfiguration (v0.4, PR #7)
- [x] Multi-approach composition — selecting 2-3 approaches with conflict resolution (v0.4, PR #7)
- [x] Custom approach (free text) — describe methodology, system architect extracts config (v0.4, PR #7)
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
