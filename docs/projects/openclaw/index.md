---
title: OpenClaw Docker
description: OpenClaw AI agent Tech doc
---

# OpenClaw Docker

OpenClaw is a self-hosted AI agent gateway that orchestrates multi-model workflows, Telegram integration, and tool execution — deployed via Docker for portability and isolation.

## Quick Overview

| Question | Answer |
|----------|--------|
| **What is it?** | AI agent gateway / orchestration layer |
| **Runtime** | Node.js inside Docker container |
| **Image** | `ghcr.io/phioranex/openclaw-docker:latest` |
| **Port** | `18789` (gateway + control UI) |
| **Config** | `./config/openclaw.json` (bind-mounted) |
| **Auth** | Token-based (`gateway.auth.token`) |
| **Channels** | Telegram bot (DM + group support) |
| **Models** | Qwen, MiniMax, GLM, Kimi via ModelStudio |

## Live Links

- **Control UI**: [http://localhost:18789](http://localhost:18789) *(local only)*
- **Telegram Bot**: `@YourBotName` *(configured via `botToken`)*
- **Repository**: [github.com/phioranex/openclaw-docker](https://github.com/phioranex/openclaw-docker) *(upstream)*
- **Your Deploy**: `/opt/apps/openclaw-docker/` *(post-migration)*

## Documentation

- [Configuration Guide](./configuration) - `openclaw.json` reference
- [Model Setup](./models) - Adding/switching AI providers
- [Telegram Integration](./telegram) - Bot permissions & group policies
- [Security Hardening](./security) - Auth, proxies, and token management
- [Mounting Projects](./mounting-projects) - Granting agent access to `/opt/apps`

---

## For Visitors Asking "What Tech Stack?"

**Short Answer:**
> "It's a **Node.js AI gateway** running in Docker, orchestrating multiple LLMs (Qwen, GLM, Kimi) via ModelStudio, with Telegram bot integration and a local control UI on port 18789."

**Detailed Answer:**
> "OpenClaw runs as a containerized Node.js service (`ghcr.io/phioranex/openclaw-docker:latest`). Configuration is externalized via bind-mounted `openclaw.json`. It supports multi-model routing, tool plugins (Notion, GoPlaces, SAG), Telegram channel handling, and a token-authenticated control UI. All state persists to `./data`, and workspace files live in `/home/node/.openclaw/workspace` inside the container."

---

## Key Technologies

```
┌─────────────────────────────────────────────────────────────┐
│                   OPENCLAW DEPLOYMENT STACK                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Runtime Layer                                               │
│  └─ Node.js + Docker (ghcr.io/phioranex/openclaw-docker)    │
│                                                              │
│  Orchestration Layer                                         │
│  └─ Gateway CLI: `gateway --port 18789 --allow-unconfigured`│
│                                                              │
│  AI Provider Layer                                           │
│  └─ ModelStudio API (Qwen3.5, GLM-5, Kimi-k2.5, MiniMax-M2.5)│
│                                                              │
│  Integration Layer                                           │
│  └─ Telegram Bot API + Plugin System (Notion, GoPlaces, SAG)│
│                                                              │
│  Persistence Layer                                           │
│  └─ Bind mounts: ./config → /home/node/.openclaw            │
│                   ./data   → /home/node/.openclaw/data      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Why This Setup?

| Benefit | Explanation |
|---------|-------------|
| **Isolated** | Docker container = no host dependency conflicts |
| **Portable** | Move `/opt/apps/openclaw-docker` anywhere, update paths, restart |
| **Config-Driven** | All behavior defined in `openclaw.json` — version controlled |
| **Multi-Model** | Switch/fallback between 8+ models without code changes |
| **Secure by Default** | Token auth, `allowInsecureAuth: false` ready, proxy restrictions |
| **Extensible** | Plugin system + native tool execution + `/opt/apps` mount for missions |

---

## Related Projects

- [Maktabati](/projects/maktabati/) - Documentation platform (VitePress)
- [Moussawer](/projects/moussawer/) - Main app (Laravel 13 + Vue 3 + Sail)
- [SahabNote](/opt/apps/SahabNote) - React Native Android app *(agent-accessible)*

> 💡 **Pro Tip**: After mounting `/opt/apps:/opt/apps:ro` in `docker-compose.yml`, your OpenClaw agent can execute file operations on projects like `SahabNote` using natural language prompts:  
> *"Add a copy button to the header of /opt/apps/SahabNote/src/components/Header.vue"*