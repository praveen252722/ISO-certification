# API Documentation

Base URL: `/api/v1`

## Authentication

| Method | Endpoint | Roles | Description |
| --- | --- | --- | --- |
| POST | `/auth/register` | Public | Create a client account |
| POST | `/auth/login` | Public | Login and receive JWT |
| POST | `/auth/forgot-password` | Public | Request reset link |
| POST | `/auth/reset-password` | Public | Reset password |
| GET | `/auth/me` | Authenticated | Current user profile |

## Applications

| Method | Endpoint | Roles | Description |
| --- | --- | --- | --- |
| GET | `/applications` | Auditor | List applications with pagination/search |
| POST | `/applications` | Client | Submit ISO application |
| GET | `/applications/:id` | Owner, Auditor | Application detail |
| PATCH | `/applications/:id/status` | Auditor | Approve, reject, or request changes |

## Certificates

| Method | Endpoint | Roles | Description |
| --- | --- | --- | --- |
| GET | `/certificates` | Auditor | List certificates |
| POST | `/certificates` | Auditor | Generate certificate |
| GET | `/certificates/verify/:certificateNumber` | Public | Verify certificate |
| GET | `/certificates/:id/download` | Owner, Auditor | Download certificate PDF |

## Audits

| Method | Endpoint | Roles | Description |
| --- | --- | --- | --- |
| GET | `/audits` | Auditor | List audits |
| POST | `/audits` | Auditor | Schedule audit |
| PATCH | `/audits/:id` | Auditor | Update audit |
| POST | `/audits/:id/summary` | Auditor | Generate AI audit summary |

## Analytics

| Method | Endpoint | Roles | Description |
| --- | --- | --- | --- |
| GET | `/analytics/overview` | Auditor | KPIs and chart data |
| GET | `/reports/revenue` | Auditor | Revenue report |
| GET | `/reports/clients` | Auditor | Client report |
| GET | `/reports/audits` | Auditor | Audit report |

## Notifications

| Method | Endpoint | Roles | Description |
| --- | --- | --- | --- |
| GET | `/notifications` | Authenticated | List notifications |
| POST | `/notifications` | Auditor | Send in-app, email, or WhatsApp notification |
| PATCH | `/notifications/:id/read` | Authenticated | Mark read |

## Projects

| Method | Endpoint | Roles | Description |
| --- | --- | --- | --- |
| GET | `/projects` | Public | Published project showcase images and details |
