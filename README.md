# Patrol limpeza contact form

This project includes a Vercel serverless endpoint that sends contact form submissions to Make and sends a notification email using Resend.

## Setup

1. Install dependencies:

   npm install

2. Copy `.env.example` to `.env` and fill in your keys:

   cp .env.example .env

3. In Vercel project settings, add the same variables as environment variables.

## Environment variables

- `RESEND_API_KEY`
- `RESEND_TO_EMAIL`
- `RESEND_FROM_EMAIL`
- `MAKE_WEBHOOK_URL` — the complete webhook URL created by the Make custom webhook.

## Form behavior

The Patrol quote form posts to `/api/contact`, which forwards the validated fields (`name`, `email`, `whatsapp`, `company`, `cnpj`, and `message`) to Make and sends the notification email. The webhook URL stays on the server and is not exposed in the browser. The form remains on the same page with a success or error message.

In Vercel, add `MAKE_WEBHOOK_URL` under **Project Settings → Environment Variables** with the complete URL copied from the Make custom webhook. Keep the Make scenario active, then redeploy the site so the new environment variable is available.

## Local validation

Run:

```bash
npm install
npx vercel dev
```

Then open the local preview and submit the form.
