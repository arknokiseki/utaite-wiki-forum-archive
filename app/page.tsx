'use client';

import { useStats } from '@/hooks/use-stats';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { TopArtists } from '@/components/dashboard/top-artists';
import { RecentThreads } from '@/components/dashboard/recent-threads';
import { ActiveUsers } from '@/components/dashboard/active-users';
import { StatsCardsSkeleton, ThreadListSkeleton } from '@/components/shared/loading-skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export default function DashboardPage() {
  const { data: stats, isLoading, error } = useStats();

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load dashboard data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to the Utaite Wiki Discussions Archive
        </p>
      </div>

      {/* Stats Cards */}
      {isLoading ? (
        <StatsCardsSkeleton />
      ) : stats ? (
        <StatsCards stats={stats} />
      ) : null}

      {/* Date Range */}
      {stats && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Archive Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This archive contains discussions from{' '}
              <span className="font-medium text-foreground">
                {stats.dateRange.earliest}
              </span>{' '}
              to{' '}
              <span className="font-medium text-foreground">
                {stats.dateRange.latest}
              </span>
            </p>
          </CardContent>
        </Card>
      )}

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Threads */}
        {isLoading ? (
          <Card>
            <CardHeader>
              <CardTitle>Recent Discussions</CardTitle>
            </CardHeader>
            <CardContent>
              <ThreadListSkeleton />
            </CardContent>
          </Card>
        ) : stats ? (
          <RecentThreads threads={stats.recentThreads} />
        ) : null}

        {/* Active Users */}
        {stats && <ActiveUsers users={stats.topUsers} />}
      </div>

      {/* Top Artists */}
      {stats && <TopArtists artists={stats.topArtists} />}
    </div>
  );
}