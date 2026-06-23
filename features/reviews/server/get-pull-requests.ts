import { prisma } from "@/lib/db";
import { getUserInstallationId } from "@/features/github/server/installation";

export type PullRequestListItem = {
  id: string;
  repoFullName: string;
  prNumber: number;
  title: string;
  authorLogin: string | null;
  headSha: string;
  baseBranch: string;
  status: string;
  reviewComment: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PullRequestSummary = {
  total: number;
  pending: number;
  processing: number;
  reviewed: number;
  rateLimited: number;
};

export type PullRequestFeed = {
  items: PullRequestListItem[];
  summary: PullRequestSummary;
};

export async function getPullRequests(
  userId: string,
): Promise<PullRequestFeed> {
  const installationId = await getUserInstallationId(userId);

  if (!installationId) {
    return {
      items: [],
      summary: {
        total: 0,
        pending: 0,
        processing: 0,
        reviewed: 0,
        rateLimited: 0,
      },
    };
  }

  const pullRequests = await prisma.pullRequest.findMany({
    where: { installationId },
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      repoFullName: true,
      prNumber: true,
      title: true,
      authorLogin: true,
      headSha: true,
      baseBranch: true,
      status: true,
      reviewComment: true,
      reviewedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const summary: PullRequestSummary = {
    total: pullRequests.length,
    pending: pullRequests.filter((item) => item.status === "pending").length,
    processing: pullRequests.filter((item) => item.status === "processing")
      .length,
    reviewed: pullRequests.filter((item) => item.status === "reviewed").length,
    rateLimited: pullRequests.filter((item) => item.status === "rate_limited")
      .length,
  };

  return {
    items: pullRequests.map((pullRequest) => ({
      ...pullRequest,
      reviewedAt: pullRequest.reviewedAt?.toISOString() ?? null,
      createdAt: pullRequest.createdAt.toISOString(),
      updatedAt: pullRequest.updatedAt.toISOString(),
    })),
    summary,
  };
}
