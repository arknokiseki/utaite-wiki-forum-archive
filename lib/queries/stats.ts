import { db } from '@/lib/db';
import type { StatsResponse } from '@/types';
import { getTopArtists } from './artists';
import { getTopUsers } from './users';
import { getRecentThreads } from './threads';

export async function getDashboardStats(): Promise<StatsResponse> {
  // Basic counts
  const countsQuery = `
    SELECT 
      (SELECT COUNT(*) FROM Users) as totalUsers,
      (SELECT COUNT(*) FROM DiscussionThreads WHERE is_deleted = 0 OR is_deleted IS NULL) as totalThreads,
      (SELECT COUNT(*) FROM DiscussionPosts WHERE is_deleted = 0 OR is_deleted IS NULL) as totalPosts,
      (SELECT COUNT(*) FROM Forums) as totalForums,
      (SELECT COUNT(*) FROM Polls) as totalPolls
  `;
  const countsResult = await db.execute(countsQuery);
  const counts = countsResult.rows[0] as unknown as {
    totalUsers: number;
    totalThreads: number;
    totalPosts: number;
    totalForums: number;
    totalPolls: number;
  };

  // Date range
  const dateRangeQuery = `
    SELECT 
      datetime(MIN(created_epoch_seconds), 'unixepoch') as earliest,
      datetime(MAX(created_epoch_seconds), 'unixepoch') as latest
    FROM DiscussionThreads
  `;
  const dateRangeResult = await db.execute(dateRangeQuery);
  const dateRange = dateRangeResult.rows[0] as unknown as { earliest: string; latest: string };

  // Fetch other stats in parallel
  const [artists, users, recentThreads] = await Promise.all([
    getTopArtists(10),
    getTopUsers(10),
    getRecentThreads(5),
  ]);

  return {
    ...counts,
    dateRange,
    topArtists: artists.map((a) => ({ name: a.name, count: a.thread_count })),
    topUsers: users.map((u) => ({
      id: u.id,
      name: u.name,
      avatar: u.avatar_url,
      posts: u.post_count,
    })),
    recentThreads,
  };
}

export async function getActivityByMonth(): Promise<{ month: string; threads: number; posts: number }[]> {
  const query = `
    SELECT 
      strftime('%Y-%m', datetime(created_epoch_seconds, 'unixepoch')) as month,
      COUNT(*) as threads,
      0 as posts
    FROM DiscussionThreads
    WHERE created_epoch_seconds IS NOT NULL
    GROUP BY month
    ORDER BY month DESC
    LIMIT 24
  `;

  const result = await db.execute(query);
  return result.rows as unknown as { month: string; threads: number; posts: number }[];
}