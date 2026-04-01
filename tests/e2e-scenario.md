# E2E Test Scenario — Forgeline v0.4.0-beta

End-to-end test using the `tests/fixture/` project (TaskForge — Next.js + TypeScript + Prisma).

---

## Prerequisites

1. Forgeline plugin installed:
   ```bash
   /plugin marketplace add nikita-voloshyn/forgeline
   ```
2. Clear plugin cache (if re-testing after changes):
   ```bash
   rm -rf ~/.claude/plugins/cache/forgeline
   rm -rf ~/.claude/plugins/cache/nikita-voloshyn-forgeline
   rm -rf ~/.claude/plugins/installed/forgeline
   rm -rf ~/.claude/plugins/installed/nikita-voloshyn-forgeline
   rm -rf ~/.claude/plugins/marketplace/nikita-voloshyn-forgeline
   ```
3. Open a new terminal tab after reinstalling.

---

## Setup

```bash
cd tests/fixture
git init
git add -A
git commit -m "initial: test fixture"
```

Ensure the fixture directory is a standalone git repo so Forgeline treats it as a project root.

---

## Test 1 — Full `/setup-agents` Dialogue (Happy Path)

### Step 1: Project Understanding

**Action:** Run `/setup-agents`

**Expected:** Forgeline reads `vision.md` + `tech-stack.md` (primary sources) and presents a summary:

| Field | Expected value |
|-------|----------------|
| Project name | TaskForge |
| Type | Web application |
| Languages | TypeScript |
| Frameworks | Next.js 15, React 19 |
| Database | PostgreSQL 16 (Prisma 6) |
| Auth | NextAuth.js v5 |
| Styling | Tailwind CSS 4, Radix UI |
| Testing | Vitest, Playwright |
| Package manager | pnpm |
| Team size | 1 (solo) |

**Action:** Confirm the summary.

### Step 2: Development Approach

**Expected:** Forgeline suggests an approach. Given solo developer + small project, recommendation should be **Iterative + Timeboxing**.

All 6 options shown (5 standard + Custom).

**Action:** Select `1, 3` (Iterative + TDD-First) to test multi-approach.

**Expected:**
- No conflict warning (Iterative + TDD is a valid combination)
- Confirmation: "Primary: Iterative + Timeboxing, Secondary: TDD-First"

**Action:** Confirm.

### Step 3: Agents

**Expected:** Proposed agents based on the stack. Minimum should include:

| Agent | Model | Rationale |
|-------|-------|-----------|
| backend | opus | API routes, Prisma, auth — safety-critical |
| frontend | sonnet | React components, Tailwind — high-iteration |
| testing | sonnet | Vitest + Playwright — high-iteration |

Additional agents possible (e.g., `database`, `infra`). Dispatch and docs agents should NOT be in the proposal (they are auto-generated).

Each agent should have a `color` field.

**Action:** Accept proposed agents (or adjust and confirm).

### Step 4: Skills

**Expected:** Standard set (9 skills):

- [x] `/check` — lint + typecheck + tests
- [x] `/changelog` — session changelog
- [x] `/phase` — phase executor (backward-compat)
- [x] `/deploy-check` — pre-deployment audit
- [x] `/plan` — feature planning
- [x] `/assign` — task assignment
- [x] `/execute` — guided execution
- [x] `/docs` — documentation coverage
- [x] `/setup-approach` — approach reconfiguration

Stack-specific additions expected:
- [x] `/migrate` — Prisma detected
- [x] `/e2e` — Playwright detected
- [ ] `/container` — Docker detected (optional, only local dev)

**Action:** Confirm.

### Step 5: Plugins

**Expected:** Forgeline delegates to system-architect for Context7 lookups, then presents:

- [x] `context7` — mandatory
- [x] `code-simplifier` — always recommended

Additional based on stack:
- [ ] `playwright` — Playwright in dependencies
- [ ] `github` — GitHub remote detected (if .git has github remote)

**Action:** Confirm.

### Step 6: Hooks

**Expected:** Detected linter = Biome (from `biome.json`).

PostToolUse hook command:
```bash
biome check "$CLAUDE_FILE_PATH" 2>/dev/null || true
```

Stop hook: grep for hardcoded secrets.

**Action:** Confirm.

### Step 7: Permissions

**Expected:**

Allow:
- `Bash(git:*)`
- `Bash(gh pr:*)`
- `Bash(pnpm:*)` — detected package manager

Deny:
- `Read(.env)`, `Read(.env.*)`, `Read(secrets/**)`, `Read(~/.ssh/**)`
- `Write(.env)`, `Write(.env.*)`

**Action:** Confirm.

### Step 8: Final Confirmation

**Expected:** Full summary of everything from Steps 1-7, including:
- Approach: Iterative + Timeboxing (primary) + TDD-First (secondary)
- All agents (domain + dispatch + docs)
- All skills (standard + stack-specific)
- Plugins, hooks, permissions
- Development workflow description

**Action:** Confirm "yes" to generate.

---

## Test 1 — Post-Generation Verification

After the system-architect agent finishes, verify every generated file:

### File existence checklist

```bash
# Settings
[ -f .claude/settings.json ]       || echo "FAIL: settings.json"
[ -f .claude/settings.local.json ] || echo "FAIL: settings.local.json"

# Agents (domain agents vary — check at least these)
[ -f agents/dispatch.md ]          || echo "FAIL: dispatch agent"
[ -f agents/docs.md ]              || echo "FAIL: docs agent"
ls agents/*.md | wc -l  # Should be >= 4 (backend + frontend + testing + dispatch + docs)

# Skills
[ -f skills/check/SKILL.md ]          || echo "FAIL: /check"
[ -f skills/changelog/SKILL.md ]      || echo "FAIL: /changelog"
[ -f skills/phase/SKILL.md ]          || echo "FAIL: /phase"
[ -f skills/deploy-check/SKILL.md ]   || echo "FAIL: /deploy-check"
[ -f skills/plan/SKILL.md ]           || echo "FAIL: /plan"
[ -f skills/assign/SKILL.md ]         || echo "FAIL: /assign"
[ -f skills/execute/SKILL.md ]        || echo "FAIL: /execute"
[ -f skills/docs/SKILL.md ]           || echo "FAIL: /docs"
[ -f skills/setup-approach/SKILL.md ] || echo "FAIL: /setup-approach"

# Docs
[ -f docs/agentic-system.md ]          || echo "FAIL: agentic-system"
[ -f docs/development-plan.md ]        || echo "FAIL: development-plan"
[ -f docs/commands.md ]                || echo "FAIL: commands"
[ -f docs/approaches-reference.md ]    || echo "FAIL: approaches-reference"
[ -d docs/plans ]                      || echo "FAIL: plans dir"
[ -d docs/components ]                 || echo "FAIL: components dir"

# Root
[ -f CLAUDE.md ]                       || echo "FAIL: CLAUDE.md"
```

### Content verification

**CLAUDE.md:**
- [ ] Contains `## Development Approach: Iterative + Timeboxing` heading
- [ ] Primary approach content matches `templates/approaches/iterative.md.hbs`
- [ ] Contains `### Secondary Approaches` with TDD-First content
- [ ] Contains `## Development Workflow` section
- [ ] Contains `## Tech Stack` with Next.js, TypeScript, Prisma, etc.
- [ ] Contains agent table with all agents
- [ ] Contains skill list with all skills

**Agent files:**
- [ ] Each has valid frontmatter: `name`, `description`, `model` (opus/sonnet), `color`
- [ ] `dispatch.md` has `model: sonnet`, `color: yellow`
- [ ] `docs.md` has `model: sonnet`, `color: cyan`
- [ ] Each agent has `## Domain` with Owns/Forbidden sections
- [ ] Each agent has `## Verification` section

**Settings:**
- [ ] `settings.json` has deny permissions (`.env`, `secrets/**`, `~/.ssh/**`)
- [ ] `settings.local.json` has allow: `Bash(pnpm:*)`, `Bash(git:*)`, `Bash(gh pr:*)`
- [ ] `.gitignore` updated to exclude `.claude/settings.local.json`

**Hooks:**
- [ ] `hooks/hooks.json` has PostToolUse with Biome command
- [ ] `hooks/hooks.json` has Stop with secret scan

**approaches-reference.md:**
- [ ] Contains all 5 sections: `## Iterative + Timeboxing`, `## Shape Up`, `## TDD-First`, `## Trunk-Based`, `## YAGNI/KISS`
- [ ] Each section has `### Development Approach:` heading, philosophy, rules, process

---

## Test 2 — `/setup-approach` (Switch Approach)

**Prereq:** Test 1 completed. CLAUDE.md has Iterative (primary) + TDD (secondary).

### 2a: Switch to single approach

**Action:** Run `/setup-approach`

**Expected:**
- Reports current: "Iterative + Timeboxing + TDD-First"
- Shows all options with current marked

**Action:** Select `4` (Trunk-Based only)

**Expected:**
- Confirmation prompt: "Switch to Trunk-Based?"

**Action:** Confirm.

**Verify:**
- [ ] `CLAUDE.md` has `## Development Approach: Trunk-Based`
- [ ] Content matches trunk-based approach from reference
- [ ] No `### Secondary Approaches` subsection
- [ ] Old Iterative + TDD content is fully removed

### 2b: Switch to multi-approach

**Action:** Run `/setup-approach` again

**Action:** Select `2, 5` (Shape Up + YAGNI)

**Verify:**
- [ ] `CLAUDE.md` has `## Development Approach: Shape Up`
- [ ] Has `### Secondary Approaches` with YAGNI content
- [ ] Trunk-Based content fully removed

### 2c: Conflict detection

**Action:** Run `/setup-approach` again

**Action:** Select `1, 2` (Iterative + Shape Up)

**Expected:** Warning about cadence conflict. Message should mention:
- Iterative = 1-3 day cycles
- Shape Up = 6-week cycles
- Ask to drop one or confirm with awareness

**Action:** Drop Shape Up, keep only Iterative.

**Verify:**
- [ ] `CLAUDE.md` has `## Development Approach: Iterative + Timeboxing`
- [ ] No secondary approaches

### 2d: Remove all approaches

**Action:** Run `/setup-approach`

**Action:** Select `None`

**Verify:**
- [ ] `CLAUDE.md` has NO `## Development Approach:` section at all
- [ ] `## Development Workflow` section still intact

---

## Test 3 — Edge Cases

### 3a: Fallback project detection (no vision.md/tech-stack.md)

**Setup:**
```bash
mkdir /tmp/test-fallback && cd /tmp/test-fallback
git init
cp <fixture>/package.json .
cp <fixture>/tsconfig.json .
cp <fixture>/biome.json .
cp <fixture>/README.md .
```

**Action:** Run `/setup-agents`

**Expected:** Forgeline falls back to README.md + package.json and correctly detects:
- Next.js, TypeScript, Prisma, Biome, pnpm

### 3b: Skip approach selection

**Action:** During Step 2, say "skip" or "no approach"

**Expected:**
- No approach section in generated CLAUDE.md
- `docs/approaches-reference.md` still generated (always generated)
- `/setup-approach` still available for later use

### 3c: Custom approach

**Action:** During Step 2, select "Custom"

**Provide text:**
> We use Kanban with WIP limits of 3. No sprints, no deadlines. Pull-based flow.
> Code review required for all PRs. Deploy on green CI. Rollback within 5 minutes.

**Expected:**
- System architect extracts: philosophy, rules (4-6), process structure
- Presents extracted content for approval
- After confirmation: CLAUDE.md has `## Development Approach: Custom`
- `docs/approaches-reference.md` has `## Custom` section

### 3d: `/setup-approach` without prior setup

**Setup:** Fresh project, no CLAUDE.md or approaches-reference.md

**Action:** Run `/setup-approach`

**Expected:** Stops with message suggesting to run `/setup-agents` first.

---

## Test 4 — Context7 Integration

During the system-architect generation, observe that:

- [ ] Context7 `resolve-library-id` called for detected frameworks (Next.js, Prisma, Vitest, Playwright, Biome, Tailwind, etc.)
- [ ] `query-docs` called with resolved IDs for specific questions
- [ ] Agent definitions, skill content, and hook commands are informed by Context7 results
- [ ] Verification report lists Context7 lookups performed

---

## Test 5 — Idempotency

**Action:** Run `/setup-agents` again in the same project (where files already exist).

**Expected:** Either:
- Warns that files already exist and asks whether to overwrite
- Or overwrites cleanly without leaving orphaned content

**Verify:**
- [ ] No duplicate sections in CLAUDE.md
- [ ] No corrupted agent/skill files
- [ ] Settings files are consistent

---

## Cleanup

```bash
cd tests/fixture
rm -rf .claude/ agents/ skills/ hooks/ docs/ CLAUDE.md
git checkout -- .gitignore
```

---

## Results Template

| Test | Status | Notes |
|------|--------|-------|
| 1. Full dialogue (happy path) | | |
| 1v. Post-generation verification | | |
| 2a. Switch to single approach | | |
| 2b. Switch to multi-approach | | |
| 2c. Conflict detection | | |
| 2d. Remove all approaches | | |
| 3a. Fallback detection | | |
| 3b. Skip approach | | |
| 3c. Custom approach | | |
| 3d. /setup-approach without setup | | |
| 4. Context7 integration | | |
| 5. Idempotency | | |
