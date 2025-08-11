# Center For Humane Technology

A modern web application built with [Next.js 15](https://nextjs.org/) and powered by [DatoCMS](https://www.datocms.com/) as a headless CMS. This project is designed for high performance, scalability, and easy content management, supporting static site generation, server-side rendering, and seamless integration with external services.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [External Services](#external-services)
- [Documentation](#documentation)
- [Best Practices & Notes](#best-practices--notes)

---

## Project Overview

This repository contains the source code for the Center For Humane Technology website. The site leverages Next.js for fast, SEO-friendly web pages and DatoCMS for flexible, user-friendly content management. The architecture supports modern web features such as Incremental Static Regeneration (ISR), API routes, and easy deployment to platforms like Vercel.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.x or higher  
  [Download Node.js](https://nodejs.org/)
- **Package Manager**: [pnpm](https://pnpm.io/) (recommended), or [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com/)
- **Git**: For cloning the repository

---

## Getting Started

Follow these steps to set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/HumaneWeb/center-for-humane-technology.git
   cd center-for-humane-technology
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**

   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Fill in the required values in your `.env` file (see [Environment Variables](#environment-variables) below).

4. **Run the development server:**

   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## Environment Variables

All environment variables are defined in `.env.example`. Copy this file to `.env` and provide your own values.

| Variable Name                           | Description                                                                                              |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN`   | **Required.** Read-only Content Delivery API token for DatoCMS. Used to fetch published content.         |
| `DATOCMS_DRAFT_CONTENT_CDA_TOKEN`       | **Required.** Read-only Content Delivery API token for DatoCMS. Used to fetch draft + published content. |
| `NEXT_DATOCMS_ENVIRONMENT`              | (Optional) Name of the DatoCMS environment to use (e.g., "main", "staging").                             |
| `NEXT_PUBLIC_DATOCMS_SITE_SEARCH_TOKEN` | Public token for enabling DatoCMS site search features.                                                  |
| `NEXT_PUBLIC_DATOCMS_BUILD_TRIGGER_ID`  | Public build trigger ID for DatoCMS (used for triggering builds or revalidation).                        |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`    | Stripe publishable key for client-side Stripe integration.                                               |
| `STRIPE_SECRET_KEY`                     | Stripe secret key for server-side Stripe operations.                                                     |
| `GOOGLE_OPTIMIZE_ID`                    | Google Optimize container ID for A/B testing and personalization.                                        |
| `GOOGLE_TAG_MANAGER_ID`                 | Google Tag Manager container ID for analytics and tag management.                                        |

> **Note:**  
> Never commit your `.env` file or share your API tokens publicly.

---

## Available Scripts

The following NPM scripts are available in `package.json`:

| Script   | Description                                               |
| -------- | --------------------------------------------------------- |
| `dev`    | Starts the Next.js development server (`localhost:3000`). |
| `build`  | Builds the application for production.                    |
| `start`  | Starts the production server after building.              |
| `lint`   | Runs ESLint to check for code quality issues.             |
| `test`   | Runs unit tests (if configured).                          |
| `deploy` | Deploys the app (usually handled by Vercel CI/CD).        |

Example usage:

```bash
pnpm dev
pnpm build
pnpm start
```

---

## Project Structure

```
/
├── app/                # Next.js App Router (pages, layouts, API routes)
├── components/         # Reusable React components
│   └── layout/         # Layout components (e.g., BasicHero)
├── lib/                # Utility functions, API clients, helpers
├── pages/              # (If used) Traditional Next.js Pages Router
├── public/             # Static assets (images, favicon, etc.)
├── styles/             # (if used) Global and component-level styles
├── .env.example        # Example environment variables
├── package.json        # Project metadata and scripts
└── README.md           # Project documentation
```

**Key Directories:**

- `/app`: Main application logic, routes, and layouts (Next.js 13+ App Router).
- `/components`: All UI and layout components.
- `/lib`: Utilities, API clients (e.g., DatoCMS fetchers), and helpers.
- `/pages`: (If present) Legacy Pages Router support.
- `/public`: Static files served at the root URL.
- `/styles`: CSS/SCSS files and Tailwind config (if used).

---

## External Services

- **[DatoCMS](https://www.datocms.com/):**  
  Used as the headless CMS for content management. Requires API tokens for fetching content.

- **[Stripe](https://stripe.com/):**  
  Used for payment processing. Requires both publishable and secret keys.

- **[Google Optimize](https://optimize.google.com/):**  
  Used for A/B testing and personalization (optional).

- **[Google Tag Manager](https://tagmanager.google.com/):**  
  Used for analytics and tag management (optional).

- **[Vercel](https://vercel.com/):**  
  Recommended for deployment. Handles serverless functions, ISR, and environment variables.

---

## Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [DatoCMS Documentation](https://www.datocms.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

## Best Practices & Notes

- **Incremental Static Regeneration (ISR):**  
  The project may use ISR for fast updates. Ensure any required secret tokens are set for secure webhook revalidation.

- **Webhooks:**  
  Set up DatoCMS webhooks to trigger revalidation on content changes.

- **API Routes:**  
  Use `/app/api` or `/pages/api` for serverless functions (e.g., preview, revalidate, Stripe webhooks).

- **Environment Variables:**  
  Never expose sensitive tokens in the client-side code. Only use `NEXT_PUBLIC_` variables in the browser.

- **Deployment:**  
  Vercel is recommended for seamless Next.js deployment and preview environments.

- **TypeScript:**  
  The project uses TypeScript for type safety and maintainability.

---
