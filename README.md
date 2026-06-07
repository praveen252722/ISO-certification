# ISO Certification Management System

A modern full-stack ISO Certification Management Platform for certification authorities, auditors, companies, and public certificate verification.

## Stack

- Frontend: Next.js 16 App Router, TypeScript, Tailwind CSS, Shadcn-style UI, Recharts
- Backend: Node.js, Express.js, MongoDB Atlas, Mongoose
- Auth: JWT, bcrypt, role based access control
- Files: Cloudinary-ready upload service
- PDF: Puppeteer/pdf-lib-ready certificate generation service
- Automation: WhatsApp provider abstraction for renewal, audit, certificate, and payment messages
- AI: OpenAI service abstraction for audit summaries, compliance suggestions, chat, and reports

## Project Layout

```txt
frontend/   Next.js SaaS public website and dashboards
backend/    Express REST API, MVC structure, Mongoose models
docs/       API documentation and deployment notes
```

## Quick Start

```bash
npm install
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
npm run dev
```

Frontend: http://localhost:3000  
Backend: http://localhost:5000/api/v1/health

## Demo Accounts

The frontend includes local demo data for UI exploration. Backend seed data can be created with:

```bash
npm run seed
```


## Production Notes

- Configure MongoDB Atlas, Cloudinary, JWT secrets, OpenAI, SMTP, and WhatsApp provider credentials.
- Set strict CORS origins for production.
- Run behind HTTPS.
- Rotate secrets and use managed environment variables on your hosting platform.
