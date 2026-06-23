"use client"
import Link from "next/link";
import {
  GitBranchIcon,
  GithubLogoIcon,
  ListChecksIcon,
  RocketLaunchIcon,
  RowsIcon,
  GearIcon,
} from "@phosphor-icons/react";
import { formatDistanceToNow } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Badge } from "@/components/ui/badge";
import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";
import { statusBadge } from "@/features/dashboard/lib/status-style";

import type { DashboardOverview } from "@/features/dashboard/server/get-dashboard-overview";

function formatRelativeTime(value: string) {
  return formatDistanceToNow(new Date(value), { addSuffix: true });
}

function getPlanTone(plan: DashboardOverview["subscription"]["plan"]) {
  return plan === "pro" ? "success" : "neutral";
}

function getStatusTone(status: string) {
  if (status === "reviewed" || status === "synced") {
    return "success";
  }

  if (status === "processing" || status === "syncing") {
    return "info";
  }

  if (status === "rate_limited" || status === "failed") {
    return "warning";
  }

  return "neutral";
}

function MetricCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="border-border/80 bg-background/80">
      <CardHeader className="space-y-4">
        <div className="w-fit rounded-none border border-border bg-muted/40 p-2 text-foreground">
          {icon}
        </div>

        <p className="text-sm font-medium text-muted-foreground">{title}</p>

        <CardTitle className="text-2xl">{value}</CardTitle>

        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function QuickAction({
  href,
  label,
  description,
  icon,
}: {
  href: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Button
      asChild
      variant="outline"
      className="h-auto items-start justify-start gap-3 rounded-none p-4 text-left"
    >
      <Link href={href}>
        <span className="mt-0.5 rounded-none border border-border bg-muted/50 p-2">
          {icon}
        </span>
        <span className="flex flex-col items-start gap-1">
          <span className="font-medium">{label}</span>
          <span className="text-xs text-muted-foreground">{description}</span>
        </span>
      </Link>
    </Button>
  );
}

function PullRequestEmptyState() {
  return (
    <Empty className="border-border/60 bg-muted/10 py-10">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <RowsIcon />
        </EmptyMedia>
        <EmptyTitle>No pull requests yet</EmptyTitle>
        <EmptyDescription>
          Once the GitHub App receives pull request webhooks, recent reviews and
          queue activity will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link href={DASHBOARD_ROUTES.github}>Open GitHub App setup</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}

function InstallationEmptyState() {
  return (
    <Empty className="border-border/60 bg-muted/10 py-10">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <GithubLogoIcon />
        </EmptyMedia>
        <EmptyTitle>Connect the GitHub App</EmptyTitle>
        <EmptyDescription>
          Install the app to unlock repository sync, pull request reviews, and
          dashboard activity.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link href={DASHBOARD_ROUTES.github}>Go to GitHub App</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}

export function DashboardOverviewPanel({
  overview,
}: {
  overview: DashboardOverview;
}) {
  const installationLabel = overview.installation.connected
    ? `Connected to ${overview.installation.accountLogin ?? "GitHub"}`
    : "GitHub App not connected";

  const planLabel = overview.subscription.plan === "pro" ? "Pro" : "Free";
  const planTone = getPlanTone(overview.subscription.plan);
  const reviewsUsed =
    overview.usage.limit === null
      ? `${overview.usage.used} used`
      : `${overview.usage.used}/${overview.usage.limit} used`;

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="overflow-hidden border-border/80 bg-linear-to-br from-background via-background to-muted/30">
          <CardHeader className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="w-fit rounded-none uppercase tracking-[0.2em]"
                >
                  Workspace overview
                </Badge>
                <CardTitle className="text-3xl">
                  Review activity, sync state, and billing in one place.
                </CardTitle>
                <CardDescription className="max-w-2xl text-base">
                  Track the current reviewer workspace, see how many pull
                  requests have been processed this month, and jump straight to
                  the sections you use most.
                </CardDescription>
              </div>
              <span className={statusBadge(planTone)}>{planLabel} plan</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <Link href={DASHBOARD_ROUTES.pullRequest}>
                  Open pull requests
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={DASHBOARD_ROUTES.repos}>Browse repositories</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href={DASHBOARD_ROUTES.settings}>Settings</Link>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Reviews this month"
              value={reviewsUsed}
              description="Usage is unlimited on Pro and capped on Free."
              icon={<ListChecksIcon className="size-4" />}
            />
            <MetricCard
              title="Pull requests"
              value={String(overview.pullRequests.counts.total)}
              description="Captured from GitHub webhooks and queued for review."
              icon={<GitBranchIcon className="size-4" />}
            />
            <MetricCard
              title="Repo syncs"
              value={String(overview.repoSync.total)}
              description="Repositories that have been synced into the vector store."
              icon={<RowsIcon className="size-4" />}
            />
            <MetricCard
              title="Subscription"
              value={planLabel}
              description={
                overview.subscription.status === "active"
                  ? "Active billing state."
                  : `Status: ${overview.subscription.status}`
              }
              icon={<RocketLaunchIcon className="size-4" />}
            />
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-background/80">
          <CardHeader>
            <CardTitle>Workspace status</CardTitle>
            <CardDescription>{installationLabel}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {overview.installation.connected ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-none border border-border bg-muted/20 p-4">
                  <div>
                    <p className="text-sm font-medium">GitHub installation</p>
                    <p className="text-xs text-muted-foreground">
                      {overview.installation.accountLogin ??
                        "Connected account"}
                    </p>
                  </div>
                  <Badge variant="outline">Connected</Badge>
                </div>
                <div className="grid gap-3">
                  <div className="rounded-none border border-border p-4">
                    <p className="text-xs text-muted-foreground">
                      Pull request review queue
                    </p>
                    <p className="text-lg font-medium">
                      {overview.pullRequests.counts.pending} pending
                    </p>
                  </div>
                  <div className="rounded-none border border-border p-4">
                    <p className="text-xs text-muted-foreground">
                      Repository sync health
                    </p>
                    <p className="text-lg font-medium">
                      {overview.repoSync.synced} synced
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <InstallationEmptyState />
            )}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card className="border-border/80 bg-background/80">
          <CardHeader>
            <CardTitle>Recent pull requests</CardTitle>
            <CardDescription>
              Latest webhook-captured pull requests and their review state.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {overview.pullRequests.recent.length === 0 ? (
              <PullRequestEmptyState />
            ) : (
              <div className="space-y-4">
                {overview.pullRequests.recent.map((item) => (
                  <article
                    key={item.id}
                    className="space-y-3 rounded-none border border-border bg-muted/20 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">
                          #{item.prNumber} {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.repoFullName}
                        </p>
                      </div>
                      <span className={statusBadge(getStatusTone(item.status))}>
                        {item.status.replace("_", " ")}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span>{item.authorLogin ?? "Unknown author"}</span>
                      <span>•</span>
                      <span>{formatRelativeTime(item.updatedAt)}</span>
                    </div>
                    {item.reviewComment ? (
                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {item.reviewComment}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Review not generated yet.
                      </p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-border/80 bg-background/80">
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
              <CardDescription>
                Jump to the parts of the app you use when reviewing.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <QuickAction
                href={DASHBOARD_ROUTES.github}
                label="Connect GitHub"
                description="Manage the GitHub App installation."
                icon={<GithubLogoIcon className="size-4" />}
              />
              <QuickAction
                href={DASHBOARD_ROUTES.repos}
                label="Repositories"
                description="Sync codebases and inspect repo coverage."
                icon={<RowsIcon className="size-4" />}
              />
              <QuickAction
                href={DASHBOARD_ROUTES.pullRequest}
                label="Pull requests"
                description="Open the queue of captured PR events."
                icon={<GitBranchIcon className="size-4" />}
              />
              <QuickAction
                href={DASHBOARD_ROUTES.settings}
                label="Settings"
                description="Manage profile and subscription details."
                icon={<GearIcon className="size-4" />}
              />
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-background/80">
            <CardHeader>
              <CardTitle>Review pipeline</CardTitle>
              <CardDescription>
                A small snapshot of the current processing state.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Pending</span>
                <span className={statusBadge(getStatusTone("pending"))}>
                  {overview.pullRequests.counts.pending}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Processing</span>
                <span className={statusBadge(getStatusTone("processing"))}>
                  {overview.pullRequests.counts.processing}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Reviewed</span>
                <span className={statusBadge(getStatusTone("reviewed"))}>
                  {overview.pullRequests.counts.reviewed}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Rate limited</span>
                <span className={statusBadge(getStatusTone("rate_limited"))}>
                  {overview.pullRequests.counts.rateLimited}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
