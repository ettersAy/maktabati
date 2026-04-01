---
title: How It Works
description: Understanding the build and deployment process
---

# How It Works

Step-by-step explanation of how Maktabati builds and deploys.

---

## Development Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT WORKFLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Write Content                                                │
│     └─ Create/edit .md files in docs/ folder                    │
│                                                                  │
│  2. Preview Locally                                              │
│     └─ Run: npm run docs:dev                                    │
│     └─ Open: http://localhost:5173/maktabati/                   │
│                                                                  │
│  3. Commit Changes                                               │
│     └─ git add . && git commit -m "docs: update"                │
│                                                                  │
│  4. Push to GitHub                                               │
│     └─ git push origin main                                     │
│                                                                  │
│  5. Auto Build & Deploy                                          │
│     └─ GitHub Actions triggers automatically                    │
│     └─ Builds static HTML                                       │
│     └─ Deploys to GitHub Pages                                  │
│                                                                  │
│  6. Live Site Updated                                            │
│     └─ https://ettersAy.github.io/maktabati/                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Build Process Explained

### What Happens During `npm run docs:build`?

1. **VitePress reads config** (`docs/.vitepress/config.mjs`)
2. **Parses all Markdown files** in `docs/` folder
3. **Converts Markdown to HTML** with Vue components
4. **Bundles JavaScript** (Vue runtime, theme, components)
5. **Optimizes assets** (minify CSS, JS, images)
6. **Generates static files** in `docs/.vitepress/dist/`
7. **Creates routing** for SPA navigation

### Output Structure

```
docs/.vitepress/dist/
├── index.html          # Home page
├── projects/
│   └── index.html      # Projects page
├── guides/
│   └── index.html      # Guides page
├── assets/
│   ├── style.[hash].css   # Compiled CSS
│   └── app.[hash].js      # Compiled JS
└── 404.html            # Custom 404 page
```

---

## GitHub Actions Workflow

### What Happens on Push?

.github/workflows/deploy.yml

1. Checkout code from repository
2. Setup Node.js environment
3. Install npm dependencies
4. Run: npm run docs:build
5. Configure GitHub Pages
6. Upload build artifact
7. Deploy to GitHub Pages

### Workflow Status

Check build status at: `github.com/ettersAy/maktabati/actions`

---

## How Navigation Works

### Client-Side Routing

VitePress uses **Vue Router** for navigation:

1. User clicks a link
2. JavaScript intercepts the click
3. Fetches the new page content (no full reload)
4. Updates the URL and displays new content
5. **Result:** Fast, app-like experience

### URL Structure

| URL | File |
|-----|------|
| `/maktabati/` | `docs/index.md` |
| `/maktabati/projects/` | `docs/projects/index.md` |
| `/maktabati/guides/maktabati-setup` | `docs/guides/maktabati-setup.md` |

---

## Development vs Production

| Aspect | Development | Production |
|--------|-------------|------------|
| Command | `npm run docs:dev` | `npm run docs:build` |
| Server | Vite dev server | Static files |
| Hot Reload | ✅ Yes | ❌ No |
| Minification | ❌ No | ✅ Yes |
| Source Maps | ✅ Yes | ❌ No |
| Speed | Fast iteration | Optimized load |

---

## Custom Domain Setup (Optional)

### Steps to Add Custom Domain

1. Create `docs/CNAME` file with your domain:
   ```
   docs.maktabati.com
   ```

2. Configure DNS at your domain provider:
   ```
   Type: CNAME
   Name: docs
   Value: ettersAy.github.io
   ```

3. Update GitHub Pages settings:
   - Go to Settings → Pages
   - Add custom domain
   - Enable HTTPS

---

## Troubleshooting Build Issues

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Build fails | Missing dependency | `npm install` |
| 404 after deploy | Wrong base path | Check `base: '/maktabati/'` |
| Links broken | Missing .md file | Create placeholder files |
| CSS not loading | Theme config error | Check `theme/index.js` |

### Debug Commands

```bash
# Clean rebuild
rm -rf node_modules docs/.vitepress/dist
npm install
npm run docs:build

# Preview production build locally
npm run docs:preview

# Check for broken links
npm run docs:build 2>&1 | grep -i warning
```

---

## Related Documentation

- [Technology Stack](./technology-stack) - All technologies used
- [File Structure](./file-structure) - Project organization
- [Customization](./customization) - Extending the platform

