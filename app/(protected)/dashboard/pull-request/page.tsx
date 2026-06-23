import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";
import { requireAuth } from "@/features/auth/actions";
import { getInstallationStatus } from "@/features/github/server/installation";
import { getPullRequests } from "@/features/reviews/server/get-pull-requests";
import { PullRequestList } from "@/features/reviews/components/pull-request-list";

export const metadata: Metadata = {
  title: "Pull Requests · Dashboard",
};

function PullRequestsNotConnected() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
      <p className="text-sm text-muted-foreground">
        Install the GitHub App first to view the pull requests that have been
        captured for review.
      </p>
      <Button
        nativeButton={false}
        render={<Link href={DASHBOARD_ROUTES.github} />}
      >
        Go to GitHub App
      </Button>
    </div>
  );
}

export default async function DashboardPullRequestPage() {
  const session = await requireAuth();
  const installation = await getInstallationStatus(session.user.id);

  const header = (
    <DashboardHeader
      title="Pull Requests"
      description="Track webhook-captured pull requests, review status, and stored AI feedback."
    />
  );

  if (!installation.connected) {
    return (
      <>
        {header}
        <PullRequestsNotConnected />
      </>
    );
  }

  const feed = await getPullRequests(session.user.id);

  return (
    <>
      {header}
      <PullRequestList feed={feed} />
    </>
  );
}
