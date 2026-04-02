---
title: Development Workflows
description: Git, testing, and deployment workflows for Moussawer
---

# Development Workflows

Git strategy, testing, and deployment workflows for Moussawer.

---

## Git Workflow

### Branch Naming Convention

```
feature/feature-name      # New features
fix/bug-description       # Bug fixes
hotfix/critical-fix       # Production hotfixes
release/v1.0.0            # Release branches
```

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code refactoring
- `test` - Tests
- `chore` - Maintenance

**Examples:**
```bash
git commit -m "feat(auth): add user login endpoint"
git commit -m "fix(api): resolve contact form validation"
git commit -m "docs: update API reference"
```

---

## Development Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT WORKFLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Create Feature Branch                                        │
│     └─ git checkout -b feature/new-feature                       │
│                                                                  │
│  2. Write Code                                                   │
│     └─ Follow SOLID principles                                   │
│     └─ Write tests alongside                                     │
│                                                                  │
│  3. Run Tests Locally                                            │
│     └─ ./vendor/bin/sail test (PHPUnit)                          │
│     └─ npx playwright test (E2E)                                 │
│                                                                  │
│  4. Commit Changes                                               │
│     └─ git add .                                                 │
│     └─ git commit -m "feat: description"                         │
│                                                                  │
│  5. Push & Create PR                                             │
│     └─ git push origin feature/new-feature                       │
│     └─ Create Pull Request on GitHub                             │
│                                                                  │
│  6. Code Review                                                  │
│     └─ Address review comments                                   │
│     └─ Get approval                                              │
│                                                                  │
│  7. Merge & Deploy                                               │
│     └─ Merge to main                                             │
│     └─ Auto-deploy via CI/CD                                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Testing Workflow

### PHPUnit (Backend)

```bash
# Run all tests
./vendor/bin/sail test

# Run specific test
./vendor/bin/sail test --filter ContactFormTest

# Run with coverage
./vendor/bin/sail test --coverage
```

### Playwright (E2E)

```bash
# Run all E2E tests
npx playwright test

# Run with UI
npx playwright test --ui

# Run specific test
npx playwright test contact-form.spec.js

# Run in headed mode (see browser)
npx playwright test --headed
```

### Test File Structure

```
tests/
├── Feature/              # Feature tests
│   └── ContactFormTest.php
└── Unit/                 # Unit tests
    └── UserRoleTest.php

e2e/
├── contact-form.spec.js  # E2E tests
├── fixtures/             # Test data
└── models/               # Page Object Models
```

---

## Code Quality

### PHP (Laravel)

```bash
# Format code with Pint
./vendor/bin/sail pint

# Run PHPStan
./vendor/bin/sail phpstan

# Run Laravel Pint (auto-fix)
./vendor/bin/sail pint --test
```

### JavaScript (Vue)

```bash
# Format with Prettier
npm run format

# Lint with ESLint
npm run lint
```

---

## Deployment Workflow

### Staging

```bash
# Deploy to staging
git push origin staging

# CI/CD runs:
# 1. Build Docker images
# 2. Run tests
# 3. Deploy to staging server
```

### Production

```bash
# Deploy to production
git push origin main

# CI/CD runs:
# 1. Build Docker images
# 2. Run all tests
# 3. Deploy to production server
# 4. Run migrations
# 5. Clear caches
```

---

## Environment Management

| Environment | URL | Branch | Auto-Deploy |
|-------------|-----|--------|-------------|
| **Local** | `localhost` | Any | Manual |
| **Staging** | `staging.moussawer.com` | `staging` | ✅ Yes |
| **Production** | `moussawer.com` | `main` | ✅ Yes |

---

## Security Checklist

Before deploying:

- [ ] All input validated via Form Requests
- [ ] API Resources used (no raw models exposed)
- [ ] Policies checked for authorization
- [ ] Environment variables secured
- [ ] Debug mode disabled (`APP_DEBUG=false`)
- [ ] HTTPS enabled
- [ ] Rate limiting configured
- [ ] Tests passing

---

## Monitoring

### Logs

```bash
# View Laravel logs
./vendor/bin/sail logs

# View specific container logs
./vendor/bin/sail logs laravel
./vendor/bin/sail logs mysql
```

### Error Tracking

- Laravel logs: `storage/logs/laravel.log`
- Frontend errors: Browser console
- E2E test failures: Playwright reports

---

## Related Documentation

- [Architecture](./architecture) - System architecture
- [Tech Stack](./tech-stack) - Technology breakdown
- [Setup Guide](./setup-guide) - Local development setup
- [API Reference](./api-reference) - API endpoints

---

*Last updated: April 2026*