---
title: Technology Stack
description: Complete breakdown of all technologies used in Maktabati
---

# Technology Stack

Complete technical breakdown of the Maktabati platform.

---

## Core Technologies

### 1. VitePress (Static Site Generator)

**What it is:** A Vue-powered static site generator optimized for documentation.

**Version:** Latest (v1.x)

**Why chosen:**
- Built on Vue 3 (matches my main stack)
- Markdown-first approach
- Fast hot-reload during development
- Built-in search functionality
- Easy theming and customization

**Official Site:** [vitepress.dev](https://vitepress.dev)

Installation cmd `npm install -D vitepress vue`

---

### 2. Vue 3.5 (JavaScript Framework)

**What it is:** Progressive JavaScript framework for building user interfaces.

**Version:** 3.5.x (Composition API)

**Why chosen:**
- I already use Vue 3 for Moussawer project
- Component-based architecture
- Reactive data binding
- Large ecosystem and community

**Key Features Used:**
- Composition API (`<script setup>`)
- Reactive components
- Custom theme components

**Official Site:** [vuejs.org](https://vuejs.org)

---

### 3. Vite (Build Tool)

**What it is:** Next-generation frontend build tool.

**Version:** 8.x

**Why chosen:**
- Extremely fast hot module replacement (HMR)
- Optimized production builds
- Native ES modules support
- Works seamlessly with Vue 3

**Official Site:** [vite.dev](https://vite.dev)

---

### 4. Markdown (Content Format)

**What it is:** Lightweight markup language for formatting text.

**File Extension:** `.md`

**Why chosen:**
- Easy to write and read
- Version control friendly (Git diffs are clean)
- Can embed Vue components inside
- Converts to clean HTML

**Example:**
```markdown
# Heading

This is **bold** and this is *italic*.

```bash
echo "Code blocks work too"
```
```

---

### 5. Node.js & npm

**What it is:** JavaScript runtime and package manager.

**Version:** Node v24.13, npm latest

**Why chosen:**
- Required for VitePress and Vite
- Manages all dependencies
- Runs build scripts

**Key Commands:**
```bash
npm run docs:dev    # Start development server
npm run docs:build  # Build for production
npm run docs:preview # Preview production build
```

---

## Infrastructure

### 6. GitHub Pages (Hosting)

**What it is:** Static site hosting service by GitHub.

**Cost:** Free

**Why chosen:**
- Free hosting with SSL (HTTPS)
- Automatic deployment from Git
- Custom domain support
- 99.9% uptime

**URL Pattern:** `https://ettersAy.github.io/maktabati/`

---

### 7. GitHub Actions (CI/CD)

**What it is:** Automation platform for workflows.

**Why chosen:**
- Automatic build on every push
- Automatic deployment to GitHub Pages
- No external CI/CD service needed
- Free for public repositories

**Workflow File:** `.github/workflows/deploy.yml`

---

### 8. Git (Version Control)

**What it is:** Distributed version control system.

**Why chosen:**
- Track all documentation changes
- Collaborate if needed
- Rollback to previous versions
- Branch for experimental changes

**Repository:** `github.com/ettersAy/maktabati`

---

## Technology Comparison

| Layer | Technology | Alternative Options |
|-------|------------|---------------------|
| SSG | VitePress | Docusaurus, Next.js, Nuxt |
| Framework | Vue 3 | React, Svelte, Angular |
| Build Tool | Vite | Webpack, Rollup, esbuild |
| Hosting | GitHub Pages | Vercel, Netlify, Firebase |
| CI/CD | GitHub Actions | GitLab CI, CircleCI, Jenkins |
| Content | Markdown | MDX, AsciiDoc, reStructuredText |

---

## Dependencies (package.json)

```json
{
  "devDependencies": {
    "vitepress": "^1.0.0",
    "vue": "^3.5.0"
  }
}
```

---

## System Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Node.js | v18.x | v24.x |
| npm | v8.x | v10.x |
| Git | v2.x | v2.40+ |
| Storage | 100 MB | 500 MB |
| RAM | 512 MB | 2 GB |

---

## Related Documentation

- [How It Works](./how-it-works) - Build process explained
- [File Structure](./file-structure) - Project organization
- [Customization](./customization) - Extending the platform


