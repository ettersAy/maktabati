---
title: Maktabati Setup Guide
description: How I created and configured this documentation platform
---

# Maktabati Setup Guide

This document details how I built the Maktabati documentation platform using VitePress, Vue 3, and GitHub Pages.

## Overview

**Maktabati** (مكتبتي - "My Library" in Arabic) is my personal documentation hub for all development projects, workflows, and technical guides.

| Item | Value |
|------|-------|
| **Local Path** | `/opt/apps/maktabati` |
| **Repository** | `github.com/ettersAy/maktabati` |
| **Live URL** | `https://ettersAy.github.io/maktabati/` |
| **Stack** | VitePress + Vue 3 + GitHub Pages |

---

## Prerequisites

- Node.js v20+ (I use v24.13)
- Git configured with SSH keys
- GitHub account
- OpenRouter account (for AI refinement - optional)

---

## Step-by-Step Setup

### 1. Create Directory and Initialize Git

```bash
# Create the application directory
sudo mkdir -p /opt/apps/maktabati
sudo chown $USER:$USER /opt/apps/maktabati
cd /opt/apps/maktabati

# Initialize Git
git init
git remote add origin git@github.com:ettersAy/maktabati.git
```

### 2. Initialize npm and Install Dependencies

```bash
# Initialize package.json
npm init -y

# Install VitePress and Vue
npm install -D vitepress vue @vue/devtools-api

# Optional: Tailwind CSS for custom styling
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Create Directory Structure

```bash
mkdir -p docs/.vitepress/theme
mkdir -p docs/.vitepress/components
mkdir -p docs/projects/moussawer
mkdir -p docs/workflows
mkdir -p docs/guides/{vscode,docker,ollama,ai-apis,linux}
mkdir -p docs/snippets
mkdir -p scripts
mkdir -p .github/workflows
```

### 4. Configure VitePress

Create `docs/.vitepress/config.mjs`:

```javascript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Maktabati',
  description: 'My Development Documentation Library',
  
  base: '/maktabati/',
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Projects', link: '/projects/' },
      { text: 'Workflows', link: '/workflows/' },
      { text: 'Guides', link: '/guides/' },
      { text: 'Snippets', link: '/snippets/' },
    ],
    
    sidebar: {
      '/projects/': [
        {
          text: 'Moussawer',
          items: [
            { text: 'Overview', link: '/projects/moussawer/' },
            { text: 'Architecture', link: '/projects/moussawer/architecture' },
          ],
        },
      ],
      '/guides/': [
        {
          text: 'Maktabati',
          items: [
            { text: 'Setup Guide', link: '/guides/maktabati-setup' },
          ],
        },
      ],
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ettersAy/maktabati' },
      { icon: 'github', link: 'https://github.com/ettersAy/moussawer' },
    ],
  },
  
  markdown: {
    lineNumbers: true,
  },
})
```

### 5. Create Theme Files

Create `docs/.vitepress/theme/index.js`:

```javascript
import DefaultTheme from 'vitepress/theme'
import './styles.css'

export default {
  ...DefaultTheme,
}
```

Create `docs/.vitepress/theme/styles.css`:

```css
:root {
  --vp-c-brand: #4f46e5;
  --vp-c-brand-light: #6366f1;
  --vp-c-brand-dark: #4338ca;
}

.dark {
  --vp-c-brand: #6366f1;
  --vp-c-brand-light: #818cf8;
  --vp-c-brand-dark: #4f46e5;
}
```

### 6. Update package.json Scripts

Edit `package.json`:

```json
{
  "name": "maktabati",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  "devDependencies": {
    "vitepress": "^1.0.0",
    "vue": "^3.5.0"
  }
}
```

### 7. Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build with VitePress
        run: npm run docs:build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 8. Create .gitignore

Create `.gitignore`:

```gitignore
node_modules/
dist/
docs/.vitepress/dist/
*.bak
.DS_Store
.env
.env.local
```

---

## AI Refinement Setup (Optional)

### 1. Get OpenRouter API Key

1. Visit [openrouter.ai/keys](https://openrouter.ai/keys)
2. Create account / Login
3. Click **Create Key**
4. Copy the key (starts with `sk-or-...`)

### 2. Set Environment Variable

Add to `~/.zshrc`:

```bash
export OPENROUTER_API_KEY="sk-or-your-key-here"
```

Then reload:

```bash
source ~/.zshrc
```

---

## Deployment to GitHub Pages

### 1. Push to GitHub

```bash
# Add all files
git add .

# Commit
git commit -m "docs: initial maktabati setup"

# Push to main branch
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to `github.com/ettersAy/maktabati/settings/pages`
2. Under **Source**, select **GitHub Actions**
3. Click **Save**

### 3. Wait for Deployment

- GitHub Actions will automatically build and deploy
- Check progress at: `github.com/ettersAy/maktabati/actions`
- Once complete, your site will be live at: `https://ettersAy.github.io/maktabati/`

---

## Verification Checklist

- [ ] Local dev server runs: `npm run docs:dev`
- [ ] All internal links work locally
- [ ] Push to GitHub successful
- [ ] GitHub Actions build passes
- [ ] Live site accessible
- [ ] No 404 errors on navigation

---

## Troubleshooting

### 404 on Navigation

If you get 404 errors after deployment:

1. Check `base` in `config.mjs` matches repo name: `base: '/maktabati/'`
2. Ensure the target `.md` file exists
3. Rebuild locally: `npm run docs:build`

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run docs:build
```

### GitHub Actions Fails

1. Check the Actions tab for error details
2. Verify Node version in workflow matches local
3. Ensure `package.json` has correct scripts

---

## Related Documentation

- [Moussawer Project](/projects/moussawer/)
- [VS Code Setup](/guides/vscode/)
- [Docker & Sail](/workflows/docker-sail/)

---

*Last updated: April 2026*
