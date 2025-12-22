import { db } from '@/lib/db';
import type { ThreadWithAuthor, PaginatedResponse } from '@/types';

export async function getThreadsByForum(
  forumId: string,
  page: number = 1,
  pageSize: number = 20
): Promise<PaginatedResponse<ThreadWithAuthor>> {
  const offset = (page - 1) * pageSize;

  // Count
  const countQuery = `
    SELECT COUNT(*) as total
    FROM DiscussionThreads
    WHERE forum_id = ? AND (is_deleted = 0 OR is_deleted IS NULL)
  `;
  const countResult = await db.execute({ sql: countQuery, args: [forumId] });
  const total = Number(countResult.rows[0]?.total || 0);

  // Data
  const query = `
    SELECT 
      dt.*,
      u.name as author_name,
      u.avatar_url as author_avatar,
      f.name as forum_name
    FROM DiscussionThreads dt
    LEFT JOIN Users u ON dt.created_by = u.id
    LEFT JOIN Forums f ON dt.forum_id = f.id
    WHERE dt.forum_id = ? AND (dt.is_deleted = 0 OR dt.is_deleted IS NULL)
    ORDER BY dt.modified_epoch_seconds DESC
    LIMIT ? OFFSET ?
  `;

  const result = await db.execute({ 
    sql: query, 
    args: [forumId, pageSize, offset] 
  });

  return {
    data: result.rows as unknown as ThreadWithAuthor[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function getThreadById(id: string): Promise<ThreadWithAuthor | null> {
  const query = `
    SELECT 
      dt.*,
      u.name as author_name,
      u.avatar_url as author_avatar,
      f.name as forum_name
    FROM DiscussionThreads dt
    LEFT JOIN Users u ON dt.created_by = u.id
    LEFT JOIN Forums f ON dt.forum_id = f.id
    WHERE dt.id = ?
  `;

  const result = await db.execute({ sql: query, args: [id] });
  return (result.rows[0] as unknown as ThreadWithAuthor) || null;
}

export async function getRecentThreads(limit: number = 10): Promise<ThreadWithAuthor[]> {
  const query = `
    SELECT 
      dt.*,
      u.name as author_name,
      u.avatar_url as author_avatar,
      f.name as forum_name
    FROM DiscussionThreads dt
    LEFT JOIN Users u ON dt.created_by = u.id
    LEFT JOIN Forums f ON dt.forum_id = f.id
    WHERE dt.is_deleted = 0 OR dt.is_deleted IS NULL
    ORDER BY dt.created_epoch_seconds DESC
    LIMIT ?
  `;

  const result = await db.execute({ sql: query, args: [limit] });
  return result.rows as unknown as ThreadWithAuthor[];
}

export async function getPopularThreads(limit: number = 10): Promise<ThreadWithAuthor[]> {
  const query = `
    SELECT 
      dt.*,
      u.name as author_name,
      u.avatar_url as author_avatar,
      f.name as forum_name
    FROM DiscussionThreads dt
    LEFT JOIN Users u ON dt.created_by = u.id
    LEFT JOIN Forums f ON dt.forum_id = f.id
    WHERE dt.is_deleted = 0 OR dt.is_deleted IS NULL
    ORDER BY dt.upvote_count DESC, dt.post_count DESC
    LIMIT ?
  `;

  const result = await db.execute({ sql: query, args: [limit] });
  return result.rows as unknown as ThreadWithAuthor[];
}

export async function getAllThreads(
  page: number = 1,
  pageSize: number = 20,
  sortBy: 'recent' | 'popular' | 'active' = 'recent'
): Promise<PaginatedResponse<ThreadWithAuthor>> {
  const offset = (page - 1) * pageSize;

  const countQuery = `
    SELECT COUNT(*) as total
    FROM DiscussionThreads
    WHERE is_deleted = 0 OR is_deleted IS NULL
  `;
  const countResult = await db.execute(countQuery);
  const total = Number(countResult.rows[0]?.total || 0);

  const orderBy = {
    recent: 'dt.created_epoch_seconds DESC',
    popular: 'dt.upvote_count DESC, dt.post_count DESC',
    active: 'dt.modified_epoch_seconds DESC',
  }[sortBy];

  const query = `
    SELECT 
      dt.*,
      u.name as author_name,
      u.avatar_url as author_avatar,
      f.name as forum_name
    FROM DiscussionThreads dt
    LEFT JOIN Users u ON dt.created_by = u.id
    LEFT JOIN Forums f ON dt.forum_id = f.id
    WHERE dt.is_deleted = 0 OR dt.is_deleted IS NULL
    ORDER BY ${orderBy}
    LIMIT ? OFFSET ?
  `;

  const result = await db.execute({ 
    sql: query, 
    args: [pageSize, offset] 
  });

  return {
    data: result.rows as unknown as ThreadWithAuthor[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}