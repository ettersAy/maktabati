---
title: Setup Guide
description: Step-by-step guide to set up Moussawer locally
---

# Setup Guide

Complete step-by-step guide to set up Moussawer for local development.

---

## Prerequisites

Before starting, ensure you have:

| Requirement | Version | How to Check |
|-------------|---------|--------------|
| **Docker** | v24.x+ | `docker --version` |
| **Git** | v2.40+ | `git --version` |
| **Node.js** | v24.x+ | `node --version` |
| **npm** | v10.x+ | `npm --version` |

---

## Step 1: Clone Repository

```bash
# Navigate to your projects directory
cd ~/projects

# Clone the repository
git clone git@github.com:ettersAy/moussawer.git

# Enter the project directory
cd moussawer
```

---

## Step 2: Install Dependencies

```bash
# Install PHP dependencies (via Sail)
./vendor/bin/sail composer install

# Install Node.js dependencies
./vendor/bin/sail npm install
```

---

## Step 3: Configure Environment

```bash
# Copy environment file
cp .env.example .env

# Generate application key
./vendor/bin/sail artisan key:generate
```

Edit `.env` if needed:

```env
APP_NAME=Moussawer
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost

DB_HOST=mysql
DB_DATABASE=moussawer
DB_USERNAME=sail
DB_PASSWORD=password
```

---

## Step 4: Start Containers

```bash
# Start all Docker containers
./vendor/bin/sail up -d

# Check container status
./vendor/bin/sail ps
```

**Expected Output:**
```
NAME              STATUS    PORTS
moussawer-laravel   Up        80/tcp
moussawer-mysql     Up        3306/tcp
moussawer-mailhog   Up        8025/tcp
```

---

## Step 5: Run Migrations

```bash
# Run database migrations
./vendor/bin/sail artisan migrate

# (Optional) Seed database with test data
./vendor/bin/sail artisan db:seed
```

---

## Step 6: Start Frontend Dev Server

```bash
# Start Vite dev server
./vendor/bin/sail npm run dev
```

---

## Step 7: Access the Application

| Service | URL | Credentials |
|---------|-----|-------------|
| **Main App** | `http://localhost` | - |
| **Adminer (DB)** | `http://localhost:8080` | sail/password |
| **Mailhog (Email)** | `http://localhost:8025` | - |

---

## Step 8: Create First User (Optional)

```bash
# Create admin user via tinker
./vendor/bin/sail artisan tinker

>>> User::create([
>>>   'name' => 'Admin',
>>>   'email' => 'admin@moussawer.com',
>>>   'password' => bcrypt('password'),
>>>   'role' => \App\Enums\UserRole::ADMIN
>>> ]);
```

---

## Common Issues & Solutions

### Issue: Port Already in Use

```bash
# Check what's using port 80
sudo lsof -i :80

# Stop conflicting service or change port in .env
APP_PORT=8080
```

### Issue: Permission Denied

```bash
# Fix ownership
sudo chown -R $USER:$USER .

# Or run Sail with sudo (not recommended)
sudo ./vendor/bin/sail up
```

### Issue: Container Won't Start

```bash
# Stop all containers
./vendor/bin/sail down

# Remove volumes (WARNING: deletes data)
./vendor/bin/sail down -v

# Rebuild containers
./vendor/bin/sail build --no-cache
./vendor/bin/sail up -d
```

### Issue: npm Dependencies Fail

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
./vendor/bin/sail npm install
```

---

## Development Commands

| Command | Description |
|---------|-------------|
| `./vendor/bin/sail up` | Start all containers |
| `./vendor/bin/sail down` | Stop all containers |
| `./vendor/bin/sail artisan` | Run Artisan commands |
| `./vendor/bin/sail npm run dev` | Start frontend dev server |
| `./vendor/bin/sail npm run build` | Build for production |
| `./vendor/bin/sail test` | Run PHPUnit tests |
| `npx playwright test` | Run E2E tests |
| `./vendor/bin/sail logs` | View container logs |

---

## Project Structure Quick Reference

```
moussawer/
├── app/                    # Laravel application code
├── resources/js/           # Vue 3 frontend code
├── routes/                 # Route definitions
├── database/               # Migrations & seeds
├── tests/                  # PHPUnit tests
├── e2e/                    # Playwright E2E tests
└── docker/                 # Docker configuration
```

---

## Next Steps

After setup:

1. ✅ Read [Architecture](./architecture) - Understand the system design
2. ✅ Read [API Reference](./api-reference) - Learn available endpoints
3. ✅ Read [Workflows](./workflows) - Development best practices
4. ✅ Run E2E tests - Verify everything works

---

## Related Documentation

- [Architecture](./architecture) - System architecture
- [Tech Stack](./tech-stack) - Technology breakdown
- [API Reference](./api-reference) - API endpoints
- [Workflows](./workflows) - Development workflows

---

*Last updated: April 2026*