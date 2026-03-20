# The Waves Water and Amusement Park Ticket Booking System

The Waves is a production-ready booking platform for a water and amusement park. It includes a complete customer journey from landing page and ticket booking to payment confirmation, ticket generation, QR verification, and admin monitoring.

## Live Website

https://www.thewaves.co.in

## Project Highlights

- High-converting landing page and marketing-focused website design
- Ticket booking flow with date-based pricing and same-day booking rules
- Cashfree payment integration
- Automatic ticket generation after successful payment
- QR-based ticket verification flow
- Admin dashboard with analytics, filters, visitor view, and order management
- Lunch, locker, and costume add-ons with quantity support

## Core Features

### Customer Side

- Responsive landing page and internal pages (About, Gallery, Contact, Legal pages)
- Ticket booking form with:
	- Adult and child ticket quantities
	- Visit date and day-type pricing (regular/sunday)
	- Add-ons: lunch, locker, costumes
	- Same-day cutoffs (ticket cutoff and lunch cutoff)
- Payment status screen for success/pending/failed/cancelled cases
- Downloadable ticket PDF for successful bookings

### Ticket and Verification

- Ticket generation tied to successful payment state
- Ticket ID issuance and status tracking
- QR code generation and verification URL support
- Redeem flow for on-site validation

### Admin Side

- Secure admin login session
- Dashboard metrics for revenue, orders, payment states, ticket status, redemptions
- Date-wise filtering (all/date/week/month/year and custom ranges)
- Visitors table by selected visit date
- Lunch count visibility for selected date
- Search and pagination for large order datasets

## Tech Stack

- Framework: Next.js 16 (App Router)
- UI: React 19 + Tailwind CSS 4
- Database and backend logic: Convex
- Payment gateway: Cashfree PG
- Charts: Chart.js + react-chartjs-2
- PDF generation: jsPDF

## Project Structure (Important Paths)

- App routes: `src/app`
- Reusable UI components: `src/components`
- Utility and integrations: `src/lib`
- Convex functions and schema: `convex`
- Static assets: `public`

## Environment Variables

Create a `.env.local` file in the project root.

Required variables used by the app:

- `NEXT_PUBLIC_BASE_URL`
- `CONVEX_DEPLOYMENT_URL` (or `NEXT_PUBLIC_CONVEX_URL`)
- `CONVEX_HTTP_ACTIONS_URL`
- `CASHFREE_APP_ID`
- `CASHFREE_SECRET_KEY`
- `CASHFREE_ENV` (`sandbox` or `production`)

Notes:

- `CASHFREE_ENV` decides Cashfree mode explicitly.
- If `CASHFREE_ENV` is missing, mode is auto-detected from credential text.

## Local Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

Start production server locally:

```bash
npm run start
```

Lint project:

```bash
npm run lint
```

## Convex Setup

Deploy Convex functions and schema:

```bash
npx convex deploy
```

Ensure Convex URLs in `.env.local` are set correctly for your environment.

## Security and Production Notes

- Admin credentials are currently defined in `src/lib/adminAuth.js`; move these to environment variables for stronger production security.
- Keep all Cashfree and Convex credentials private.
- Use production-only keys on production deployments.

## Dependency Security Note

This project uses an npm override for `axios` to avoid vulnerable transitive versions:

```json
"overrides": {
	"axios": "^1.6.0"
}
```

## License

Proprietary project for The Waves Water and Amusement Park.
