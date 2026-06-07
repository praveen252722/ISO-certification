# Deployment Guide

## Frontend

Deploy `frontend/` to Vercel or any Node-compatible host.

Required environment:

```env
NEXT_PUBLIC_API_URL=https://api.example.com/api/v1
```

## Backend

Deploy `backend/` to Render, Railway, Fly.io, AWS, Azure, or a container platform.

Required environment:

```env
NODE_ENV=production
PORT=5000
CLIENT_URL=https://example.com
MONGODB_URI=mongodb+srv://...
JWT_SECRET=replace-with-strong-secret
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
OPENAI_API_KEY=
WHATSAPP_PROVIDER=twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
```

## Security Checklist

- Use HTTPS everywhere.
- Restrict CORS to production origins.
- Use strong JWT secrets.
- Enable MongoDB Atlas IP allow-listing or private networking.
- Store secrets in platform-managed environment variables.
- Keep upload type and size limits enabled.
- Use rate limiting on auth and public verification endpoints.
