---
title: Incident Reports Drafts
description: incidents coccured & was able to fix, but too lazy to create a special report for them
---

# Incident Reports Drafts


```
❯ make build
npm run docs:build

> maktabati@1.0.0 docs:build
> vitepress build docs


  vitepress v1.6.4

✓ building client + server bundles...
✓ rendering pages...
build complete in 3.70s.
❯ make preview
npm run docs:preview

> maktabati@1.0.0 docs:preview
> vitepress preview docs

node:events:486
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE: address already in use :::4173
    at Server.setupListenHandle [as _listen2] (node:net:1948:16)
    at listenInCluster (node:net:2005:12)
    at Server.listen (node:net:2110:7)
    at Polka.listen (file:///srv/dev/maktabati/node_modules/vitepress/dist/node/chunk-D3CUZ4fa.js:52471:22)
    at serve (file:///srv/dev/maktabati/node_modules/vitepress/dist/node/chunk-D3CUZ4fa.js:53179:61)
Emitted 'error' event on Server instance at:
    at emitErrorNT (node:net:1984:8)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
  code: 'EADDRINUSE',
  errno: -98,
  syscall: 'listen',
  address: '::',
  port: 4173
}

Node.js v24.14.1
make: *** [Makefile:32: preview] Error 1
----
because a server is runing in background, I want you to do :
- cmd to check if a server is running in background or in another terminal.
- change Makefile to auto hundler the checking and ask the user if he want to stop the running server or not, and provide me with the entire content of the file to replace mine 
```


```
### 1. Command to Check for Running Server

Run this to see if port 4173 is occupied and by which process:

```bash
# Check who is using port 4173
lsof -i :4173
# OR if lsof is not installed
ss -tulpn | grep 4173
```

To kill it manually:
```bash
# Kill the process (replace <PID> with the number from the command above)
kill -9 <PID>
```

---

### 2. Updated `Makefile`

This version adds an interactive check. If the server is running, it asks if you want to kill it before starting a new one.

```makefile
# Makefile for Maktabati documentation site
# Supports common development tasks with intelligent checks and interactive server management
.PHONY: help install dev build preview test e2e e2e-ui e2e-report clean server-check server-kill

help:
	@echo "Maktabati Makefile Commands"
	@echo "=============================="
	@echo "make install      - Install dependencies"
	@echo "make dev          - Start dev server"
	@echo "make build        - Build for production"
	@echo "make preview      - Preview production build (handles existing servers)"
	@echo "make e2e          - Run E2E tests (auto-starts server if needed)"
	@echo "make e2e-ui       - Run E2E tests in UI mode"
	@echo "make e2e-report   - Show E2E test report"
	@echo "make test         - Run all tests"
	@echo "make clean        - Clean build artifacts"
	@echo ""
	@echo "Advanced:"
	@echo "make server-check - Check if preview server is running"
	@echo "make server-kill  - Force kill the server on port 4173"

install:
	npm ci

dev:
	npm run docs:dev

build:
	npm run docs:build

# Interactive preview command
preview:
	@if make server-check > /dev/null 2>&1; then \
		echo "⚠️  Warning: A server is already running on port 4173."; \
		make server-check; \
		read -p "❓ Do you want to stop the existing server and start a new one? (y/n) " confirm; \
		if [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]; then \
			echo "🛑 Stopping existing server..."; \
			make server-kill; \
			sleep 1; \
			echo "✅ Starting new preview server..."; \
			npm run docs:preview; \
		else \
			echo "ℹ️  Keeping existing server running. Access it at http://localhost:4173/maktabati/"; \
		fi; \
	else \
		echo "✅ No server running. Starting preview server..."; \
		npm run docs:preview; \
	fi

server-check:
	@echo "Checking if preview server is running on http://localhost:4173..."
	@if curl -sf http://localhost:4173/maktabati/ > /dev/null 2>&1; then \
		PID=$$(lsof -ti :4173 2>/dev/null || ss -tulpn | grep :4173 | grep -oP 'pid=\K\d+' | head -1); \
		echo "✓ Server is running (PID: $$PID)"; \
		exit 0; \
	else \
		echo "✗ Server not running on port 4173"; \
		exit 1; \
	fi

server-kill:
	@echo "🛑 Attempting to kill process on port 4173..."
	@PID=$$(lsof -ti :4173 2>/dev/null); \
	if [ -n "$$PID" ]; then \
		kill -9 $$PID 2>/dev/null && echo "✅ Process $$PID killed successfully." || echo "⚠️  Failed to kill process $$PID."; \
	else \
		echo "ℹ️  No process found on port 4173."; \
	fi

# Run tests with intelligent server management
test: e2e

e2e:
	@echo "Running E2E tests with fail-fast..."
	@if make server-check > /dev/null 2>&1; then \
		echo "✓ Using existing server"; \
		npx playwright test --max-failures=1; \
	else \
		echo "⚠ Server not running. Building and starting preview server..."; \
		npm run docs:build && \
		echo "Starting preview server in background..."; \
		npm run docs:preview > /tmp/preview.log 2>&1 & \
		PREVIEW_PID=$$!; \
		echo "Waiting for server to be ready (checking every 1s)..."; \
		for i in {1..15}; do \
			if curl -sf http://localhost:4173/maktabati/ > /dev/null 2>&1; then \
				echo "✓ Server started successfully."; \
				break; \
			fi; \
			sleep 1; \
		done; \
		if curl -sf http://localhost:4173/maktabati/ > /dev/null 2>&1; then \
			npx playwright test --max-failures=1; \
			TEST_RESULT=$$?; \
			kill $$PREVIEW_PID 2>/dev/null || true; \
			exit $$TEST_RESULT; \
		else \
			echo "✗ Failed to start server within timeout."; \
			cat /tmp/preview.log; \
			kill $$PREVIEW_PID 2>/dev/null || true; \
			exit 1; \
		fi; \
	fi

e2e-ui:
	@echo "Running E2E tests in UI mode..."
	@if make server-check > /dev/null 2>&1; then \
		echo "✓ Using existing server"; \
		npx playwright test --ui; \
	else \
		echo "⚠ Server not running. Building and starting preview server..."; \
		npm run docs:build && npm run docs:preview & \
		sleep 3; \
		npx playwright test --ui; \
	fi

e2e-f:
	@echo "Running full E2E test suite..."
	@if make server-check > /dev/null 2>&1; then \
		echo "✓ Using existing server"; \
		npx playwright test; \
	else \
		echo "⚠ Server not running. Building and starting preview server..."; \
		npm run docs:build && \
		echo "Starting preview server in background..."; \
		npm run docs:preview > /tmp/preview.log 2>&1 & \
		PREVIEW_PID=$$!; \
		echo "Waiting for server to be ready..."; \
		for i in {1..15}; do \
			if curl -sf http://localhost:4173/maktabati/ > /dev/null 2>&1; then \
				echo "✓ Server started successfully."; \
				break; \
			fi; \
			sleep 1; \
		done; \
		if curl -sf http://localhost:4173/maktabati/ > /dev/null 2>&1; then \
			npx playwright test; \
			TEST_RESULT=$$?; \
			kill $$PREVIEW_PID 2>/dev/null || true; \
			exit $$TEST_RESULT; \
		else \
			echo "✗ Failed to start server within timeout."; \
			cat /tmp/preview.log; \
			kill $$PREVIEW_PID 2>/dev/null || true; \
			exit 1; \
		fi; \
	fi

e2e-report:
	npx playwright show-report

clean:
	rm -rf node_modules docs/.vitepress/dist
```

### Key Changes:
1.  **`preview` Target**: Now checks if the port is busy. If yes, it prompts: `Do you want to stop the existing server and start a new one? (y/n)`.
2.  **`server-kill` Target**: Added a dedicated command to forcefully kill the process on port 4173 using `lsof`.
3.  **Robust Wait Loop**: Replaced the fixed `sleep 3` in `e2e` targets with a loop that checks `curl` availability up to 15 times. This prevents race conditions where tests start before the server is ready.
4.  **PID Detection**: Improved PID detection in `server-check` to show you exactly which process is holding the port.
```
---


```
now the e2e fail with this error :
- Pass the step `Wait for deployment propagation`
```
Run echo "Waiting for GitHub Pages to propagate..."
Waiting for GitHub Pages to propagate...
✓ Site is live at http://ettersay.github.io/maktabati/
```
- fail in Step `Run E2E tests on production` 
```
Run npx playwright test \
  npx playwright test \
    --config tests/e2e/playwright.config.js \
    --project=chromium \
    --max-failures=1
  shell: /usr/bin/bash -e {0}
  env:
    E2E_BASE_URL: http://ettersay.github.io/maktabati/
  
[WebServer] failed to start server. error:
[WebServer] ENOENT: no such file or directory, open '/home/runner/work/maktabati/maktabati/docs/.vitepress/dist/404.html'
[WebServer] Error: ENOENT: no such file or directory, open '/home/runner/work/maktabati/maktabati/docs/.vitepress/dist/404.html'
[WebServer]     at Object.openSync (node:fs:560:18)
[WebServer]     at Object.readFileSync (node:fs:444:35)
[WebServer]     at serve (file:///home/runner/work/maktabati/maktabati/node_modules/vitepress/dist/node/chunk-D3CUZ4fa.js:53161:23)
Error: Process from config.webServer was not able to start. Exit code: 1
Error: Process completed with exit code 1.
```
- Step 


```
Run actions/upload-artifact@v4
  
With the provided path, there will be 1 file uploaded
Artifact name is valid!
Root directory input is valid!
Beginning upload of artifact content to blob storage
Uploaded bytes 194403
Finished uploading artifact content to blob storage!
SHA256 digest of uploaded artifact zip is 285daecce12264b7489ef11d98d4c6768e4f360f59f85bc396c1fe97331ff840
Finalizing artifact upload
Artifact playwright-report-12.zip successfully finalized. Artifact ID 6266907027
Artifact playwright-report-12 has been successfully uploaded! Final size is 194403 bytes. Artifact ID is 6266907027
Artifact download URL: https://github.com/ettersAy/maktabati/actions/runs/23966007011/artifacts/6266907027
```
also a worning notice 

```
Cleaning up orphan processes
Warning: Node.js 20 actions are deprecated. The following actions are running on Node.js 20 and may not work as expected: actions/checkout@v4, actions/setup-node@v4, actions/upload-artifact@v4. Actions will be forced to run with Node.js 24 by default starting June 2nd, 2026. Node.js 20 will be removed from the runner on September 16th, 2026. Please check if updated versions of these actions are available that support Node.js 24. To opt into Node.js 24 now, set the FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true environment variable on the runner or in your workflow file. Once Node.js 24 becomes the default, you can temporarily opt out by setting ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION=true. For more information see:
```
---
but I was able to to access to my website and it's working correctly 

- I want you to write a short documentation that takes this example of fail deployement as an example to explain what to do in case of failer of deployement where to check, and what to do like maybe steps to revert. and not for this case but in generale when a deployement fails all the steps to do...

- this makes me wonder a bout reales nbr that should be visible in home pas and that can help to see if my last change deploy or revert are propagated or not. so write a short documentation to explain a strategy of how to set a sort of auto release nbr when something is deployed !
```

---


```
### 1. Diagnosis: Why it failed despite the site working

**The Cause:**
Your `playwright.config.js` has a `webServer` block configured to **start a local server** (`npm run docs:preview`).
In the GitHub Action, you successfully deployed the site to GitHub Pages (external URL), but then Playwright tried to **also** start a local server inside the runner to test against `localhost`. This failed because:
1.  The runner environment is clean; it doesn't have the built files in the exact state expected by the preview server, or permissions differ.
2.  You don't *need* a local server because the site is already live at `http://ettersay.github.io/maktabati/`.

**The Fix:**
You must tell Playwright **NOT** to start a local server when running in CI, since you are testing the live URL.

**Update `tests/e2e/playwright.config.js`:**
```javascript
// tests/e2e/playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    // Use env var if provided (CI), otherwise fallback to local
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:4173/maktabati/',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // ⚠️ CRITICAL FIX: Only start webServer if NOT in CI
  // In CI, we test the live GitHub Pages URL, not a local preview
  webServer: process.env.CI ? undefined : {
    command: 'npm run docs:preview',
    url: 'http://localhost:4173/maktabati/',
    reuseExistingServer: true,
  },
});
```

---

### 2. Documentation: Deployment Failure Troubleshooting & Rollback Strategy

#### 🚨 Deployment Failure Playbook

When a deployment workflow fails, follow this systematic approach to diagnose and recover.

| Step | Action | Where to Check | Command / Tool |
| :--- | :--- | :--- | :--- |
| **1. Identify Failure Point** | Check which specific job/step failed. | GitHub Actions Tab → Click Failed Run → Scroll to red step. | N/A |
| **2. Analyze Logs** | Read the error message in the collapsed log section. | Look for `Error:`, `Exit code`, or `Timeout`. | Copy error text to AI/Google. |
| **3. Verify Artifact/Build** | Did the build step actually produce files? | Check "Upload artifact" step logs or download the artifact. | `ls -R docs/.vitepress/dist` (if debugging locally). |
| **4. Check Environment** | Is the target URL accessible? Does it return 200 OK? | Browser or `curl`. | `curl -I https://your-site.com` |
| **5. Decide: Fix Forward vs. Rollback** | **Fix Forward:** Bug is in new code.<br>**Rollback:** New deploy broke existing stable site. | Compare current commit vs. previous stable commit. | `git log --oneline -5` |

#### 🔄 Rollback Strategies (Senior Dev Best Practices)

**❌ Avoid Automated `git revert` in CI:**
Automatically force-pushing to `main` from a CI job is dangerous (race conditions, history rewriting).

**✅ Recommended Strategy: Manual "Fix Forward" or Safe Revert**
1.  **If the site is DOWN:**
    *   Go to GitHub Repo → **Actions** → Find the **last successful green run**.
    *   Click the three dots `...` → **Re-run jobs** (if it was a fluke) OR
    *   Manually revert the commit via UI:
        ```bash
        # Local terminal
        git checkout main
        git revert HEAD --no-edit
        git push origin main
        ```
2.  **If the site is UP but tests failed (False Positive):**
    *   Investigate the test logs. If the site works (as in your case), the test config is likely wrong (like the `webServer` issue above).
    *   Push a fix to the test config, do **not** revert the app code.

**🛡️ Prevention:**
*   Use **Preview Deploys** (deploy to a staging branch/URL first).
*   Require **Manual Approval** in GitHub Environments before deploying to `main`.

---

### 3. Strategy: Auto-Incrementing Release Numbers

To visually verify if your latest changes are live, embed a **Release Version** or **Commit Hash** in the footer.

#### Option A: Git Commit Hash (Most Accurate)
Displays the exact short hash of the commit currently deployed. If the hash on the site matches your latest local commit, you are up to date.

**1. Update `docs/.vitepress/config.ts` (or `.js`):**
VitePress allows injecting variables at build time. We will pass the git hash via `define` in Vite config.

**Create/Edit `docs/.vitepress/vite.config.ts` (or add to existing vite config):**
*Note: Since you are using standard VitePress, you might need to inject this via `package.json` script or a small build script.*

**Easier Method: Use a Build Script to Inject Version**
Create a script `scripts/inject-version.js`:
```javascript
// scripts/inject-version.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  const commitHash = execSync('git rev-parse --short HEAD').toString().trim();
  const date = new Date().toISOString().split('T')[0];
  const version = `v${date}-${commitHash}`;

  const configPath = path.resolve(__dirname, '../docs/.vitepress/config.mts'); // Adjust extension
  let content = fs.readFileSync(configPath, 'utf8');

  // Remove old version definition if exists
  content = content.replace(/version: ['"].*?['"],?/, '');
  
  // Add new version (simple regex replacement or append to themeConfig)
  // Assuming you have themeConfig in your config
  if (!content.includes(`version: '${version}'`)) {
    content = content.replace(
      /(themeConfig:\s*{)/, 
      `$1\n    version: '${version}',`
    );
  }

  fs.writeFileSync(configPath, content);
  console.log(`✅ Injected version: ${version}`);
} catch (error) {
  console.error('❌ Failed to inject version:', error.message);
  // Fallback version if git fails (e.g., in some CI contexts without .git)
  console.log('Using fallback version: v-local-build');
}
```

**2. Update `package.json`:**
Run this script before building.
```json
"scripts": {
  "docs:build": "node scripts/inject-version.js && vitepress build docs",
  "docs:dev": "vitepress dev docs"
}
```

**3. Display in Theme (`docs/.vitepress/theme/Layout.vue` or custom footer):**
If using default theme, `version` in `themeConfig` often appears automatically or can be added to the footer via slots.
*Alternatively, simple text in `config.ts` sidebar/footer:*
```typescript
// docs/.vitepress/config.ts
export default defineConfig({
  themeConfig: {
    footer: {
      message: `Released under MIT License. Build: <strong>${process.env.VERSION || 'latest'}</strong>`,
      copyright: 'Copyright © 2026 Ayoub Etters'
    }
  }
})
```
*Note: For the env var approach, pass it in GitHub Actions:*
```yaml
# In deploy.yml, build step
- name: Build with Version
  run: |
    export VERSION=$(git rev-parse --short HEAD)
    npm run docs:build
```

#### Option B: Semantic Versioning (Manual but Clean)
Maintain a `VERSION` file in your repo.
1.  Create a file `VERSION` containing `1.0.0`.
2.  Update it manually on every merge to `main`.
3.  Read this file in your build process and display it.

**Recommendation:** Use **Option A (Commit Hash)** for development/CI visibility. It guarantees you know exactly *which* commit is live without manual updates. If you see `a1b2c3d` on the site and your local head is `a1b2c3d`, the deploy succeeded.
```


