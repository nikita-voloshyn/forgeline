# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 0.1.x   | Yes       |

## Reporting a Vulnerability

If you discover a security vulnerability in Forgeline, please report it responsibly.

**Do not open a public issue.** Instead, use [GitHub's private vulnerability reporting](https://github.com/nikita-voloshyn/forgeline/security/advisories/new).

## Scope

Forgeline is a Claude Code plugin that generates configuration files. It does not handle authentication, network requests, or user data. However, the generated permission and hook configurations can affect the security posture of target projects, so we take reports seriously.

Key areas of concern:
- Generated deny permissions (must never weaken secrets protection)
- Generated hooks (must not execute unsafe commands)
- Template injection (Handlebars expressions must not allow arbitrary code execution)

## Response Timeline

- **Acknowledgment:** within 48 hours
- **Assessment:** within 5 business days
- **Fix or mitigation:** within 7 days for confirmed issues
- **Public disclosure:** coordinated with the reporter after the fix is released
