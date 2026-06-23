import type { Metadata } from "next";

import { requireAuth } from "@/features/auth/actions";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { DashboardOverviewPanel } from "@/features/dashboard/components/dashboard-overview";
import { getDashboardOverview } from "@/features/dashboard/server/get-dashboard-overview";

export const metadata: Metadata = {
  title: "Dashboard · Pr Reviewer",
};

export default async function DashboardPage() {
  const session = await requireAuth();
  const overview = await getDashboardOverview(session.user.id);

  return (
    <>
      <DashboardHeader
        title="Dashboard"
        description="Workspace overview for pull requests, review status, and repository sync health."
      />
      <DashboardOverviewPanel overview={overview} />
    </>
  );
}
