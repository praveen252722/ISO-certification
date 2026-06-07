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
| GET | `/applications` | Admin, Super Admin, Auditor | List applications with pagination/search |
| POST | `/applications` | Client | Submit ISO application |
| GET | `/applications/:id` | Owner, Admin, Super Admin, Auditor | Application detail |
| PATCH | `/applications/:id/status` | Admin, Super Admin | Approve, reject, or request changes |

## Certificates

| Method | Endpoint | Roles | Description |
| --- | --- | --- | --- |
| GET | `/certificates` | Admin, Super Admin, Auditor | List certificates |
| POST | `/certificates` | Admin, Super Admin | Generate certificate |
| GET | `/certificates/verify/:certificateNumber` | Public | Verify certificate |
| GET | `/certificates/:id/download` | Owner, Admin, Super Admin | Download certificate PDF |

## Audits

| Method | Endpoint | Roles | Description |
| --- | --- | --- | --- |
| GET | `/audits` | Admin, Super Admin, Auditor | List audits |
| POST | `/audits` | Admin, Super Admin | Schedule audit |
| PATCH | `/audits/:id` | Admin, Super Admin, Auditor | Update audit |
| POST | `/audits/:id/summary` | Auditor, Admin, Super Admin | Generate AI audit summary |

## Analytics

| Method | Endpoint | Roles | Description |
| --- | --- | --- | --- |
| GET | `/analytics/overview` | Admin, Super Admin | KPIs and chart data |
| GET | `/reports/revenue` | Admin, Super Admin | Revenue report |
| GET | `/reports/clients` | Admin, Super Admin | Client report |
| GET | `/reports/audits` | Admin, Super Admin, Auditor | Audit report |

## Notifications

| Method | Endpoint | Roles | Description |
| --- | --- | --- | --- |
| GET | `/notifications` | Authenticated | List notifications |
| POST | `/notifications` | Admin, Super Admin | Send in-app, email, or WhatsApp notification |
| PATCH | `/notifications/:id/read` | Authenticated | Mark read |

## Projects CMS

| Method | Endpoint | Roles | Description |
| --- | --- | --- | --- |
| GET | `/projects` | Public | Published project showcase images and details |
| GET | `/projects/admin` | Admin, Super Admin | Admin list of all website project items |
| POST | `/projects` | Admin, Super Admin | Add image and project details |
| PATCH | `/projects/:id` | Admin, Super Admin | Update image, title, company, ISO type, and details |
| DELETE | `/projects/:id` | Admin, Super Admin | Delete a project item |
