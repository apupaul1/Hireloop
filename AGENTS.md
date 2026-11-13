<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# hireloop

Next.js 16 App Router frontend (React 19, Turbopack, Tailwind v4). npm only (`package-lock.json`).

## Commands

```bash
npm run dev              # dev server, http://localhost:3000
npm run lint             # runs `eslint` directly (flat config), not `next lint`
npx tsc --noEmit         # typecheck — there is no `typecheck` script
npm run build && npm start
```

Verify in this order: `npm run lint` → `npx tsc --noEmit` → `npm run build`. No test runner or test files exist; don't invent one.

## Known breakage

Both verification commands fail on `main` for reasons unrelated to your change — check the specific error before assuming you broke something:

- `npx tsc --noEmit`: `src/app/login/page.tsx` imports a nonexistent `@/components/login-form`, so `next build` fails too. The working auth routes are `/signin` and `/signup` in `src/app/(auth)/`. `src/components/browse/ApplyNowButton.tsx` also pushes to a nonexistent `/sign-in`.
- `npm run lint`: `src/hooks/use-mobile.ts:14` trips `react-hooks/set-state-in-effect` (generated shadcn hook). Fix the hook itself rather than disabling the rule.

## Setup and auth

- `.env` (gitignored) needs `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URI`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `NEXT_PUBLIC_API_BASE_URL`.
- better-auth + MongoDB adapter writing straight to the `hireloopDB` database — no ORM, no migrations, schemas are implicit. Handler: `src/app/api/auth/[...all]/route.ts`.
- `role` (`"seeker" | "recruiter" | "admin"`) is a better-auth `additionalFields` entry (default `"seeker"`), selected at signup and read as `session.user.role`.

## How the app is wired

- `src/lib/api/*` — read helpers called from Server Components (`fetch(..., { cache: "no-store" })`).
- `src/lib/actions/*` — `"use server"` mutation helpers called from client components.
- `src/lib/core/server.ts` — `getSession()` server helper. `checkout/page.tsx` is the only server-side guard: it redirects guests to `/signin`, sends admins away, and derives the purchasable plan from `session.user.role`. Every other page gates only on client `useSession`, so those role checks are presentational.
- `src/lib/checkout.ts` — one-time pass catalog plus `chargeOnce()`, which stubs the charge locally; no payment provider is wired yet.
- No client cache layer (no React Query/SWR): mutations call `router.refresh()` / `router.push()` to refetch.
- Browse filters are URL-driven via `search`, `jobType`, `category`, `isRemote`, `sortBy`; `browse-jobs/page.tsx` forwards the whole query string to the API.

## UI conventions

- `@/*` → `src/*`.
- shadcn/ui `base-nova` style on `@base-ui/react`, **not Radix**: compose triggers with the `render={<Link ... />}` prop, not `asChild`. Add components with `npx shadcn@latest add <name>` (`components.json`).
- Import `cn` from `"cn"` (or `@/lib/utils`, which re-exports it), not `clsx` + `tailwind-merge`.
- Tailwind v4 is CSS-first: no `tailwind.config.*`. Theme tokens live in `src/app/globals.css` (`@theme inline`) and CSS is processed by the `@tailwindcss/turbopack` loader declared in `next.config.ts`.
- Next 16: `params` and `searchParams` are Promises; await them. Types come from generated globals such as `LayoutProps<"/">` and `PageProps`.
- Public pages support light/dark, but `src/app/dashboard/layout.tsx` hardcodes `bg-[#0E0E11]` and dashboard components are styled white-on-dark — don't add light-mode variants there.
- Toasts: import the shared `toast` manager from `@/components/ui/toast`; `<Toaster />` is mounted in the root layout. Icons come from `lucide-react`.
