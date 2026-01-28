# Samar Annapurna Hotel – Website

A single-page site for **Samar Annapurna Hotel** (Annapurna Guest House, Samar), a family-run lodge in Samar, Chhusang 33100, Mustang, Nepal.

## Stack

- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, React Router v6, Framer Motion, React Hook Form + Zod, React Helmet Async, react-leaflet (OpenStreetMap)
- **Backend:** Vercel serverless API (`/api/reserve`) – Node.js + Nodemailer, no database

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables (reservation emails)

Create `.env.local` in the project root (and/or set in Vercel → Project → Settings → Environment Variables):

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
RECEIVER_EMAIL=samarannapurna@gmail.com
```

- **Gmail:** use an [App Password](https://support.google.com/accounts/answer/185833), not your normal password.
- `RECEIVER_EMAIL` is where reservation requests are sent (e.g. `samarannapurna@gmail.com`).

### 3. Run locally

**Frontend only (form will 404 on submit until API is available):**

```bash
npm run dev
```

**Frontend + API (reservation form works):**

```bash
npx vercel dev
```

Then open the URL shown (e.g. `http://localhost:3000`). The form posts to `/api/reserve`; with `vercel dev` that hits the serverless function.

### 4. Build

```bash
npm run build
```

### 5. Deploy to Vercel (ready to host)

The project is set up for Vercel:

- **`vercel.json`** – Build uses `npm run build`, output is `dist`, framework is Vite. Rewrites send `/api/*` to the serverless function and all other routes to `index.html` (SPA). CORS headers are set for `/api/*`.
- **Env vars** – In Vercel: **Project → Settings → Environment Variables**, add the variables from `.env.example` (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `RECEIVER_EMAIL`) so the reservation form can send emails.

**Deploy:**

1. Push the repo to GitHub/GitLab/Bitbucket and [import the project in Vercel](https://vercel.com/new), or
2. From the project root: `npx vercel` (first time), then `npx vercel --prod` for production.

The site is static; `/api/reserve` runs as a Vercel serverless function.

## Project structure

```
├── api/
│   └── reserve.js          # Serverless: POST /api/reserve → Nodemailer
├── public/
├── src/
│   ├── components/         # Layout, Navbar, Footer
│   ├── sections/          # Hero, About, Rooms, Gallery, Experiences, LocationMap, ReservationForm, Contact
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vercel.json
├── .env.example
└── package.json
```

## Features

- **Hero:** Full-width Mustang imagery, “Escape to Serenity”, Reserve / Discover CTAs
- **About:** Family story, sustainability, ratings, travel blog mentions
- **Rooms:** Grid of 6 room types with images and “Price: based on contact”
- **Gallery:** Masonry-style grid, lightbox on click
- **Experiences:** Icons + cards (peaks, birds, caves, streams, monasteries, stargazing, food)
- **Location / Map:** OpenStreetMap (react-leaflet), marker at 28.961689, 83.801398 (Samar, Chhusang)
- **Reservation form:** Name, email, phone, check-in/out, adults/children, room type, rooms, special requests; validation with Zod; POST to `/api/reserve`; Nodemailer sends to `RECEIVER_EMAIL`
- **Contact:** Email, phone/WhatsApp, location, social placeholders
- **UI:** Sticky navbar, mobile menu, earthy palette (terracotta, beige, deep blue, saffron), smooth scroll, Framer Motion animations

## Licence

Private / project use. Replace placeholders (images, phone, social links, canonical URL) as needed.
