---
title: System Architecture
description: Complete breakdown of Moussawer system architecture and design patterns
---

# System Architecture

Complete technical architecture of the Moussawer platform following SOLID principles.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    MOUSSAWER ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐    │
│  │   Vue 3.5    │────▶│  Laravel 13  │────▶│   MySQL 8.4  │    │
│  │  Frontend    │◀────│  API (JSON)  │◀────│   Database   │    │
│  └──────────────┘     └──────────────┘     └──────────────┘    │
│         │                    │                                   │
│         ▼                    ▼                                   │
│  ┌──────────────┐     ┌──────────────┐                         │
│  │   Pinia      │     │   Docker     │                         │
│  │   Store      │     │   (Sail)     │                         │
│  └──────────────┘     └──────────────┘                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Backend Architecture (Laravel 13)

### Directory Structure

```
app/
├── Enums/                      # Type-safe enums
│   └── UserRole.php            # Admin, Photographer, Client
│
├── Http/
│   ├── Controllers/
│   │   └── Api/
│   │       ├── Public/         # Public endpoints
│   │       ├── Admin/          # Admin-only endpoints
│   │       ├── Photographer/   # Photographer endpoints
│   │       └── Client/         # Client endpoints
│   │
│   ├── Requests/               # Validation & sanitization
│   │   └── StoreContactRequest.php
│   │
│   └── Resources/              # Data transformation
│       └── ContactSubmissionResource.php
│
├── Models/                     # Eloquent entities
│   ├── User.php
│   └── ContactSubmission.php
│
├── Policies/                   # Authorization rules
│   └── ContactSubmissionPolicy.php
│
└── Services/                   # Business logic layer
    ├── ContactService.php
    └── PhotographerService.php

routes/
├── api.php                     # API endpoints
├── web.php                     # SPA catch-all
└── console.php                 # Artisan commands
```

### SOLID Principles Implementation

| Principle | Implementation |
|-----------|----------------|
| **Single Responsibility** | Controllers handle HTTP, Services handle logic |
| **Open/Closed** | Enums and interfaces for extensibility |
| **Liskov Substitution** | Consistent interface contracts |
| **Interface Segregation** | Role-specific controllers |
| **Dependency Inversion** | Service injection in controllers |

---

## Frontend Architecture (Vue 3.5)

### Directory Structure

```
resources/js/
├── app.js                      # Entry point
├── App.vue                     # Root component
├── bootstrap.js
│
├── components/                 # Reusable UI components
│   ├── admin/                  # Admin-specific components
│   ├── client/                 # Client-specific components
│   ├── photographer/           # Photographer components
│   ├── forms/                  # Form components
│   └── shared/                 # Shared components
│       └── Navbar.vue
│
├── composables/                # Shared reactive logic
│
├── layouts/                    # Layout shells
│   ├── AdminLayout.vue
│   ├── ClientLayout.vue
│   ├── PhotographerLayout.vue
│   ├── PublicLayout.vue
│   └── BaseLayoutDispatcher.vue
│
├── router/                     # Route definitions & guards
│   └── index.js
│
├── services/                   # API abstraction (Axios)
│
├── stores/                     # Global state (Pinia)
│
└── views/                      # Page components
    ├── admin/
    │   └── DashboardView.vue
    ├── client/
    │   └── DashboardView.vue
    ├── photographer/
    │   └── DashboardView.vue
    └── public/
        ├── HomeView.vue
        └── ContactView.vue
```

### Role-Based Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND ROLE STRUCTURE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Admin     │    │ Photographer│    │    Client   │         │
│  │   Layout    │    │   Layout    │    │   Layout    │         │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘         │
│         │                  │                  │                 │
│         ▼                  ▼                  ▼                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Admin     │    │ Photographer│    │    Client   │         │
│  │   Views     │    │   Views     │    │   Views     │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Shared Components & Composables             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## User Roles (Enum)

```php
// app/Enums/UserRole.php

enum UserRole: string
{
    case ADMIN = 'admin';
    case PHOTOGRAPHER = 'photographer';
    case CLIENT = 'client';
    
    public function label(): string
    {
        return match($this) {
            self::ADMIN => 'Administrator',
            self::PHOTOGRAPHER => 'Photographer',
            self::CLIENT => 'Client',
        };
    }
}
```

| Role | Permissions | Access Level |
|------|-------------|--------------|
| **Admin** | Full system access | All endpoints |
| **Photographer** | Manage portfolio, bookings | Photographer endpoints |
| **Client** | Browse, book photographers | Client endpoints |

---
## Security Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Layer 1: Validation                                             │
│  └─ Form Requests (app/Http/Requests/)                          │
│     └─ RFC+DNS email validation, custom messages                │
│                                                                  │
│  Layer 2: Data Transformation                                    │
│  └─ API Resources (app/Http/Resources/)                         │
│     └─ Never expose raw DB models                               │
│                                                                  │
│  Layer 3: Authorization                                          │
│  └─ Policies (app/Policies/)                                    │
│     └─ Can User X do Action Y?                                  │
│                                                                  │
│  Layer 4: Authentication                                         │
│  └─ Laravel Sanctum                                             │
│     └─ Token-based API auth                                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Database Schema

### Core Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `users` | User accounts | id, name, email, role, password |
| `contact_submissions` | Contact form data | id, name, email, message, status |
| `photographers` | Photographer profiles | id, user_id, bio, portfolio, pricing |
| `bookings` | Booking records | id, client_id, photographer_id, date, status |
| `reviews` | Client reviews | id, booking_id, rating, comment |

---

## API Response Format

All API responses follow consistent JSON structure:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "Operation successful"
}
```

Error responses:

```json
{
  "success": false,
  "errors": {
    "email": ["The email field is required."]
  },
  "message": "Validation failed"
}
```

---

## Related Documentation

- [Tech Stack](./tech-stack) - Technology breakdown
- [Setup Guide](./setup-guide) - Local development setup
- [API Reference](./api-reference) - API endpoints
- [Workflows](./workflows) - Development workflows

---

*Last updated: April 2026*
