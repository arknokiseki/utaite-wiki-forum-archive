import { db } from '@/lib/db';
import type { User, UserWithStats, PaginatedResponse } from '@/types';

export async function getUserById(id: string): Promise<UserWithStats | null> {
  const query = `
    SELECT 
      u.*,
      COUNT(DISTINCT dt.id) as thread_count,
      COUNT(DISTINCT dp.id) as post_count,
      COALESCE(SUM(dt.upvote_count), 0) + COALESCE(SUM(dp.upvote_count), 0) as total_upvotes
    FROM Users u
    LEFT JOIN DiscussionThreads dt ON u.id = dt.created_by
    LEFT JOIN DiscussionPosts dp ON u.id = dp.creator_id
    WHERE u.id = ?
    GROUP BY u.id
  `;

  const result = await db.execute({ sql: query, args: [id] });
  return (result.rows[0] as unknown as UserWithStats) || null;
}

export async function getTopUsers(limit: number = 20): Promise<UserWithStats[]> {
  const query = `
    SELECT 
      u.*,
      COUNT(DISTINCT dt.id) as thread_count,
      COUNT(DISTINCT dp.id) as post_count,
      COALESCE(SUM(dt.upvote_count), 0) + COALESCE(SUM(dp.upvote_count), 0) as total_upvotes
    FROM Users u
    LEFT JOIN DiscussionThreads dt ON u.id = dt.created_by
    LEFT JOIN DiscussionPosts dp ON u.id = dp.creator_id
    GROUP BY u.id
    ORDER BY (COUNT(DISTINCT dt.id) + COUNT(DISTINCT dp.id)) DESC
    LIMIT ?
  `;

  const result = await db.execute({ sql: query, args: [limit] });
  return result.rows as unknown as UserWithStats[];
}

export async function getAllUsers(
  page: number = 1,
  pageSize: number = 50,
  sortBy: 'name' | 'posts' | 'threads' = 'posts'
): Promise<PaginatedResponse<UserWithStats>> {
  const offset = (page - 1) * pageSize;

  const countQuery = `SELECT COUNT(*) as total FROM Users`;
  const countResult = await db.execute(countQuery);
  const total = Number(countResult.rows[0]?.total || 0);

  const orderBy = {
    name: 'u.name ASC',
    posts: 'post_count DESC',
    threads: 'thread_count DESC',
  }[sortBy];

  const query = `
    SELECT 
      u.*,
      COUNT(DISTINCT dt.id) as thread_count,
      COUNT(DISTINCT dp.id) as post_count,
      COALESCE(SUM(dt.upvote_count), 0) + COALESCE(SUM(dp.upvote_count), 0) as total_upvotes
    FROM Users u
    LEFT JOIN DiscussionThreads dt ON u.id = dt.created_by
    LEFT JOIN DiscussionPosts dp ON u.id = dp.creator_id
    GROUP BY u.id
    ORDER BY ${orderBy}
    LIMIT ? OFFSET ?
  `;

  const result = await db.execute({ 
    sql: query, 
    args: [pageSize, offset] 
  });

  return {
    data: result.rows as unknown as UserWithStats[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function getUsersByBadge(badge: string): Promise<User[]> {
  const query = `
    SELECT * FROM Users
    WHERE badge_permission = ?
    ORDER BY name ASC
  `;

  const result = await db.execute({ sql: query, args: [badge] });
  return result.rows as unknown as User[];
}