"use client";
import { authClient } from "../lib/auth-client";
import { UserMenuWithSession } from "@/features/auth/components/user-menu";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  GitPullRequest,
  Zap,
  CheckCircle2,
  BarChart3,
  Sparkles,
  Shield,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data } = authClient.useSession();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div
          className="absolute bottom-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <header className="border-b border-border/50 px-4 py-4 sticky top-0 bg-background/80 backdrop-blur-xl z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium">PR Reviewer</span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <UserMenuWithSession variant="compact" />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 relative">
        <div className="max-w-4xl w-full space-y-16">
          {/* Hero section */}
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-accent/50 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium">
                  Powered by AI • GitHub Ready
                </span>
              </div>

              {/* Main headline */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium leading-tight">
                  Intelligent Code
                  <br />
                  <span className="bg-gradient-to-r from-primary via-primary to-primary/50 bg-clip-text text-transparent">
                    Review Engine
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl font-light">
                  Transform your pull request review process with AI-powered
                  analysis. Catch bugs before they ship, maintain consistency,
                  and accelerate your development cycle while keeping your team
                  in control.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {data?.user ? (
                  <Link href="/dashboard" className="w-full sm:w-auto">
                    <Button className="w-full gap-2 h-11 text-sm font-medium">
                      Go to Dashboard
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/sign-in" className="w-full sm:w-auto">
                      <Button className="w-full gap-2 h-11 text-sm font-medium">
                        Get Started Free
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href="/sign-in" className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        className="w-full h-11 text-sm font-medium"
                      >
                        View Demo
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-border/50 pt-12">
              <div className="space-y-2">
                <p className="text-2xl sm:text-3xl font-medium text-primary">
                  10K+
                </p>
                <p className="text-xs text-muted-foreground">PRs Analyzed</p>
              </div>
              <div className="space-y-2">
                <p className="text-2xl sm:text-3xl font-medium text-primary">
                  95%
                </p>
                <p className="text-xs text-muted-foreground">Issue Detection</p>
              </div>
              <div className="space-y-2">
                <p className="text-2xl sm:text-3xl font-medium text-primary">
                  5s
                </p>
                <p className="text-xs text-muted-foreground">
                  Avg Analysis Time
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-2xl sm:text-3xl font-medium text-primary">
                  24/7
                </p>
                <p className="text-xs text-muted-foreground">
                  Always Available
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Features grid */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-medium">Key Features</h2>
              <p className="text-sm text-muted-foreground">
                Everything you need for smarter code reviews
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Feature 1 */}
              <div className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/30 p-6 hover:border-border hover:bg-card/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-3">
                  <div className="w-fit p-3 rounded-lg bg-accent/50 group-hover:bg-accent transition-colors">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      Instant Analysis
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Get comprehensive AI-powered insights on code quality,
                      style, and security in seconds
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/30 p-6 hover:border-border hover:bg-card/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-3">
                  <div className="w-fit p-3 rounded-lg bg-accent/50 group-hover:bg-accent transition-colors">
                    <Code2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      GitHub Sync
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Seamlessly integrated with your repositories for real-time
                      PR monitoring and feedback
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/30 p-6 hover:border-border hover:bg-card/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-3">
                  <div className="w-fit p-3 rounded-lg bg-accent/50 group-hover:bg-accent transition-colors">
                    <GitPullRequest className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      Batch Reviews
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Review multiple PRs efficiently with bulk operations and
                      comparison tools
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/30 p-6 hover:border-border hover:bg-card/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-3">
                  <div className="w-fit p-3 rounded-lg bg-accent/50 group-hover:bg-accent transition-colors">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      Analytics & Insights
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Track metrics, trends, and team performance over time with
                      detailed dashboards
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/30 p-6 hover:border-border hover:bg-card/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-3">
                  <div className="w-fit p-3 rounded-lg bg-accent/50 group-hover:bg-accent transition-colors">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      Security Scanning
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Identify vulnerabilities and security issues before they
                      reach production
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 6 */}
              <div className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/30 p-6 hover:border-border hover:bg-card/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-3">
                  <div className="w-fit p-3 rounded-lg bg-accent/50 group-hover:bg-accent transition-colors">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      Custom Rules
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Configure AI to match your team's coding standards and
                      best practices
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative overflow-hidden rounded-lg border border-border/50 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 sm:p-12">
            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-medium">
                  Ready to Transform Your Reviews?
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg">
                  Join teams using AI to review code smarter, faster, and with
                  greater consistency.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                {!data?.user && (
                  <>
                    <Link href="/sign-in">
                      <Button className="gap-2">
                        Start Your Free Trial
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="outline">Contact Sales</Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
