---
title: Git Strategy
---

# Git Strategy

This document outlines a simple yet organized Git workflow for the Maktabati personal documentation project.

## Overview

While team projects use complex processes (tickets, branches, PRs), personal projects need lightweight organization. Focus on meaningful commits, regular pushes, and self-review.

## Daily Workflow

### 1. Start Working
```bash
# Check current status
git status

# Pull latest changes
git pull origin main
```

### 2. Make Changes
```bash
# Work on files...
# Test changes locally
npm run docs:dev
```

### 3. Commit Changes
```bash
# Stage specific files or all
git add docs/some-file.md
# or
git add .

# Commit with descriptive message
git commit -m "feat: add testing workflow documentation"
```

### 4. Push Changes
```bash
# Push to main
git push origin main

# Monitor deployment
# https://github.com/ettersAy/maktabati/actions
```

## Commit Message Conventions

Use conventional commits for consistency:

```
type: description

[optional body]

[optional footer]
```

### Types
- `feat:` - New features or content
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Formatting, no content changes
- `refactor:` - Code restructuring
- `test:` - Testing related
- `chore:` - Maintenance tasks

### Examples
```
feat: add testing strategy documentation
fix: correct broken link in navigation
docs: update installation guide
style: format markdown tables consistently
chore: update dependencies
```

## Branching Strategy

### For Personal Projects
- **Main branch only:** For simple projects, work directly on `main`
- **Feature branches:** For larger changes, create short-lived branches

### When to Use Branches
- Major new sections (e.g., `feature/add-testing-docs`)
- Experimental changes
- When you want to work on multiple things simultaneously

### Branch Workflow
```bash
# Create feature branch
git checkout -b feature/add-testing-section

# Work and commit
git add .
git commit -m "feat: add testing documentation"

# Merge back to main
git checkout main
git merge feature/add-testing-section

# Clean up
git branch -d feature/add-testing-section
```

## Self-Review Process

### Before Pushing
- [ ] **Test locally:** `npm run docs:dev` and `npm run docs:build`
- [ ] **Check content:** Read through changes for accuracy
- [ ] **Verify links:** Click navigation and links
- [ ] **Commit message:** Clear and descriptive
- [ ] **No secrets:** Ensure no sensitive data committed

### Weekly Review
- Review commit history: `git log --oneline -10`
- Check for patterns or improvements
- Update documentation as needed

## Organization Tips

### Commit Frequency
- **Small, focused commits:** Better than large batches
- **Daily commits:** Keep work visible and backed up
- **Meaningful units:** Group related changes

### Repository Hygiene
- **Regular pushes:** Don't accumulate too many local commits
- **Clean history:** Use `git rebase` for local cleanup if needed
- **Tags for versions:** `git tag v1.0.0` for major milestones

### Backup Strategy
- **Remote first:** Always push to GitHub
- **Local backups:** Keep work backed up
- **Branch for safety:** Create backup branches for risky changes

## Tools and Aliases

Add these to your `~/.gitconfig` or `~/.zshrc`:

```bash
# Quick status
alias gs='git status'

# Quick commit
alias gc='git commit -m'

# Quick push
alias gp='git push origin main'

# Pretty log
alias gl='git log --oneline --graph --decorate'
```

## Common Scenarios

### Undo Last Commit
```bash
# Keep changes
git reset --soft HEAD~1

# Discard changes
git reset --hard HEAD~1
```

### Fix Commit Message
```bash
git commit --amend -m "New message"
```

### Stash Work in Progress
```bash
git stash
# ... work on urgent fix ...
git stash pop
```

## Learning from Team Practices

While not using full team processes, learn these concepts:
- **Atomic commits:** Each commit does one thing
- **Descriptive messages:** Explain what and why
- **Regular integration:** Frequent pushes prevent conflicts
- **Code review mindset:** Self-review your changes

## Conclusion

Keep it simple: meaningful commits, regular pushes, basic self-review. Focus on content quality over process complexity. As the project grows, you can adopt more structured practices.

