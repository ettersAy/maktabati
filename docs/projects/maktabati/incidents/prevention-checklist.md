---
title: Prevention Checklist
description: Common issues and how to prevent them
---

# Prevention Checklist

Common incidents and how to prevent them from happening again.

---

## Build Failures

### VitePress + Vue Template Syntax Conflict

**Problem:** Code blocks with `\{\{ }}` or `$\{\{ }}` cause build failures.

**Affected:**
- GitHub Actions workflows (`$\{\{ }}`)
- Laravel Blade templates (`\{\{ }}`)
- Vue templates (`\{\{ }}`)
- Handlebars/Mustache (`\{\{ }}`)

**Prevention:**

```markdown
<!-- Always add v-pre directive -->
```yaml {v-pre}
url: $\{\{ steps.deployment.outputs.page_url }}
```

**Checklist:**
- [ ] Check all code blocks for template syntax
- [ ] Add `v-pre` to any block with `\{\{` or `$\{\{`
- [ ] Run `npm run docs:build` before committing
- [ ] Review PR for template syntax patterns

**Related:** [INC-2026-001](./inc-2026-001)

---

### Missing Dependencies

**Problem:** Build fails due to missing npm packages.

**Prevention:**

```bash
# Before committing, always run:
npm install
npm run docs:build
```

**Checklist:**
- [ ] Run `npm install` after adding new packages
- [ ] Commit `package-lock.json` changes
- [ ] Test build on clean install (`rm -rf node_modules && npm install`)

---

### Broken Internal Links

**Problem:** Links point to non-existent pages.

**Prevention:**

```bash
# Check for warnings during build
npm run docs:build 2>&1 | grep -i "warning\|error"
```

**Checklist:**
- [ ] Verify all `.md` files exist before linking
- [ ] Use relative paths: `/workflows/incidents/` not full URLs
- [ ] Update sidebar when adding/removing pages
- [ ] Test all navigation after changes

---

## Deployment Issues

### 404 After Deploy

**Problem:** Pages return 404 on GitHub Pages.

**Common Causes:**
- Wrong `base` path in config
- Missing `index.md` in folder
- Case-sensitive file names

**Prevention:**

```javascript
// docs/.vitepress/config.mjs
export default defineConfig({
  base: '/maktabati/', // Must match repo name
})
```

**Checklist:**
- [ ] `base` matches repository name
- [ ] Every folder has `index.md`
- [ ] File names use lowercase kebab-case
- [ ] Test with `npm run docs:preview` before push

---

### GitHub Actions Failure

**Problem:** CI/CD pipeline fails on push.

**Common Causes:**
- Node version mismatch
- Missing secrets
- Workflow syntax errors

**Prevention:**

```yaml
# .github/workflows/deploy.yml
- uses: actions/setup-node@v4
  with:
    node-version: 20 # Match local version
```

**Checklist:**
- [ ] Node version matches local development
- [ ] All required secrets are configured
- [ ] Workflow file validated (use YAML linter)
- [ ] Test workflow with `workflow_dispatch` trigger

---

## Security Issues

### Exposed Secrets

**Problem:** API keys or credentials in repository.

**Prevention:**

```bash
# Add to .gitignore
.env
.env.local
*.key
*.pem
```

**Checklist:**
- [ ] Never commit `.env` files
- [ ] Use GitHub Secrets for CI/CD
- [ ] Rotate any exposed credentials immediately
- [ ] Run `git log -p --all | grep -i "password\|key\|secret"` to check history

---

### Unauthorized Access

**Problem:** Unexpected access to protected resources.

**Prevention:**
- Enable 2FA on GitHub account
- Review repository access regularly
- Use principle of least privilege

**Checklist:**
- [ ] 2FA enabled on all accounts
- [ ] Review collaborator list quarterly
- [ ] Audit GitHub Actions permissions
- [ ] Monitor access logs

---

## Performance Issues

### Slow Build Times

**Problem:** Build takes too long (>10 minutes).

**Common Causes:**
- Too many large images
- Unoptimized components
- Excessive plugins

**Prevention:**

```bash
# Check build time
time npm run docs:build

# Optimize images
npx imagemin docs/**/*.png -o docs/
```

**Checklist:**
- [ ] Compress images before adding
- [ ] Remove unused components
- [ ] Lazy-load heavy components
- [ ] Monitor build time trends

---

### Memory Issues

**Problem:** Build fails with out-of-memory error.

**Prevention:**

```bash
# Increase Node memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run docs:build
```

**Checklist:**
- [ ] Monitor memory usage during build
- [ ] Split large documentation into multiple files
- [ ] Use GitHub Actions with more RAM if needed

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────────┐
│              PRE-COMMIT CHECKLIST                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [ ] npm run docs:build succeeds locally                        │
│  [ ] No warnings in build output                                │
│  [ ] All internal links work                                    │
│  [ ] Code blocks with \{\{ }} have v-pre                          │
│  [ ] No sensitive data in files                                 │
│  [ ] Sidebar config updated                                     │
│  [ ] Index pages updated                                        │
│  [ ] Git status clean (no unwanted files)                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Related Documentation

- [Incident Template](./incident-template) - Report new incidents
- [How to Document](./how-to-document) - Documentation guide
- [Incident Index](./) - All incidents
- [Maktabati Setup](/guides/maktabati-setup) - Platform configuration

---

*Last updated: April 2026*