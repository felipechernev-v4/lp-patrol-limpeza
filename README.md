# Patrol limpeza contact form

This project includes a Vercel serverless endpoint that sends a contact form email using Resend.

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

## Form behavior

The page submits to `/api/contact` and remains on the same page with a success message after the request succeeds.

## Local validation

Run:

```bash
npm install
npx vercel dev
```

Then open the local preview and submit the form.
