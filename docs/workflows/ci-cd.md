---
title: GitHub Actions Workflows
description: Best practices for CI/CD workflows and deployment automation
---

# GitHub Actions Workflows

Complete guide to writing and maintaining CI/CD workflows following industry best practices.

## Overview

GitHub Actions automates tasks triggered by repository events. For Maktabati, we use workflows for:
- Building documentation
- Running tests
- Deploying to GitHub Pages
- Detecting broken deployments and reverting

## Core Concepts

### Events
Events that trigger workflows:
- `push` - When code is pushed
- `pull_request` - When PR is created/updated
- `workflow_dispatch` - Manual trigger
- `schedule` - On a cron schedule

### Jobs
A workflow contains jobs that run in parallel or sequentially.

### Steps
Each job contains steps that run commands or actions.

### Actions
Reusable units of code (first-party or community).

---

## Basic Workflow Structure

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run docs:build
      - uses: actions/upload-artifact@v3
```

---

## Best Practices

### 1. Use Pinned Action Versions

**✅ Good:**
```yaml
uses: actions/checkout@v4
uses: actions/setup-node@v4
```

**❌ Bad:**
```yaml
uses: actions/checkout@main
uses: actions/setup-node@latest
```

**Why:** Pinned versions ensure consistent, predictable behavior. Updates are intentional.

### 2. Cache Dependencies

**✅ Good:**
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: npm  # Automatically caches node_modules
```

**❌ Bad:**
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 22
  # No cache - reinstalls every time
```

**Why:** Caching speeds up workflows significantly (saves minutes per run).

### 3. Use Concurrency to Prevent Duplicate Runs

**✅ Good:**
```yaml
concurrency:
  group: pages
  cancel-in-progress: false
```

**Why:** Prevents multiple deployments running simultaneously, which can cause race conditions.

### 4. Upload Artifacts for Debugging

**✅ Good:**
```yaml
- uses: actions/upload-artifact@v3
  if: always()  # Upload even if tests fail
  with:
    name: test-results
    path: e2e/reports/
```

**Why:** Allows inspection of test reports without re-running.

### 5. Use Environment Variables for Configuration

**✅ Good:**
```yaml {v-pre} {v-pre}
env:
  NODE_ENV: production
  DEPLOY_URL: \$\{\{ secrets.DEPLOY_URL }}

steps:
  - run: npm run build
```

**❌ Bad:**
```yaml
steps:
  - run: npm run build --env production --url https://hardcoded.url/
```

**Why:** Centralizes configuration, enables reuse, allows secrets.

### 6. Fail Fast with Proper Exit Codes

**✅ Good:**
```yaml
- name: Run tests
  run: npm test
  # npm test exits with 1 if tests fail
```

**❌ Bad:**
```yaml
- name: Run tests
  run: npm test || true
  # Ignores failures - workflow still passes
```

**Why:** Catches errors early, prevents deploying broken code.

---

## For Maktabati: E2E Testing Strategy

### Why Run E2E Tests?
- Catch broken links in deployment
- Verify navigation works on live site
- Ensure theme renders correctly
- Test on multiple browsers

### When to Run
- **Pre-deploy:** Before uploading to GitHub Pages
- **Post-deploy:** After deployment is live
- **Nightly:** Catch degradation over time

### Configuration

Use `tests/e2e/playwright.config.js` for both local and production testing. The file is configured to use an environment variable when testing a deployed site:

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  fullyParallel: true,
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:4173/maktabati/',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: undefined,
});
```

The workflow passes the deployed URL with `E2E_BASE_URL` and runs chromium.

---

## Rollback Strategy

For static sites, rollback is simpler than traditional apps:

### Option 1: Git Revert (GitHub Pages + Git)

On test failure, revert the commit:

```yaml
- name: Run E2E tests on production
  id: e2e-tests
  continue-on-error: true
  run: |
    npx playwright test \
      --config tests/e2e/playwright.config.js
  env:
    E2E_BASE_URL: \$\{\{ steps.deployment.outputs.page_url }}

- name: Revert if tests failed
  if: steps.e2e-tests.outcome == 'failure'
  run: |
    git config user.name "GitHub Actions"
    git config user.email "actions@github.com"
    git revert HEAD --no-edit
    git push origin main
    
- name: Notify of rollback
  if: steps.e2e-tests.outcome == 'failure'
  run: |
    echo "❌ E2E tests failed!"
    echo "Rolled back to previous version"
    exit 1
```

### Option 2: Manual Rollback

For this project, manual rollback is acceptable:

1. Identify last working commit: `git log --oneline`
2. Checkout previous version: `git checkout <commit>`
3. Force push: `git push -f origin main`
4. GitHub Pages automatically redeploys

### Option 3: Keep Previous Builds

Store previous build artifacts for quick reversal.

---

## Updated Deploy Workflow

The current `deploy.yml` with E2E testing:

See `.github/workflows/deploy.yml` for implementation.

---

## Debugging Workflows

### 1. Enable Debug Logging

```yaml
- name: Enable debug mode
  run: echo "ACTIONS_STEP_DEBUG=true" >> $GITHUB_ENV
```

### 2. Use `tee` to Save Logs

```yaml
- run: npm run docs:build 2>&1 | tee build.log
- uses: actions/upload-artifact@v3
  if: always()
  with:
    name: build-logs
    path: build.log
```

### 3. View Logs

GitHub Actions → Workflow run → Job logs

---

## Common Patterns

### Matrix Builds (Multiple Versions)

```yaml
```yaml {v-pre}
strategy:
  matrix:
    node-version: [18, 20, 22]
runs-on: ubuntu-latest
steps:
  - uses: actions/setup-node@v4
    with:
      node-version: \$\{\{ matrix.node-version }}
```
```

### Conditional Steps

```yaml
- name: Notify on failure
  if: failure()
  run: echo "Failed!"

- name: Notify on success
  if: success()
  run: echo "Success!"
```

---

## Performance Tips

| Optimization | Saves | Effort |
|--------------|-------|--------|
| Cache npm dependencies | 2 min | Easy |
| Parallel jobs | 1 min | Medium |
| Skip unnecessary steps | 0.5 min | Easy |

---

## Resources

- [GitHub Actions](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions)
- [Playwright CI Guide](https://playwright.dev/docs/ci)

---

*Last updated: April 2026*
