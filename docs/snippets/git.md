---
title: Git Best Practices
description: List cmd & process for git
tags: [git, project, bestParctices]
---
# Snippet: Git

## Backup before major changes

⚠️ **Important:** Always create a backup before modifying configuration files.

### Step 1: Commit Current State

```bash
cd /opt/apps/maktabati

# Check current status
git status

# Stage all changes
git add .

# Commit with descriptive message
git commit -m "backup: pre auto-sidebar plugin installation"

# Push to GitHub (remote backup)
git push origin main
```

### Step 2: Verify Backup

```bash
# Check commit history
git log --oneline -5

389cbb3 (HEAD -> main, origin/main) Add comprehensive documentation for Moussawer platform
37441c4 feat: enhance documentation structure and add new guides for Maktabati platform
7c93893 chore: update Node.js version to 22 in CI
ce69665 fix: update hero section with author name and text
5ad3982 fix: include package-lock.json for CI/CD

# Verify remote has the commit
git status
# Should show: "Your branch is up to date with 'origin/main'"
```

### Step 3: Rollback Commands (If Needed)

If something goes wrong, revert to backup:

```bash
# Option 1: Reset to last commit (discards local changes)
git reset --hard HEAD~1

# Option 2: Restore specific file from last commit
git checkout HEAD~1 -- docs/.vitepress/config.mjs

# Option 3: Stash changes (keep them for later)
git stash
# To restore later: git stash pop
```
