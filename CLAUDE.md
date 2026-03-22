# CLAUDE.md — DevForge

## Project Overview

DevForge is a Claude Code plugin that scaffolds multi-agent development systems for any project. It reads a project's vision and tech stack, runs a structured configuration dialogue, and generates a complete `.claude/` workspace.

## Architecture Rules

1. **Plugin boundaries:** Skills handle dialogue only. The `system-architect` agent handles all file reading, analysis, and generation.
2. **Templates:** All generated file content must come from `templates/`. Never hardcode content inside skills or the agent.
3. **Context7 is mandatory:** Always use Context7 to verify current best practices for any detected tech stack before generating agent definitions or plugin recommendations.
4. **English only:** All generated files, comments, and documentation must be in English.
5. **No assumptions:** If the project files are ambiguous, the skill must ask — never guess.

## Project Structure

```
.claude/
  skills/setup-agents/SKILL.md   — main skill, runs the dialogue
  agents/system-architect.md     — Opus agent, reads + generates
templates/                       — Handlebars templates for generated files
docs/                            — DevForge own documentation and specs
plugin.json                      — plugin manifest
```

## Commands

- No build step required — this is a pure Claude Code plugin
