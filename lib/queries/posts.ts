import { db } from '@/lib/db';
import type { PostWithAuthor } from '@/types';

export async function getPostsByThread(threadId: string): Promise<PostWithAuthor[]> {
  const query = `
    SELECT 
      dp.*,
      u.name as author_name,
      u.avatar_url as author_avatar,
      u.badge_permission as author_badge
    FROM DiscussionPosts dp
    LEFT JOIN Users u ON dp.creator_id = u.id
    WHERE dp.thread_id = ? AND (dp.is_deleted = 0 OR dp.is_deleted IS NULL)
    ORDER BY dp.position ASC
  `;

  const result = await db.execute({ sql: query, args: [threadId] });
  return result.rows as unknown as PostWithAuthor[];
}

export async function getPostById(id: string): Promise<PostWithAuthor | null> {
  const query = `
    SELECT 
      dp.*,
      u.name as author_name,
      u.avatar_url as author_avatar,
      u.badge_permission as author_badge
    FROM DiscussionPosts dp
    LEFT JOIN Users u ON dp.creator_id = u.id
    WHERE dp.id = ?
  `;

  const result = await db.execute({ sql: query, args: [id] });
  return (result.rows[0] as unknown as PostWithAuthor) || null;
}

export async function getRecentPosts(limit: number = 20): Promise<PostWithAuthor[]> {
  const query = `
    SELECT 
      dp.*,
      u.name as author_name,
      u.avatar_url as author_avatar,
      u.badge_permission as author_badge
    FROM DiscussionPosts dp
    LEFT JOIN Users u ON dp.creator_id = u.id
    WHERE dp.is_deleted = 0 OR dp.is_deleted IS NULL
    ORDER BY dp.created_epoch_seconds DESC
    LIMIT ?
  `;

  const result = await db.execute({ sql: query, args: [limit] });
  return result.rows as unknown as PostWithAuthor[];
}