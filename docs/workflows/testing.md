# Testing Strategy

## Overview

This document covers testing approaches for the Maktabati static documentation site. As a personal project, testing focuses on learning best practices while keeping overhead minimal.

## Testing Equivalents

### PHPUnit Equivalent?
**No direct equivalent needed.** PHPUnit is for PHP backend testing. This is a static site with no server-side logic, so unit testing frameworks like Jest or Vitest would be more appropriate if we had JavaScript components.

### Playwright Equivalent?
**Yes, Playwright itself can be used.** Playwright is an E2E testing tool that works perfectly for static sites. However, for a personal documentation site, E2E testing might be overkill.

### Is Testing Worth It?
**For learning: Yes. For this project: Maybe not.** 
- **Pros:** Learn testing best practices, catch broken links, ensure navigation works
- **Cons:** Adds complexity to a simple docs site, time better spent on content

**Recommendation:** Implement basic Playwright setup for learning, but keep it minimal.

## Implementation

### Install Playwright

```bash
npm install -D @playwright/test
npx playwright install
```

### Basic Test Structure

Create `tests/e2e/` directory:

```
tests/
└── e2e/
    ├── basic-navigation.spec.js
    └── playwright.config.js
```

### Example Test

```javascript
// tests/e2e/basic-navigation.spec.js
import { test, expect } from '@playwright/test';

test('homepage loads and navigation works', async ({ page }) => {
  await page.goto('http://localhost:4173/maktabati/');
  
  // Check title
  await expect(page).toHaveTitle(/Maktabati/);
  
  // Check navigation links exist
  await expect(page.locator('nav a:has-text("Projects")')).toBeVisible();
  await expect(page.locator('nav a:has-text("Workflows")')).toBeVisible();
  
  // Test a navigation click
  await page.click('nav a:has-text("Projects")');
  await expect(page).toHaveURL(/.*projects/);
});
```

### Run Tests

```bash
# Run quick E2E suite and stop on the first failure
make e2e

# Run the full E2E suite even if there are failures
make e2e-f

# Open Playwright UI mode
make e2e-ui

# Show the last generated HTML report
make e2e-report
```

If you prefer direct Playwright commands:

```bash
npx playwright test --max-failures=1
npx playwright test --ui
npx playwright show-report
```

## Senior Tester Organization

### Test Checklists

Senior testers often use **pre-deployment checklists** to ensure quality. Here's a checklist for this project:

### Pre-Push Checklist

**Before every `git push`:**

- [ ] **Build succeeds:** `npm run docs:build` completes without errors
- [ ] **Local preview works:** `npm run docs:preview` loads correctly
- [ ] **Links work:** Click through main navigation manually
- [ ] **Mobile view:** Test on mobile/responsive view
- [ ] **Dead links:** Check for broken internal/external links
- [ ] **Content accuracy:** Verify information is current and correct

### Pre-Deploy Checklist

**Before major updates:**

- [ ] All pre-push checks pass
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Check console for errors/warnings
- [ ] Verify GitHub Actions build passes
- [ ] Backup current working version
- [ ] Update version/changelog if needed

### Test Documentation Structure

```
docs/
├── workflows/
│   ├── testing.md           # This file
│   └── test-results/        # Optional: manual test logs
│       ├── 2026-04-01.md
│       └── 2026-04-02.md
```

### Common Practices

**For personal projects:**
- Keep checklists simple (5-10 items)
- Document test results manually
- Use automation only for repetitive tasks
- Focus on critical user paths

**Senior practices to learn:**
- Test plans with acceptance criteria
- Regression testing checklists
- Automated smoke tests
- Bug tracking with severity levels

## Test Organization

### Manual Testing
- Use checklists for consistency
- Document issues found
- Track fixes over time

### Automated Testing
- Build verification (CI/CD)
- Link checking (if implemented)
- Basic E2E for critical flows

### Test Data
- Use realistic content for testing
- Test edge cases (empty pages, long titles)
- Verify on different screen sizes

## When to Test

- **Daily:** Quick build check
- **Before push:** Full checklist
- **Major changes:** Complete review
- **New features:** Feature-specific tests

## Tools for Learning

- **Playwright:** E2E testing
- **Jest:** Unit testing (if adding JS)
- **Lighthouse:** Performance auditing
- **Manual checklists:** For comprehensive coverage

## Conclusion

For this personal docs project, focus on manual checklists and basic automation. Use testing as a learning opportunity rather than strict requirement. The goal is reliable documentation, not complex software testing.
