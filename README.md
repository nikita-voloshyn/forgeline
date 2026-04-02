<div align="center">

# ⚒️ Forgeline

**Scaffold a multi-agent AI development system for any project — in minutes.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.1-blue)](CHANGELOG.md)

[🇺🇦 Прочитати українською](README.ua.md)

</div>

---

## What is Forgeline?
**Forgeline** is a plugin for **Claude Code**. Look at it as a "team builder" for AI developers. 
Instead of writing complex configuration files manually, you run one command, answer simple questions, and Forgeline automatically generates an entire AI team that knows your project's code and is ready to work. It creates agents, sets up rules, and builds your tools in 5 minutes instead of 4 hours.

## Prerequisites (What you need before starting)
1. **Claude Code installed and running.** (You can install it via standard terminal using `npm install -g @anthropic-ai/claude-code`).
2. **Paid Claude Subscription.** (Claude Code needs an active Anthropic account to function).
3. **A Project Folder.** Make sure you open Claude Code inside the folder where your code lives (or will live in the future).

## Step 1: Installation
Open Claude Code (type `claude` in your terminal) and run these two commands one by one to download and activate the plugin:
```bash
/plugin marketplace add nikita-voloshyn/forgeline
/plugin install nikita-voloshyn/forgeline
```

## Step 2: Project Setup
Run this command inside Claude Code:
```bash
/setup-agents
```
Forgeline will guide you through 8 interactive steps. It's safe—nothing is created until the final confirmation.
1. **Project Understanding:** It scans your project and asks if it guessed the languages and frameworks correctly.
2. **Development Approach:** You choose how you want the AI to work (e.g., Iterative, Test-Driven).
3. **Agents:** It asks if the proposed AI team (like frontend, backend, database agents) looks good.
4-7. **Skills, Plugins, Hooks, Permissions:** It suggests the best tools for your project. You can just agree to the defaults.
8. **Final Confirmation:** It shows you the final setup. If you say "Yes", it generates around 50+ files to create your AI team.

## Step 3: Daily Workflow
Now that your team is ready, building features is a very simple 3-step process. You just tell the AI what to build using these commands:

1. **Plan the work:**
```bash
/plan "Create a user login page"
```
*What it does:* The AI breaks down your big feature into smaller, logical steps.

2. **Assign the work:**
```bash
/assign
```
*What it does:* The AI picks the best agents for your tasks (for instance, the frontend agent handles the user interface, while the backend agent handles the database API).

3. **Execute the work:**
```bash
/execute
```
*What it does:* The AI agents actually start writing code, fixing errors, and running tests. Just wait until the job is fully done!

---

<div align="center">
<i>Forgeline — AI development made simple. No more boring setups.</i>
</div>
