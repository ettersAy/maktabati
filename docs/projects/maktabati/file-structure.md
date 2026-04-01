---
title: File Structure
description: Complete project organization and file purposes
---

# File Structure

Complete breakdown of the Maktabati project organization.

---

## Root Directory

```
/opt/apps/maktabati/
├── docs/                   # All documentation content
├── scripts/                # Automation scripts
├── .github/                # GitHub configuration
├── .gitignore              # Git ignore rules
├── package.json            # npm dependencies & scripts
├── package-lock.json       # Dependency lock file
└── README.md               # Project readme
```

---

## Docs Directory (Content)

```
docs/
├── .vitepress/             # VitePress configuration
│   ├── config.mjs          # Main config file
│   ├── theme/
│   │   ├── index.js        # Theme entry point
│   │   └── styles.css      # Custom CSS
│   └── components/         # Custom Vue components
│
├── index.md                # Home page
│
├── projects/               # Project documentation
│   ├── index.md            # Projects overview
│   ├── maktabati/          # Maktabati platform docs
│   │   ├── index.md
│   │   ├── technology-stack.md
│   │   ├── how-it-works.md
│   │   ├── file-structure.md
│   │   └── customization.md
│   └── moussawer/          # Moussawer app docs
│       ├── index.md
│       ├── architecture.md
│       └── api-reference.md
│
├── workflows/              # Development workflows
│   ├── index.md
│   ├── git-strategy.md
│   └── docker-sail.md
│
├── guides/                 # Technical guides
│   ├── index.md
│   ├── vscode/
│   ├── docker/
│   ├── ai-apis/
│   └── linux/
│
└── snippets/               # Code snippets
    ├── index.md
    ├── php-laravel.md
    └── vue-composables.md
```

---

## Key Files Explained

### `package.json`

Defines project metadata, dependencies, and scripts.

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

---

### `docs/.vitepress/config.mjs`

Main configuration file for VitePress.

```javascript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Maktabati',
  description: 'My Development Documentation Library',
  base: '/maktabati/',
  
  themeConfig: {
    nav: [...],      // Navigation menu
    sidebar: [...],  // Sidebar structure
    socialLinks: [...],
  },
  
  markdown: {
    lineNumbers: true,
  },
})
```

**Key Settings:**
- `title`: Site title (browser tab)
- `description`: SEO description
- `base`: URL path (must match repo name)
- `themeConfig.nav`: Top navigation
- `themeConfig.sidebar`: Side navigation per section

---

### `docs/index.md`

Home page content with frontmatter.

```markdown
---
layout: home
title: Maktabati
hero:
  name: Maktabati
  text: My Development Documentation Library
  actions:
    - theme: brand
      text: Browse Projects
      link: /projects/
---

## Welcome

Content here...
```


**Frontmatter Fields:**
- `layout`: Page layout type
- `title`: Page title
- `hero`: Hero section configuration

---

### `.github/workflows/deploy.yml`

GitHub Actions workflow for automatic deployment.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run docs:build
      - uses: actions/deploy-pages@v4
```

---

### `.gitignore`

Files and folders to exclude from Git.

```gitignore
node_modules/
dist/
docs/.vitepress/dist/
*.bak
.DS_Store
.env
```

---

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Markdown files | kebab-case | `api-reference.md` |
| Directories | kebab-case | `ai-apis/` |
| Config files | standard | `config.mjs` |
| Vue components | PascalCase | `CodeBlock.vue` |
| CSS files | standard | `styles.css` |

---

## Content Organization Rules

1. **One topic per file** - Keep files focused
2. **Use folders for categories** - Group related docs
3. **Always have index.md** - Each folder needs overview
4. **Use relative links** - `/projects/moussawer/` not full URL
5. **Frontmatter required** - Every .md needs `---` header

---

## Adding New Documentation

### Step 1: Create File

```bash
touch docs/guides/new-topic.md
```

### Step 2: Add Frontmatter

```markdown
---
title: New Topic
description: Brief description
---

# New Topic

Content here...
```

### Step 3: Update Sidebar

Edit `docs/.vitepress/config.mjs`:

```javascript
sidebar: {
  '/guides/': [
    { text: 'New Topic', link: '/guides/new-topic' },
  ],
}
```

### Step 4: Test & Deploy

```bash
npm run docs:dev    # Test locally
git add .           # Stage changes
git commit -m "..." # Commit
git push            # Deploy
```

---

## Related Documentation

- [Technology Stack](./technology-stack) - All technologies used
- [How It Works](./how-it-works) - Build process explained
- [Customization](./customization) - Extending the platform
