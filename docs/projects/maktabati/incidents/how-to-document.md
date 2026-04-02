---
title: How to Document Incidents
description: Step-by-step guide for creating incident reports
---

# How to Document Incidents

Complete guide for creating and publishing incident reports in Maktabati.

---

## Step 1: Create Incident File

```bash
cd /opt/apps/maktabati

# Navigate to incidents directory
cd docs/workflows/incidents

# Create new incident file (use incremental ID)
touch inc-2026-002.md
```

### Incident ID Format

```
INC-YYYY-NNN
│   │     │
│   │     └─ Sequential number (001, 002, 003...)
│   └─────── Year (2026, 2027...)
└─────────── Incident prefix
```

**Examples:**
- `INC-2026-001` - First incident of 2026
- `INC-2026-002` - Second incident of 2026
- `INC-2027-001` - First incident of 2027

---

## Step 2: Copy Template

```bash
# Copy the template content
# Open: docs/workflows/incidents/incident-template.md
# Copy all content to your new file
```

Or use terminal:

```bash
cp docs/workflows/incidents/incident-template.md docs/workflows/incidents/inc-2026-002.md
```

---

## Step 3: Fill in the Details

### Required Fields

| Field | Why It Matters |
|-------|----------------|
| **Incident ID** | Unique identifier for tracking |
| **Date** | When it occurred |
| **Severity** | Helps prioritize future prevention |
| **Error Details** | Exact error for searchability |
| **Root Cause** | Understanding prevents recurrence |
| **Timeline** | Shows response efficiency |
| **Solution** | Actionable fix for others |
| **Lessons Learned** | Knowledge retention |

### Writing Tips

| Do | Don't |
|----|-------|
| Be specific and factual | Blame individuals |
| Include exact error messages | Vague descriptions |
| Document all attempted solutions | Hide failed attempts |
| Link to related files | Leave orphaned references |
| Use code blocks for errors | Paste unformatted text |

---

## Step 4: Add to Index

Edit `docs/workflows/incidents/index.md`:

```markdown
## Recent Incidents

| ID | Date | Project | Severity | Status |
|----|------|---------|----------|--------|
| [INC-2026-002](./inc-2026-002) | 2026-04-02 | Maktabati | Medium | ✅ Resolved |
| [INC-2026-001](./inc-2026-001) | 2026-04-02 | Maktabati | Medium | ✅ Resolved |
```

**Note:** Add new incidents at the **top** of the list (most recent first).

---

## Step 5: Update Sidebar Navigation

Edit `docs/.vitepress/config.mjs`:

```javascript
sidebar: {
  '/workflows/': [
    {
      text: 'Incidents',
      items: [
        { text: 'Overview', link: '/workflows/incidents/' },
        { text: 'Template', link: '/workflows/incidents/incident-template' },
        { text: 'How to Document', link: '/workflows/incidents/how-to-document' },
        { text: 'INC-2026-001', link: '/workflows/incidents/inc-2026-001' },
        { text: 'INC-2026-002', link: '/workflows/incidents/inc-2026-002' }, // Add new
      ],
    },
  ],
}
```

---

## Step 6: Test Locally

```bash
# Start dev server
npm run docs:dev

# Open browser
# http://localhost:5173/maktabati/workflows/incidents/

# Verify:
# ✓ New incident page loads
# ✓ Links from index work
# ✓ Sidebar shows new entry
# ✓ No broken links
```

---

## Step 7: Build & Deploy

```bash
# Stop dev server (Ctrl+C)

# Build for production
npm run docs:build

# If build succeeds, commit
git add .
git commit -m "docs: add incident report INC-2026-002"

# Push to GitHub
git push origin main

# Monitor Actions
# https://github.com/ettersAy/maktabati/actions
```

---

## Special Considerations

### ⚠️ Vue Template Syntax in Code Blocks

If your incident includes code with `\{\{ }}` or `$\{\{ }}` (GitHub Actions, Laravel Blade, Vue templates):

```markdown
<!-- WRONG: Will cause build failure -->
```yaml
url: $\{\{ steps.deployment.outputs.page_url }}
```

<!-- CORRECT: Add v-pre directive -->
```yaml {v-pre}
url: $\{\{ steps.deployment.outputs.page_url }}
```

See: [INC-2026-001](./inc-2026-001) for details on this issue.

### Sensitive Information

| Do Share | Don't Share |
|----------|-------------|
| Error messages | API keys |
| Stack traces | Passwords |
| File paths | Database credentials |
| Configuration (sanitized) | Personal user data |

---

## Incident Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                    INCIDENT LIFECYCLE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Detected ──▶ 2. Investigated ──▶ 3. Root Cause Found        │
│       │                                      │                  │
│       ▼                                      ▼                  │
│  6. Closed ◀── 5. Documented ◀─── 4. Resolved                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

| Stage | Action |
|-------|--------|
| **Detected** | Log incident, assign severity |
| **Investigated** | Gather logs, reproduce issue |
| **Root Cause Found** | Document what caused it |
| **Resolved** | Apply and verify fix |
| **Documented** | Create incident report |
| **Closed** | Review and archive |

---

## Related Documentation

- [Incident Template](./incident-template) - Blank template
- [Incident Index](./) - All incidents
- [Prevention Checklist](./prevention-checklist) - Avoid common issues
- [GitHub Actions](./github-actions-deploy) - CI/CD workflows

---

*Last updated: April 2026*