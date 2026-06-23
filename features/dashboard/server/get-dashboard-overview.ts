import {
  getInstallationStatus,
  getUserInstallationId,
} from "@/features/github/server/installation";
import { getUsageSummary } from "@/features/billing/server/usage";
import { getUserSubscription } from "@/features/billing/server/subscription";
import type {
  GithubInstallationStatus,
  UserSubscription,
} from "@/features/dashboard/lib/types";
import { prisma } from "@/lib/db";

export type DashboardOverviewPullRequest = {
  id: string;
  repoFullName: string;
  prNumber: number;
  title: string;
  authorLogin: string | null;
  status: string;
  reviewComment: string | null;
  reviewedAt: string | null;
  updatedAt: string;
};

export type DashboardOverviewCounts = {
  total: number;
  pending: number;
  processing: number;
  reviewed: number;
  rateLimited: number;
};

export type DashboardOverviewRepoSync = {
  total: number;
  pending: number;
  syncing: number;
  synced: number;
  failed: number;
};

export type DashboardOverview = {
  installation: GithubInstallationStatus;
  subscription: UserSubscription;
  usage: Awaited<ReturnType<typeof getUsageSummary>>;
  pullRequests: {
    counts: DashboardOverviewCounts;
    recent: DashboardOverviewPullRequest[];
  };
  repoSync: DashboardOverviewRepoSync;
};

const EMPTY_COUNTS: DashboardOverviewCounts = {
  total: 0,
  pending: 0,
  processing: 0,
  reviewed: 0,
  rateLimited: 0,
};

const EMPTY_REPO_SYNC: DashboardOverviewRepoSync = {
  total: 0,
  pending: 0,
  syncing: 0,
  synced: 0,
  failed: 0,
};

function buildEmptyOverview(
  installation: GithubInstallationStatus,
  subscription: UserSubscription,
  usage: Awaited<ReturnType<typeof getUsageSummary>>,
): DashboardOverview {
  return {
    installation,
    subscription,
    usage,
    pullRequests: {
      counts: EMPTY_COUNTS,
      recent: [],
    },
    repoSync: EMPTY_REPO_SYNC,
  };
}

export async function getDashboardOverview(
  userId: string,
): Promise<DashboardOverview> {
  const [installation, subscription, usage] = await Promise.all([
    getInstallationStatus(userId),
    getUserSubscription(userId),
    getUsageSummary(userId),
  ]);

  if (!installation.connected) {
    return buildEmptyOverview(installation, subscription, usage);
  }

  const installationId = await getUserInstallationId(userId);

  if (!installationId) {
    return buildEmptyOverview(installation, subscription, usage);
  }

  const [pullRequests, repoSyncs] = await Promise.all([
    prisma.pullRequest.findMany({
      where: { installationId },
      orderBy: { updatedAt: "desc" },
      take: 6,
      select: {
        id: true,
        repoFullName: true,
        prNumber: true,
        title: true,
        authorLogin: true,
        status: true,
        reviewComment: true,
        reviewedAt: true,
        updatedAt: true,
      },
    }),
    prisma.repoSync.findMany({
      where: { installationId },
      select: { status: true },
    }),
  ]);

  const counts: DashboardOverviewCounts = {
    total: pullRequests.length,
    pending: pullRequests.filter((item) => item.status === "pending").length,
    processing: pullRequests.filter((item) => item.status === "processing")
      .length,
    reviewed: pullRequests.filter((item) => item.status === "reviewed").length,
    rateLimited: pullRequests.filter((item) => item.status === "rate_limited")
      .length,
  };

  const repoSync: DashboardOverviewRepoSync = {
    total: repoSyncs.length,
    pending: repoSyncs.filter((item) => item.status === "pending").length,
    syncing: repoSyncs.filter((item) => item.status === "syncing").length,
    synced: repoSyncs.filter((item) => item.status === "synced").length,
    failed: repoSyncs.filter((item) => item.status === "failed").length,
  };

  return {
    installation,
    subscription,
    usage,
    pullRequests: {
      counts,
      recent: pullRequests.map((pullRequest) => ({
        ...pullRequest,
        reviewedAt: pullRequest.reviewedAt?.toISOString() ?? null,
        updatedAt: pullRequest.updatedAt.toISOString(),
      })),
    },
    repoSync,
  };
}
