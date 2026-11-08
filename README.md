# Taskly

A collaborative project management app built with Next.js 16 and Supabase. Teams can create projects, organize work into epics, manage tasks on a drag-and-drop Kanban board, invite members via email, and track progress on a weekly statistics dashboard.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Authentication](#authentication)
- [Core Concepts](#core-concepts)
- [Scripts](#scripts)

---

## Features

- **Authentication** — Sign up, log in with "Remember Me", forgot password / reset password flow. Sessions are managed with short-lived access tokens (1 hour) and optional long-lived refresh tokens (30 days) stored in `httpOnly` cookies.
- **Projects** — Create and edit projects with a name and description. Paginated project listing with infinite scroll.
- **Epics** — Group related tasks under a named epic with a deadline and assignee. Epics are scoped to a project.
- **Tasks** — Full Kanban board with 8 workflow statuses: `TO_DO`, `IN_PROGRESS`, `BLOCKED`, `IN_REVIEW`, `READY_FOR_QA`, `REOPENED`, `READY_FOR_PRODUCTION`, and `DONE`. Tasks support a title, description, due date, assignee, and optional epic link. Drag and drop between columns with [@dnd-kit/react](https://dndkit.com/). Each column loads tasks lazily via infinite scroll.
- **Members** — Invite collaborators to a project by email. Invitations are sent via a Supabase RPC and accepted through a token link.
- **Statistics** — Weekly planner dashboard with KPI tiles, a Recharts bar chart, and a per-project task count table. Filterable by date range, project, and task status.
- **Responsive** — Full mobile layout with a bottom navigation bar and floating action button.
- **Parallel routes & intercepting routes** — Task and epic detail modals intercept navigation so the board stays in view while a user reads or edits a record.

---

## Tech Stack

| Layer               | Technology                                                |
| ------------------- | --------------------------------------------------------- |
| Framework           | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| Language            | TypeScript 5                                              |
| Styling & UI        | Tailwind CSS 4 & (CVA + Tailwind Merge)                   |
| Backend / Auth / DB | [Supabase](https://supabase.com/) (REST API)              |
| Forms               | React Hook Form + Zod                                     |
| Drag & Drop         | @dnd-kit/react                                            |
| Charts              | Recharts                                                  |
| Date utilities      | date-fns                                                  |
| Toasts              | Sonner                                                    |
| Package manager     | pnpm 12                                                   |

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/                   # Auth route group
│   │   ├── login/
│   │   ├── sign-up/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   └── (dashboard)/              # Protected route group
│       ├── projects/
│       │   ├── (list)/           # /projects — project listing
│       │   └── [projectId]/
│       │       ├── @modal/       # Parallel route: intercepted modals
│       │       │   ├── (.)tasks/new/
│       │       │   ├── (.)tasks/view/[taskId]/
│       │       │   ├── (.)epics/view/[epicId]/
│       │       │   └── (.)members/invite/
│       │       ├── tasks/        # /projects/[id]/tasks — Kanban board
│       │       ├── epics/        # /projects/[id]/epics — epic list + new
│       │       ├── members/      # /projects/[id]/members — member list
│       │       └── edit/         # /projects/[id]/edit — project settings
│       └── statistics/           # /statistics — weekly planner
│
├── features/                     # Feature-sliced modules
│   ├── auth/
│   │   ├── actions/              # Server Actions: login, logout, signUp, resetPassword …
│   │   ├── components/           # LoginForm, SignUpForm, etc.
│   │   └── schemas/
│   ├── projects/
│   ├── epics/
│   ├── tasks/
│   ├── members/
│   └── statistics/
│
├── components/
│   ├── ui/                       # Button, Input, Field, Badge, Separator …
│   └── layouts/
│       └── dashboard/            # MainLayoutClient, MainSidebar, MainHeader …
│
├── hooks/                        # useInfiniteScroll, useSearch, useSidebar …
├── lib/
│   └── auth/
│       ├── session.ts            # Cookie helpers (access + refresh tokens)
│       └── authenticatedFetch.ts # Supabase REST wrapper
├── schemas/                      # Shared Zod response schemas
└── proxy.ts                      # Next.js proxy (route protection + token refresh)
```

Each feature folder follows the same layout:

```
features/<name>/
├── actions/     # Next.js Server Actions (data fetching + mutations)
├── components/  # React components specific to this feature
├── hooks/       # Client-side mutation hooks (React Hook Form + Server Action)
└── schemas/     # Zod schemas for form inputs and API responses
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- pnpm 12 (`npm install -g pnpm@12`)
- A Supabase project with the matching database schema applied

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/taskly.git
cd taskly

# 2. Install dependencies
pnpm install

# 3. Configure environment variables (see section below)
cp .env.example .env.local
# edit .env.local with your Supabase credentials

# 4. Start the development server
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create a `.env.local` file at the project root with the following keys:

```env
# Your Supabase project URL (found in Project Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co

# Service role key — keep this server-side only, never expose to the browser
SUPABASE_SECRET_KEY=<service_role_key>

# The public URL of your deployed app, used for invitation email links
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Note:** `SUPABASE_SECRET_KEY` is the service role key, not the anon key. It is used exclusively in Server Actions and proxy, and is never sent to the client.

---

## Authentication

Taskly uses Supabase Auth's password grant directly, without the Supabase JS client library. Token management is handled manually:

| Token               | Storage                                                | Lifetime                          |
| ------------------- | ------------------------------------------------------ | --------------------------------- |
| `access_token`      | `httpOnly` cookie                                      | 1 hour                            |
| `refresh_token`     | `httpOnly` cookie (only when "Remember Me" is checked) | 30 days                           |
| `temp_access_token` | `httpOnly` cookie                                      | 1 hour (password-reset flow only) |

**Token refresh** happens in the proxy (`src/proxy.ts`). When a request arrives for a protected route without a valid access token, the proxy attempts a silent refresh using the refresh token before redirecting to login.

**Protected routes:** `/projects`, `/invite`, `/statistics`

**Public routes:** `/`, `/login`, `/sign-up`, `/forgot-password`, `/reset-password`

---

## Core Concepts

### Kanban Board

The board (`TaskBoard`) renders one column per status. Each column independently paginates its tasks (10 per page) using an `IntersectionObserver` — the last card in a column triggers the next page load. The `useTaskBoard` hook manages per-column state (task list, loading state, current/total page) and exposes a `moveTask` function that the dnd-kit drag-end handler calls to optimistically reorder tasks across columns.

### Parallel Routes & Modals

Navigating to `/projects/[id]/tasks/new` or `/projects/[id]/tasks/view/[taskId]` from within the board renders the form in a modal overlay via Next.js parallel routes (`@modal`) and intercepting routes (`(.)tasks/...`). A direct URL visit (e.g., from a shared link or page refresh) renders the full page instead.

### Server Actions

All data mutations are Next.js Server Actions. Client components call them directly; there is no separate API layer. Each action returns a `{ success: boolean; message: string }` result that the calling hook passes to Sonner for a toast notification. `revalidatePath` is called after writes to invalidate the Next.js cache for the affected route.

### Invitation Flow

1. A project admin submits the **Invite Member** form with a collaborator's email.
2. The `inviteMember` Server Action calls a Supabase RPC (`invite_member`) that generates a signed token and sends an invitation email containing a link to `NEXT_PUBLIC_APP_URL/invite?token=<token>`.
3. The recipient clicks the link, signs in (or signs up), and the `acceptInvitation` action calls the `accept_invitation` RPC to add them to the project.

---

## Scripts

| Command       | Description                                 |
| ------------- | ------------------------------------------- |
| `pnpm dev`    | Start the development server with Turbopack |
| `pnpm build`  | Build for production                        |
| `pnpm start`  | Start the production server                 |
| `pnpm lint`   | Run ESLint                                  |
| `pnpm format` | Format all files with Prettier              |
