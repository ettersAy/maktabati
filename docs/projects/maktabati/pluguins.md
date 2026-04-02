---
title: Plugins
description: How to install & config plugins
---

# VitePress Plugins

Guide for installing and configuring VitePress plugins to extend functionality. It 

---

## Plugin: vitepress-plugin-auto-sidebar

Automatically generate sidebar navigation from your file structure.

⚠️ **Important:** [>> Backup before major changes <<](/snippets/git)

---

## Installation

### Step 1: Install Package

```bash
cd /opt/apps/maktabati

# Install the plugin
npm install -D vitepress-plugin-auto-sidebar
```

### Step 2: Verify Installation

```bash
# Check package.json
cat package.json | grep auto-sidebar

# Check node_modules
ls node_modules | grep auto-sidebar
```

---

## Configuration

### Step 1: Update Config File

Edit `docs/.vitepress/config.mjs`:

```javascript
// docs/.vitepress/config.mjs
import { defineConfig } from 'vitepress'
import { getSidebar } from 'vitepress-plugin-auto-sidebar'

export default defineConfig({
  title: 'Maktabati',
  description: 'My Development Documentation Library',
  ignoreDeadLinks: true,
  
  base: '/maktabati/',
  
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Projects', link: '/projects/' },
      { text: 'Workflows', link: '/workflows/' },
      { text: 'Guides', link: '/guides/' },
      { text: 'Snippets', link: '/snippets/' },
    ],
    
    // ✅ FIXED: Use relative path (no leading slash) + debugPrint
    // ✅ Correct usage: getSidebar (not autoSidebar)
    sidebar: getSidebar({
      contentRoot: 'docs',              // ← Changed: '/docs' → 'docs'
      contentDirs: [
        { path: 'projects', title: '📦 Projects' },
        { path: 'workflows', title: '⚙️ Workflows' },
        { path: 'guides', title: '📚 Guides' },
        { path: 'snippets', title: '📝 Snippets' },
      ],
      collapsible: true,
      collapsed: true,
      useFrontmatter: true,
      debugPrint: true,                 // ← Added: See what plugin finds
    }),
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ettersAy/maktabati' },
      { icon: 'github', link: 'https://github.com/ettersAy/moussawer' },
    ],
    
    footer: {
      message: 'Released under MIT License',
      copyright: 'Copyright © 2026 Ayoub Etters',
    },
  },
  
  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.options.highlight = (str, lang) => {
        if (['gitignore', 'env'].includes(lang)) {
          return `<pre><code>${md.utils.escapeHtml(str)}</code></pre>`
        }
      }
    },
  },
})
```

### Step 2: Add Frontmatter to Index Files

Each folder needs an `index.md` with frontmatter:

```markdown
---
title: Section Name
description: Brief description
---

# Section Name

Overview content here...
```

**Example:** `docs/projects/index.md`

```markdown
---
title: Projects
description: All my development projects
---

# Projects

Documentation for my development projects.
```

---

## File Structure Requirements

For auto-sidebar to work correctly:

```
docs/
├── projects/
│   ├── index.md              # ✅ Required (section overview)
│   ├── maktabati/
│   │   ├── index.md          # ✅ Required
│   │   ├── architecture.md   # ✅ Auto-added to sidebar
│   │   └── setup.md          # ✅ Auto-added to sidebar
│   └── moussawer/
│       ├── index.md          # ✅ Required
│       └── api-reference.md  # ✅ Auto-added to sidebar
│
├── workflows/
│   ├── index.md              # ✅ Required
│   └── incidents/
│       ├── index.md          # ✅ Required
│       └── inc-2026-001.md   # ✅ Auto-added to sidebar
│
└── guides/
    ├── index.md              # ✅ Required
    └── vscode/
        └── setup.md          # ✅ Auto-added to sidebar
```

---

## Testing

### Step 1: Test Locally

```bash
# Start development server
npm run docs:dev

# Open browser
# http://localhost:5173/maktabati/

# Verify:
# ✓ Sidebar auto-generated from file structure
# ✓ All links work
# ✓ No console errors
```

### Step 2: Build Production

```bash
# Stop dev server (Ctrl+C)

# Build for production
npm run docs:build

# Check for errors
# If successful, no error output
```

### Step 3: Preview Production

```bash
# Preview production build locally
npm run docs:preview

# Open: http://localhost:4173/maktabati/
```

---

## Deployment

### Step 1: Commit Changes

```bash
# Check what changed
git status

# Stage all changes
git add .

# Commit with descriptive message
git commit -m "feat: add vitepress-plugin-auto-sidebar for automatic navigation"
```

### Step 2: Push to GitHub

```bash
# Push to main branch
git push origin main

# Monitor GitHub Actions
# https://github.com/ettersAy/maktabati/actions
```

### Step 3: Verify Live Site

```bash
# Once Actions complete (green check)
# Visit: https://ettersAy.github.io/maktabati/

# Verify:
# ✓ Sidebar displays correctly
# ✓ All navigation links work
# ✓ No 404 errors
```

---

## Troubleshooting

### Issue: Sidebar Not Generating

| Cause | Solution |
|-------|----------|
| Missing `index.md` | Add `index.md` to each folder |
| Wrong import path | Check: `import { autoSidebar } from 'vitepress-plugin-auto-sidebar'` |
| Plugin not installed | Run: `npm install` |

```bash
# Debug: Check if plugin is installed
npm list vitepress-plugin-auto-sidebar
```

### Issue: Build Fails After Installation

```bash
# Option 1: Clear cache and rebuild
rm -rf node_modules docs/.vitepress/dist
npm install
npm run docs:build

# Option 2: Rollback to backup
git reset --hard HEAD~1
npm install
npm run docs:build
```

### Issue: Links Broken After Deploy

| Check | Command |
|-------|---------|
| Base path correct | `cat docs/.vitepress/config.mjs \| grep base` |
| All index.md exist | `find docs -name "index.md" \| sort` |
| File naming correct | All lowercase, kebab-case |

---

## Configuration Options

### Global Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `collapse` | Boolean | `false` | Collapse nested items by default |
| `depth` | Number | `3` | Maximum depth to scan |
| `ignore` | Array | `[]` | Folders to ignore |

### Section Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | String | Folder name | Custom section title |
| `collapse` | Boolean | `false` | Override global collapse |
| `order` | Array | `[]` | Custom order for items |

### Example: Custom Order

```javascript
sidebar: autoSidebar({
  sections: {
    '/projects/': {
      title: 'Projects',
      order: ['maktabati', 'moussawer'], // Force order
    },
  },
}),
```

---

## Pros & Cons

### Advantages

| Benefit | Explanation |
|---------|-------------|
| **Less Maintenance** | No manual sidebar updates |
| **Consistent Structure** | Sidebar matches file structure |
| **Scalable** | Works with any number of pages |
| **Auto-Discovery** | New files appear automatically |

### Disadvantages

| Limitation | Workaround |
|------------|------------|
| Less custom ordering | Use `order` option |
| Requires index.md | Create minimal index files |
| Plugin dependency | Keep backup before installing |

---

## Alternative Plugins

| Plugin | Purpose | URL |
|--------|---------|-----|
| `vitepress-plugin-search` | Add search functionality | [npmjs.com/package/vitepress-plugin-search](https://npmjs.com/package/vitepress-plugin-search) |
| `vitepress-plugin-google-analytics` | Analytics integration | [npmjs.com/package/vitepress-plugin-google-analytics](https://npmjs.com/package/vitepress-plugin-google-analytics) |
| `vitepress-plugin-tabs` | Tabbed content blocks | [npmjs.com/package/vitepress-plugin-tabs](https://npmjs.com/package/vitepress-plugin-tabs) |

---

## Rollback Guide

If you need to revert to manual sidebar:

### Step 1: Uninstall Plugin

```bash
npm uninstall vitepress-plugin-auto-sidebar
```

### Step 2: Restore Config

```bash
# Restore config from backup
git checkout HEAD~1 -- docs/.vitepress/config.mjs

# Or manually remove autoSidebar import and usage
```

### Step 3: Reinstall Dependencies

```bash
npm install
```

### Step 4: Test Build

```bash
npm run docs:build
```

### Step 5: Commit Rollback

```bash
git add .
git commit -m "revert: remove auto-sidebar plugin"
git push origin main
```

---

## Best Practices

### Before Installing Any Plugin

- [ ] Commit current state (backup)
- [ ] Push to remote (remote backup)
- [ ] Test on local first
- [ ] Read plugin documentation
- [ ] Check for known issues

### After Installing

- [ ] Test all navigation links
- [ ] Build production locally
- [ ] Verify mobile view
- [ ] Monitor GitHub Actions
- [ ] Update documentation

### Ongoing Maintenance

- [ ] Keep plugin updated: `npm update vitepress-plugin-auto-sidebar`
- [ ] Review changelog before major updates
- [ ] Test after each update
- [ ] Maintain backup commits

---

## Related Documentation

- [Technology Stack](./technology-stack) - All technologies used
- [Customization Guide](./customization) - Theme and config modifications
- [How It Works](./how-it-works) - Build process explained
- [File Structure](./file-structure) - Project organization

---

*Last updated: April 2026*