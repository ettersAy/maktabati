---
title: API Reference
description: Complete API endpoint documentation for Moussawer
---

# API Reference

Complete API endpoint documentation for the Moussawer platform.

---

## Base URL

```
Local:  http://localhost/api
Prod:   https://moussawer.com/api
```

---

## Authentication

All protected endpoints require Bearer token authentication.

### Get Token (Login)

```http
POST /api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "1|abc123...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "user@example.com",
      "role": "client"
    }
  }
}
```

### Use Token

```http
GET /api/user
Authorization: Bearer 1|abc123...
```

---

## Public Endpoints

### Submit Contact Form

```http
POST /api/public/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I want to book a photographer"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I want to book a photographer",
    "status": "pending",
    "created_at": "2026-04-02T10:00:00Z"
  },
  "message": "Contact submission received"
}
```

**Response (422 - Validation Error):**
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

## Admin Endpoints

### Get All Contact Submissions

```http
GET /api/admin/contact-submissions
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "status": "pending",
      "created_at": "2026-04-02T10:00:00Z"
    }
  ]
}
```

### Delete Contact Submission

```http
DELETE /api/admin/contact-submissions/{id}
Authorization: Bearer {token}
```

**Response (204):** No content

---

## Photographer Endpoints

### Get Photographer Profile

```http
GET /api/photographer/profile
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": 1,
    "bio": "Professional photographer...",
    "portfolio": [...],
    "pricing": {
      "hourly": 100,
      "event": 500
    }
  }
}
```

### Update Photographer Profile

```http
PUT /api/photographer/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "bio": "Updated bio...",
  "pricing": {
    "hourly": 150,
    "event": 600
  }
}
```

---

## Client Endpoints

### Browse Photographers

```http
GET /api/client/photographers
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Jane Smith",
      "bio": "Professional photographer...",
      "rating": 4.8,
      "pricing": {
        "hourly": 100,
        "event": 500
      }
    }
  ]
}
```

### Create Booking

```http
POST /api/client/bookings
Authorization: Bearer {token}
Content-Type: application/json

{
  "photographer_id": 1,
  "date": "2026-05-01",
  "time": "14:00",
  "event_type": "wedding",
  "notes": "Outdoor ceremony"
}
```

---

## Error Responses

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Unauthenticated"
}
```

### 403 Forbidden

```json
{
  "success": false,
  "message": "This action is unauthorized"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 422 Validation Error

```json
{
  "success": false,
  "errors": {
    "field_name": ["Error message 1", "Error message 2"]
  },
  "message": "Validation failed"
}
```

### 500 Server Error

```json
{
  "success": false,
  "message": "Server error"
}
```

---

## Rate Limiting

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| Public | 60 requests | 1 minute |
| Authenticated | 120 requests | 1 minute |
| Admin | 200 requests | 1 minute |

---

## API Versioning

Current version: `v1` (implicit)

Future versions will use URL prefix: `/api/v2/`

---

## Related Documentation

- [Architecture](./architecture) - System architecture
- [Tech Stack](./tech-stack) - Technology breakdown
- [Setup Guide](./setup-guide) - Local development setup
- [Workflows](./workflows) - Development workflows

---

*Last updated: April 2026*