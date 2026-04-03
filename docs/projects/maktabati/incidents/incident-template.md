---
title: Incident Template
description: AI-optimized template for documenting incidents
---

# Incident Report Template

Copy this template when documenting a new incident. Optimized for AI agent analysis and future error prevention.

---

## Incident Metadata

| Field | Value | Notes |
|-------|-------|-------|
| **ID** | `INC-YYYY-NNN` | Unique identifier |
| **Date Detected** | `YYYY-MM-DD HH:MM UTC` | When first observed |
| **Date Resolved** | `YYYY-MM-DD HH:MM UTC` | When fix deployed |
| **Project** | `Maktabati / Moussawer` | Which project |
| **Component** | `CI/CD / Build / Tests / Deployment` | System affected |
| **Severity** | `🔴 Critical / 🟠 High / 🟡 Medium / 🟢 Low` | Impact level |
| **Status** | `Investigating / Mitigated / ✅ Resolved` | Current state |
| **Reporter** | Name | Who found it |

---

## Executive Summary

**One-sentence description easily understood by AI and humans:**

```
[What happened]: Build failed in GitHub Actions
[Why it matters]: Deployment blocked for 45 minutes
[Quick fix]: Added v-pre directive to code block
```

---

## Detailed Problem Statement

## Error Information

**Primary Error Message:**
```
[Exact error text - copy/paste from logs]
Stack trace or full error output
```

**Error Classification:**
- **Category:** `Build Error / Runtime Error / Deploy Error / Test Failure / Manual Mistake`
- **Error Code:** `XXXX` (if applicable)
- **Frequency:** `First occurrence / Intermittent / Recurring`
- **Environment:** `Local / CI/CD / Production / Staging`

**Related Files:**
- File: [`path/to/file.md`](../../../../path/to/file.md) - Line 42 - What was wrong
- File: [`path/to/config.js`](../../../../path/to/config.js) - Line 15 - Related config

---

## Root Cause Analysis

### What Failed?
```
Specific component/file that failed
Be exact: "GitHub Actions step X failed"
Not: "Something broke"
```

### Why Did It Fail?
```
The technical reason for the failure
What condition was violated?
What assumption was wrong?
```

### How Was It Triggered?
```
What action/change caused it?
Which commit triggered it?
Was it predictable?
```

| Aspect | Details |
|--------|---------|
| **Root Cause** | Exact technical reason |
| **Trigger** | What caused it to happen |
| **Condition** | What made it fail (not pass before) |
| **Pattern** | Will it happen again if...? |

---

## Timeline

| Time | Event |
|------|-------|
| `HH:MM` | Incident started |
| `HH:MM` | Incident detected |
| `HH:MM` | Investigation began |
| `HH:MM` | Root cause identified |
| `HH:MM` | Fix applied |
| `HH:MM` | Verified resolved |

---

## Solution Implemented

### What Was Changed?
**File:** Path/to/file.md or file.js
**Change Type:** Code Change / Config Change / Process Change / Documentation Update

**Before:**
```
[Original problematic code/config]
```

**After:**
```
[Fixed code/config]
```

**Explanation:**
Why this fixes the problem in plain language.

### Why This Solution?
| Aspect | Value |
|--------|-------|
| **Tested** | Yes / No |
| **Rollback Easy** | Yes / No |
| **Repeatable** | Yes / No |
| **Permanent** | Yes / No (temporary fix only?) |

---

## Prevention & Detection

### How to Avoid This in Future?

**Immediate Actions (Do Now):**
- [ ] Action item 1
- [ ] Action item 2

**Long-Term Improvements:**
- [ ] Improvement 1
- [ ] Improvement 2

### Detection Strategy

If this happens again, look for:
1. Error message: `[Error text that will reappear]`
2. File pattern: `[Files that usually have this issue]`
3. Stage: `[Build / Deploy / Test]`
4. Action: `[If you see this, do this]`

### Documentation Updates Needed

| Document | Change | Why |
|----------|--------|-----|
| `path/to/doc.md` | Add warning about X | Prevent others from doing this |
| `Makefile` | Add check for Y | Catch this automatically |

---

## Key Learnings for AI Agents

**Remember:** When you see this error in the future:
- Error pattern: `[Exact error or similar]`
- Most likely cause: `[Root cause we found]`
- First thing to check: `[First debugging step]`
- Solution proven to work: `[The fix we applied]`

**Avoid:** Don't do XYZ without first checking ABC

**Pattern Recognition:** This error often appears when:
- Changing X without Y
- Using configuration Z wrong
- Missing step A before step B

---

## References & Related

- **Related Incident:** [INC-2026-001](./inc-2026-001) - Similar issue
- **Documentation:** [Link to relevant docs]
- **PR/Commit:** [GitHub link to fix]
- **External Resource:** [Stack Overflow / Blog post]

---

## Impact & Metrics

| Metric | Value |
|--------|-------|
| **Detection Time** | X minutes from occurrence |
| **Resolution Time** | Y hours/minutes |
| **Downtime Caused** | Z minutes |
| **User Impact** | None / N users / Deployment blocked |
| **Severity Justified** | Yes / No - should be raised/lowered |

---

*Template version: 2.0 | Optimized for AI analysis | Last updated: April 2026*