---
title: Maktabati Platform
description: Technical documentation for the Maktabati documentation platform itself
---

# Maktabati Platform

Maktabati (مكتبتي - "My Library") is a static documentation website built with modern web technologies.

## Quick Overview

| Question | Answer |
|----------|--------|
| **What is it?** | A static documentation website |
| **Framework** | VitePress (Vue 3 based) |
| **Language** | Markdown + Vue 3 Components |
| **Hosting** | GitHub Pages (free) |
| **Build Tool** | Vite |
| **Package Manager** | npm (Node.js) |

## Live Links

- **Website**: [ettersAy.github.io/maktabati](https://ettersAy.github.io/maktabati/)
- **Repository**: [github.com/ettersAy/maktabati](https://github.com/ettersAy/maktabati)

## Documentation

- [Technology Stack](./technology-stack) - Complete tech breakdown
- [How It Works](./how-it-works) - Build and deployment process
- [File Structure](./file-structure) - Project organization
- [Customization](./customization) - How to modify and extend

---

## For Visitors Asking "What Tech Stack?"

**Short Answer:**
> "It's built with **VitePress**, which is a Vue 3-based static site generator. The content is written in Markdown, and it's hosted on GitHub Pages with automatic deployment via GitHub Actions."

**Detailed Answer:**
> "The frontend uses **VitePress** (built on Vue 3.5 and Vite 8). Content is written in **Markdown** files that get compiled to static HTML. The site is hosted on **GitHub Pages** with CI/CD through **GitHub Actions**. For package management, I use **npm** with **Node.js v24**."

---

## Key Technologies

```
┌─────────────────────────────────────────────────────────────┐
│                    MAKTABATI TECH STACK                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Content Layer                                               │
│  └─ Markdown (.md files) - Easy to write, version controlled │
│                                                              │
│  Framework Layer                                             │
│  └─ VitePress → Vue 3.5 → Vite 8                            │
│                                                              │
│  Build Layer                                                 │
│  └─ Node.js v24 + npm                                       │
│                                                              │
│  Hosting Layer                                               │
│  └─ GitHub Pages + GitHub Actions (CI/CD)                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Why This Stack?

| Benefit | Explanation |
|---------|-------------|
| **Fast** | Static HTML = no server processing, instant load |
| **Free** | GitHub Pages hosting costs $0 |
| **Secure** | No database, no server vulnerabilities |
| **Version Controlled** | All content in Git, full history |
| **Easy Updates** | Edit markdown, push to Git, auto-deploy |
| **Vue Native** | Matches my main development stack |

---

## Related Projects

- [Moussawer](/projects/moussawer/) - Main application (Laravel + Vue)
- [Workflows](/workflows/) - Development processes
