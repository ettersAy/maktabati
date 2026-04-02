---
title: Moussawer Platform
description: Professional photography management platform connecting clients and photographers
---

# Moussawer Platform

Moussawer (مصور - "Photographer" in Arabic) is a professional photography booking and management platform designed for Photographers, Clients, and Administrators.

## Quick Overview

| Question | Answer |
|----------|--------|
| **What is it?** | Photography booking & management platform |
| **Backend** | Laravel 13 (API-First) |
| **Frontend** | Vue 3.5 (Composition API) |
| **Database** | MySQL 8.4 |
| **DevOps** | Docker (Laravel Sail) |
| **Testing** | Playwright (E2E) |

## Live Links

- **Repository**: [github.com/ettersAy/moussawer](https://github.com/ettersAy/moussawer)
- **Documentation**: [ettersAy.github.io/maktabati/projects/moussawer/](https://ettersAy.github.io/maktabati/projects/moussawer/)

## Documentation

- [Architecture](./architecture) - Complete system architecture
- [Tech Stack](./tech-stack) - Technology breakdown
- [Setup Guide](./setup-guide) - Local development setup
- [API Reference](./api-reference) - API endpoints documentation
- [Workflows](./workflows) - Development workflows

---

## For Visitors Asking "What is Moussawer?"

**Short Answer:**
> "It's a photography booking platform built with Laravel 13 and Vue 3. It connects clients with photographers for event bookings, with role-based access for Admins, Photographers, and Clients."

**Detailed Answer:**
> "Moussawer is an API-first platform using Laravel 13 for the backend (JSON responses only) and Vue 3.5 with Composition API for the frontend. It runs in Docker containers via Laravel Sail, with MySQL 8.4 for data storage. The architecture follows SOLID principles with strict separation of concerns."

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Role-Based Access** | Admin, Photographer, Client roles with policies |
| **API-First** | All backend responses are JSON |
| **Security** | Form Requests, API Resources, Policies |
| **E2E Testing** | Playwright for end-to-end tests |
| **Docker Native** | Full stack in containers (Sail) |

---

## Quick Start

```bash
# Clone the repository
git clone git@github.com:ettersAy/moussawer.git
cd moussawer

# Start all containers
./vendor/bin/sail up

# Access the app
# http://localhost
# Adminer: http://localhost:8080
```

---

## Related Documentation

- [Maktabati Platform](/projects/maktabati/) - This documentation site
- [Workflows](/workflows/) - Development processes
- [Docker Guide](/guides/docker/) - Docker & Sail configuration

---

*Last updated: April 2026*