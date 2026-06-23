# PR Reviewer

[![PR Reviewer — AI-Powered Pull Request Reviews](./public/hero.png)](https://github.com/yourusername/pr-reviewer)

An AI-powered GitHub pull request reviewer that automatically analyzes code changes and posts intelligent review comments on your PRs. Install our GitHub App, and every opened, updated, or reopened pull request gets a comprehensive AI-generated review — no manual sync required.

## Description

PR Reviewer is a full-stack SaaS application built with Next.js that transforms the code review process. It listens for GitHub pull request webhooks, fetches the PR diff, uses vector search to find the most relevant code context, and generates intelligent reviews using AI. Reviews are posted back to GitHub as PR comments.

Optionally, you can sync an entire repository into Pinecone for richer context — for example, how changed code relates to other files outside the diff. PR reviews work immediately without syncing; repo sync is an enhancement for deeper, cross-file feedback and better contextual analysis.

The dashboard lets you connect GitHub, browse repositories, track review history, monitor usage, manage billing, and view comprehensive analytics.

## Features

### Core Functionality

- **Automatic PR Reviews** — Reviews run on `opened`, `synchronize`, and `reopened` PR events via GitHub webhooks
- **AI-Generated Feedback** — Structured markdown reviews covering code quality, security, performance, style, and maintainability
- **GitHub App Integration** — Install on your org or account to access repositories and post review comments
- **Vector-Based Context** — PR diffs are chunked and indexed in Pinecone for intelligent context retrieval
- **Optional Repository Sync** — Manually sync entire repositories for enhanced cross-file insights and better review context
- **Real-Time Webhook Processing** — Instant PR analysis without polling

### Dashboard & Management

- **Overview Dashboard** — Review statistics, activity tracking, and key metrics
- **Repository Management** — Browse connected repositories and manage GitHub sync status
- **Pull Request History** — Track all reviewed PRs, their status, and AI-generated feedback
- **Review Status Tracking** — Monitor review progress (pending, processing, reviewed, rate-limited)
- **Settings Management** — Configure GitHub connection and review preferences
- **Usage Analytics** — Track API usage, review counts, and subscription quota

### Authentication & Billing

- **GitHub OAuth Authentication** — Sign in securely with your GitHub account using Better Auth
- **Subscription Plans** — Free plan (5 reviews/month, public repos) and Pro plan (unlimited reviews, private repos)
- **Razorpay Integration** — Secure payment processing and subscription management
- **Billing Webhooks** — Automatic subscription status updates and renewal tracking

### User Experience

- **Dark Mode Support** — Full theme support across the entire dashboard
- **Responsive Design** — Optimized for desktop, tablet, and mobile devices
- **Monospace Typography** — Professional Geist Mono font throughout the interface
- **Smooth Animations** — Polished transitions and interactive feedback

## Tech Stack

### Frontend

| Tool                                                      | Purpose                                 |
| --------------------------------------------------------- | --------------------------------------- |
| [Next.js 16](https://nextjs.org/)                         | React framework with App Router         |
| [React 19](https://react.dev/)                            | UI library                              |
| [TypeScript](https://www.typescriptlang.org/)             | Type-safe JavaScript                    |
| [Tailwind CSS 4](https://tailwindcss.com/)                | Utility-first styling with OKLch colors |
| [shadcn/ui](https://ui.shadcn.com/)                       | Accessible, reusable components         |
| [TanStack Query](https://tanstack.com/query)              | Server state management and caching     |
| [Lucide React](https://lucide.dev/)                       | Modern icon library                     |
| [Recharts](https://recharts.org/)                         | Dashboard analytics charts              |
| [next-themes](https://github.com/pacocoursey/next-themes) | Dark/light mode switching               |
| [Sonner](https://sonner.emilkowal.ski/)                   | Toast notifications                     |

### Backend & Infrastructure

| Tool                                                                  | Purpose                             |
| --------------------------------------------------------------------- | ----------------------------------- |
| [PostgreSQL](https://www.postgresql.org/)                             | Primary database (hosted on Neon)   |
| [Prisma 7](https://www.prisma.io/)                                    | Type-safe ORM and migrations        |
| [Better Auth](https://www.better-auth.com/)                           | GitHub OAuth and session management |
| [Inngest](https://www.inngest.com/)                                   | Reliable background job processing  |
| [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) | Serverless backend endpoints        |

### AI & Vector Search

| Tool                                    | Purpose                                  |
| --------------------------------------- | ---------------------------------------- |
| [Vercel AI SDK](https://sdk.vercel.ai/) | Unified LLM integration                  |
| [OpenRouter](https://openrouter.ai/)    | LLM provider with multiple model options |
| [Pinecone](https://www.pinecone.io/)    | Vector database for semantic code search |

### GitHub & Payments

| Tool                                                | Purpose                                     |
| --------------------------------------------------- | ------------------------------------------- |
| [Octokit.js](https://github.com/octokit/octokit.js) | GitHub API client for PR operations         |
| [GitHub App](https://docs.github.com/en/apps)       | Webhook subscriptions and repo access       |
| [Razorpay](https://razorpay.com/)                   | Subscription billing and payment processing |

### Development

| Tool                                    | Purpose                          |
| --------------------------------------- | -------------------------------- |
| [ESLint](https://eslint.org/)           | Code linting                     |
| [Inngest CLI](https://www.inngest.com/) | Local background job development |

## Project Structure

```
app/
├── (auth)/                    # Authentication pages
│   ├── sign-in/              # GitHub login page
│   └── layout.tsx
├── (protected)/               # Protected dashboard routes
│   ├── dashboard/
│   │   ├── page.tsx          # Dashboard overview
│   │   ├── github/           # GitHub connection page
│   │   ├── repos/            # Repository list and sync
│   │   ├── pull-request/     # PR history and details
│   │   └── settings/         # User settings
│   └── layout.tsx
├── api/                       # API endpoints
│   ├── webhooks/             # GitHub webhook handlers
│   ├── billing/              # Razorpay billing webhooks
│   └── ...
├── page.tsx                   # Landing page
└── layout.tsx                 # Root layout

features/
├── auth/                      # Authentication logic
│   ├── actions/              # Server actions
│   └── components/
├── dashboard/                # Dashboard components
│   ├── components/
│   └── server/
├── github/                   # GitHub integration
│   ├── actions/
│   ├── components/
│   └── server/
├── reviews/                  # PR review pipeline
│   ├── components/
│   └── inngest/             # Background job workflows
├── billing/                  # Subscription & payments
│   ├── actions/
│   └── components/
└── repo-sync/               # Repository indexing
    ├── components/
    └── inngest/

components/
├── ui/                       # shadcn/ui components
└── provider/                # Context providers

lib/
├── auth-client.ts           # Better Auth client
├── db.ts                    # Prisma instance
├── server-actions.ts        # Reusable server utilities
└── ...

prisma/
├── schema.prisma            # Database schema
└── migrations/              # Migration files
```

## Database Schema

### Core Models

- **User** — Stores user profile, subscription status, and plan tier
- **GithubInstallation** — Links user to GitHub App installation
- **PullRequest** — Tracks PR reviews with status and AI-generated comments
- **RepoSync** — Tracks repository sync progress and chunk count
- **Session & Account** — Better Auth authentication records

## Getting Started

### Prerequisites

- **Node.js** 20 or higher
- **PostgreSQL** database (we use Neon for hosting)
- **GitHub App** — Create a GitHub App for OAuth and webhooks
- **Pinecone** index — With integrated embeddings model (`llama-text-embed-v2`)
- **OpenRouter API Key** — For LLM access
- **Razorpay Account** — For subscription billing

### Environment Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/pr-reviewer.git
cd pr-reviewer
```

2. Create `.env.local` with your credentials:

```bash
# Database
DATABASE_URL=postgresql://user:password@host/dbname

# Authentication
BETTER_AUTH_SECRET=your-secret-here
BETTER_AUTH_URL=http://localhost:3000

# GitHub App
GITHUB_APP_ID=your-app-id
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret
GITHUB_APP_NAME=your-app-name
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
GITHUB_WEBHOOK_SECRET=your-webhook-secret
NEXT_PUBLIC_GITHUB_PUBLIC_LINK=https://github.com/apps/your-app-name

# AI & Vector Search
OPENROUTER_API_KEY=your-key
PINECONE_API_KEY=your-key
PINECONE_INDEX=your-index-name

# Background Jobs
INNGEST_DEV=1  # Set to 0 in production

# Billing
RAZORPAY_KEY_ID=your-key
RAZORPAY_KEY_SECRET=your-secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-key
RAZORPAY_PLAN_ID=your-plan-id
RAZORPAY_WEBHOOK_SECRET=your-webhook-secret
```

### Installation & Setup

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client:

```bash
npm run prisma:generate
```

3. Run database migrations:

```bash
npm run prisma:migrate
```

4. Start the development server:

```bash
npm run dev
```

5. In a separate terminal, run the Inngest dev server for background jobs:

```bash
npx inngest-cli@latest dev
```

### First Run

1. Open [http://localhost:3000](http://localhost:3000)
2. Click "Get Started" and sign in with GitHub
3. Install the GitHub App on your repositories
4. Create or update a pull request to trigger your first AI review
5. Check the PR comments for the AI-generated review

## How It Works

### Automatic Review Flow

1. **Webhook Event** — GitHub sends a PR event (opened/synchronize/reopened) to your webhook endpoint
2. **Diff Retrieval** — We fetch the PR diff from GitHub using Octokit
3. **Chunking** — The diff is split into semantic chunks for vector search
4. **Context Search** — Pinecone finds the most relevant code context
5. **AI Generation** — OpenRouter generates a structured review with Vercel AI SDK
6. **Comment Posting** — The review is posted as a PR comment
7. **Status Tracking** — Review status is saved in PostgreSQL

### Repository Sync (Optional)

1. User clicks "Sync Repository" in the dashboard
2. Inngest job fetches all files from the repository
3. Files are chunked and embedded using Pinecone's integrated model
4. Chunks are indexed with metadata (file path, line numbers, etc.)
5. Future PR reviews use this rich context for better analysis

## Scripts

```bash
npm run dev          # Start Next.js dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect your Vercel account
3. Add environment variables in project settings
4. Deploy

### Self-Hosted

1. Set up a Node.js hosting (Railway, Render, etc.)
2. Configure PostgreSQL database
3. Set up environment variables
4. Deploy with `npm run build && npm start`

## Billing & Plans

### Free Plan

- 5 reviews per month
- Public repositories only
- Basic review feedback

### Pro Plan

- Unlimited reviews
- Private & public repositories
- Advanced features and priority support

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License — see the LICENSE file for details.

## Support

For questions, issues, or feature requests:

- Open an [issue](https://github.com/yourusername/pr-reviewer/issues)
- Check [existing discussions](https://github.com/yourusername/pr-reviewer/discussions)
- Email: support@example.com

## Roadmap

- [ ] Custom review rules per repository
- [ ] Inline code suggestions
- [ ] Team collaboration features
- [ ] Review history and trends
- [ ] Integration with other CI/CD platforms
- [ ] Custom LLM model support

---

**Built with ❤️ for better code reviews**
