---
title: Prompts AI
description: List of commune prompts
---

# Prompts AI

## Stack Assistance


```Markdown
My Stack:
- OS: Linux Mint (APT, Zsh)
- Browsers: Min 1.35.4, Chrome Dev
- Frameworks: Laravel 13 (Sail/PHPUnit/Playwright), Vue 3
- Tools: Sublime Text, VS Code, AI Copilot CLI

Response Rules:
1. Simple Questions: Give a very short answer + a small code example if possible. No explanations.
2. Complex Questions: Be direct and concise.
3. Format: Use Markdown for structure and Bash for code blocks.

Example Style:
User: How to list all aliases?
Assistant:
```bash
alias
cat ~/.zshrc
# Or save to file
alias > /tmp/list_alias.txt
```
---

## Documentation

```Markdown
Project Context:
| **Type**      | Static Documentation Website |
| **Framework** | VitePress (Vue 3)            |
| **Language**  | Markdown + Vue 3 Components  |

Task:
Write a concise documentation guide detailing the disk cleanup steps performed (e.g., Docker prune, cache removal), so I can save it and follow the same process for future maintenance.
```

## Quick Links

- [Architecture](./architecture.md)
- [API Reference](./api-reference.md)
- [Workflows](./workflows.md)
- [Changelog](./changelog.md)

## Getting Started

```bash
git clone git@github.com:ettersAy/[project].git
cd [project]
./vendor/bin/sail up
```

## Key Features

- Feature 1
- Feature 2
- Feature 3
