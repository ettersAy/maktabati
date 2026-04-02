---
title: Technology Stack
description: Complete breakdown of all technologies used in Moussawer
---

# Technology Stack

Complete technical breakdown of the Moussawer platform.

---

## Core Technologies

### 1. Laravel 13 (Backend Framework)

**What it is:** PHP web application framework with expressive syntax.

**Version:** 13.x (Latest)

**Why chosen:**
- API-first architecture (JSON responses only)
- Built-in authentication (Sanctum)
- Eloquent ORM for database operations
- Form Requests for validation
- Policies for authorization
- Service container for dependency injection

**Key Features Used:**
- API Resources (data transformation)
- Form Requests (validation)
- Policies (authorization)
- Service classes (business logic)
- Enums (type-safe roles)

**Official Site:** [laravel.com](https://laravel.com)

```bash
# Start Laravel Sail
./vendor/bin/sail up
```

---

### 2. Vue 3.5 (Frontend Framework)

**What it is:** Progressive JavaScript framework for building user interfaces.

**Version:** 3.5.x (Composition API)

**Why chosen:**
- Composition API (`<script setup>`)
- Reactive data binding
- Component-based architecture
- Matches my development expertise
- Large ecosystem

**Key Features Used:**
- Composition API
- Pinia for state management
- Vue Router for navigation
- Custom components by role

**Official Site:** [vuejs.org](https://vuejs.org)

---

### 3. Vite 8 (Build Tool)

**What it is:** Next-generation frontend build tool.

**Version:** 8.x

**Why chosen:**
- Extremely fast HMR (Hot Module Replacement)
- Optimized production builds
- Native ES modules support
- Works seamlessly with Vue 3

**Official Site:** [vite.dev](https://vite.dev)

```bash
# Start frontend dev server
npm run dev
```

---

### 4. MySQL 8.4 (Database)

**What it is:** Relational database management system.

**Version:** 8.4

**Why chosen:**
- Reliable and well-documented
- Works perfectly with Laravel Eloquent
- ACID compliance
- Good performance for medium-scale apps

**Access via Adminer:** `http://localhost:8080`

---

### 5. Docker & Laravel Sail (DevOps)

**What it is:** Containerization platform and Laravel Docker wrapper.

**Why chosen:**
- Consistent development environment
- No local PHP/MySQL installation needed
- Easy to share with team
- Production-like environment

**Key Commands:**
```bash
./vendor/bin/sail up          # Start all containers
./vendor/bin/sail down        # Stop all containers
./vendor/bin/sail artisan     # Run Artisan commands
./vendor/bin/sail npm run dev # Run npm in container
```

---

### 6. Playwright (E2E Testing)

**What it is:** End-to-end testing framework.

**Why chosen:**
- Cross-browser testing
- Auto-wait for elements
- TypeScript support
- Great for testing user flows

**Test Location:** `e2e/`

```bash
# Run E2E tests
npx playwright test

# Run with UI
npx playwright test --ui
```

---

### 7. Pinia (State Management)

**What it is:** Vue 3 store library.

**Why chosen:**
- Vue 3 native (better than Vuex)
- TypeScript support
- Simple API
- Devtools integration

---

### 8. Laravel Sanctum (Authentication)

**What it is:** API authentication package.

**Why chosen:**
- Simple token-based auth
- Works with SPA
- Built into Laravel
- Secure and lightweight

---

## Technology Comparison

| Layer | Technology | Alternative Options |
|-------|------------|---------------------|
| Backend | Laravel 13 | Symfony, Node.js, Django |
| Frontend | Vue 3.5 | React, Svelte, Angular |
| Build Tool | Vite 8 | Webpack, Rollup, esbuild |
| Database | MySQL 8.4 | PostgreSQL, MariaDB, MongoDB |
| DevOps | Docker/Sail | Vagrant, Local Install, Kubernetes |
| Testing | Playwright | Cypress, Selenium, Puppeteer |
| State | Pinia | Vuex, Zustand, Redux |
| Auth | Sanctum | Passport, JWT, OAuth |

---

## Dependencies

### Backend (composer.json)

```json
{
  "require": {
    "php": "^8.5",
    "laravel/framework": "^13.0",
    "laravel/sanctum": "^4.0"
  }
}
```

### Frontend (package.json)

```json
{
  "devDependencies": {
    "vue": "^3.5.0",
    "vite": "^8.0.0",
    "pinia": "^2.0.0",
    "vue-router": "^4.0.0",
    "axios": "^1.0.0",
    "playwright": "^1.0.0"
  }
}
```

---

## System Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| **OS** | Linux/Windows/Mac | Linux Mint 21.3+ |
| **Docker** | v20.x | v24.x+ |
| **Node.js** | v18.x | v24.x+ |
| **PHP** | v8.2 | v8.5+ (in container) |
| **RAM** | 4 GB | 8 GB+ |
| **Storage** | 2 GB | 5 GB+ |

---

## Development Tools

| Tool | Purpose | URL |
|------|---------|-----|
| **VS Code** | Code editor | [code.visualstudio.com](https://code.visualstudio.com) |
| **Adminer** | Database GUI | `http://localhost:8080` |
| **Laravel Sail** | Docker management | Built-in |
| **Playwright** | E2E testing | [playwright.dev](https://playwright.dev) |
| **Git** | Version control | [git-scm.com](https://git-scm.com) |
| **Zsh** | Terminal shell | Built-in (Linux Mint) |

---

## Environment Variables

```env
# .env
APP_NAME=Moussawer
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=moussawer
DB_USERNAME=sail
DB_PASSWORD=password

SAIL_XDEBUG_MODE=off
```

---

## Related Documentation

- [Architecture](./architecture) - System architecture
- [Setup Guide](./setup-guide) - Local development setup
- [API Reference](./api-reference) - API endpoints
- [Workflows](./workflows) - Development workflows

---

*Last updated: April 2026*