---
title: Incident Template
description: Blank template for documenting new incidents
---

# Incident Report Template

Copy this template when documenting a new incident.

---

## Incident Information

| Field | Value |
|-------|-------|
| **Incident ID** | `INC-YYYY-NNN` |
| **Date** | `YYYY-MM-DD` |
| **Project** | `Maktabati / Moussawer / Other` |
| **Status** | `🔴 Investigating / 🟡 Mitigated / ✅ Resolved` |
| **Severity** | `Critical / High / Medium / Low` |
| **Affected** | `What systems/users were impacted` |

---

## Summary

<!-- 2-3 sentence description of what happened -->

---

## Error Details

<!-- Paste error messages, logs, or screenshots -->

```bash
# Example error output
✖ rendering pages...
build error:
Cannot read properties of undefined (reading 'deployment')
```

---

## Root Cause

<!-- Explain what caused the issue -->

| Aspect | Details |
|--------|---------|
| **What** | What failed |
| **Why** | Why it failed |
| **Where** | Which file/component |
| **When** | When it was triggered |

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

## Solution

### Fix Applied

<!-- Describe the solution that worked -->

```yaml
# Example: Code change
# File: docs/guides/maktabati-setup.md
# Change: Added v-pre directive to code block
```

### Alternative Solutions

| Solution | Pros | Cons |
|----------|------|------|
| Solution 1 | Pro | Con |
| Solution 2 | Pro | Con |
| Solution 3 | Pro | Con |

---

## Prevention

### Checklist for Future

- [ ] Action item 1
- [ ] Action item 2
- [ ] Action item 3

### Documentation Updates

| File | Change |
|------|--------|
| `path/to/file.md` | Description of change |

---

## Lessons Learned

<!-- What should the team remember from this incident? -->

1. Lesson 1
2. Lesson 2
3. Lesson 3

---

## References

- [Link to relevant documentation](/path/to/doc)
- [External resource](https://example.com)
- [Related issue/PR](https://github.com/...)

---

## Metadata

| Role | Person |
|------|--------|
| **Reported by** | Name |
| **Resolved by** | Name |
| **Reviewed by** | Name |
| **Time to Resolution** | X hours/minutes |

---

*Template version: 1.0 | Last updated: April 2026*