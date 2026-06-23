"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useMemo, useState } from "react";
import { MagnifyingGlassIcon, FileTextIcon } from "@phosphor-icons/react";

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
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { statusBadge } from "@/features/dashboard/lib/status-style";

import type {
  PullRequestFeed,
  PullRequestListItem,
} from "@/features/reviews/server/get-pull-requests";

type Filter = "all" | "pending" | "processing" | "reviewed" | "rate_limited";

const FILTERS: Array<{ value: Filter; label: string }> = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "reviewed", label: "Reviewed" },
  { value: "rate_limited", label: "Rate limited" },
];

function formatRelativeTime(value: string) {
  return formatDistanceToNow(new Date(value), { addSuffix: true });
}

function getStatusTone(status: PullRequestListItem["status"]) {
  if (status === "reviewed") {
    return "success";
  }

  if (status === "processing") {
    return "info";
  }

  if (status === "rate_limited") {
    return "warning";
  }

  return "neutral";
}

function getStatusLabel(status: PullRequestListItem["status"]) {
  if (status === "rate_limited") {
    return "rate limited";
  }

  return status;
}

function StatusPill({ status }: { status: PullRequestListItem["status"] }) {
  return (
    <span className={statusBadge(getStatusTone(status))}>
      {getStatusLabel(status)}
    </span>
  );
}

function StatCard({
  title,
  value,
  description,
}: {
  title: string;
  value: number;
  description: string;
}) {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
      <CardContent className="text-xs text-muted-foreground">
        {description}
      </CardContent>
    </Card>
  );
}

function PullRequestEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileTextIcon />
        </EmptyMedia>
        <EmptyTitle>No pull requests yet</EmptyTitle>
        <EmptyDescription>
          Once the GitHub App receives a pull request webhook, the review queue
          will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link href="/dashboard/github">Check GitHub App setup</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}

function ReviewSnippet({ item }: { item: PullRequestListItem }) {
  return (
    <Card id={`review-${item.id}`} className="scroll-mt-24">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base">
              #{item.prNumber} {item.title}
            </CardTitle>
            <CardDescription>{item.repoFullName}</CardDescription>
          </div>
          <StatusPill status={item.status} />
        </div>
        <CardDescription>
          Reviewed{" "}
          {item.reviewedAt
            ? formatRelativeTime(item.reviewedAt)
            : formatRelativeTime(item.updatedAt)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-none border border-border bg-muted/30 p-4 text-xs leading-6 text-foreground">
          {item.reviewComment ??
            "No review text was stored for this pull request."}
        </pre>
      </CardContent>
    </Card>
  );
}

export function PullRequestList({ feed }: { feed: PullRequestFeed }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const visibleItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return feed.items.filter((item) => {
      if (filter !== "all" && item.status !== filter) {
        return false;
      }

      if (!query) {
        return true;
      }

      return [
        item.title,
        item.repoFullName,
        item.authorLogin ?? "",
        String(item.prNumber),
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [feed.items, filter, search]);

  const counts = {
    all: feed.summary.total,
    pending: feed.summary.pending,
    processing: feed.summary.processing,
    reviewed: feed.summary.reviewed,
    rate_limited: feed.summary.rateLimited,
  };

  const reviewedItems = feed.items.filter((item) => item.status === "reviewed");

  const rows =
    visibleItems.length > 0 ? (
      visibleItems.map((item) => (
        <TableRow key={item.id}>
          <TableCell>
            <div className="flex flex-col gap-1">
              <span className="font-medium">
                #{item.prNumber} {item.title}
              </span>
              <span className="text-xs text-muted-foreground">
                {item.repoFullName}
              </span>
            </div>
          </TableCell>
          <TableCell className="text-muted-foreground">
            {item.authorLogin ?? "Unknown"}
          </TableCell>
          <TableCell className="text-muted-foreground">
            {item.baseBranch}
          </TableCell>
          <TableCell>
            <StatusPill status={item.status} />
          </TableCell>
          <TableCell className="text-muted-foreground">
            {formatRelativeTime(item.updatedAt)}
          </TableCell>
          <TableCell className="text-right">
            {item.reviewComment ? (
              <Button size="sm" variant="outline" asChild>
                <Link href={`#review-${item.id}`}>Jump to review</Link>
              </Button>
            ) : (
              <Button size="sm" variant="ghost" disabled>
                No review yet
              </Button>
            )}
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={6} className="text-center text-muted-foreground">
          No pull requests match your filters.
        </TableCell>
      </TableRow>
    );

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total pull requests"
          value={counts.all}
          description="All stored PR events for this GitHub App installation."
        />
        <StatCard
          title="Pending"
          value={counts.pending}
          description="Waiting to enter the review pipeline."
        />
        <StatCard
          title="Processing"
          value={counts.processing}
          description="Currently being chunked, reviewed, or commented on."
        />
        <StatCard
          title="Reviewed"
          value={counts.reviewed}
          description="Reviews that were generated and posted back to GitHub."
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pull Requests</CardTitle>
          <CardDescription>
            Search the review queue, inspect status, and open the generated
            review output.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Tabs
              value={filter}
              onValueChange={(value) => setFilter(value as Filter)}
            >
              <TabsList className="flex h-auto flex-wrap justify-start gap-1">
                {FILTERS.map((item) => (
                  <TabsTrigger key={item.value} value={item.value}>
                    {item.label} ({counts[item.value]})
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="relative w-full max-w-sm">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search pull requests…"
                className="pl-9"
              />
            </div>
          </div>

          {feed.items.length === 0 ? (
            <PullRequestEmpty />
          ) : (
            <div className="overflow-hidden rounded-none border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pull Request</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Base branch</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{rows}</TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {reviewedItems.length > 0 ? (
        <section className="space-y-4">
          <div>
            <h2 className="text-sm font-medium">Latest reviews</h2>
            <p className="text-xs text-muted-foreground">
              Stored AI review comments for the latest reviewed pull requests.
            </p>
          </div>
          <div className="space-y-4">
            {reviewedItems.slice(0, 5).map((item) => (
              <ReviewSnippet key={item.id} item={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
