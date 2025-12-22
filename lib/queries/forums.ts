import { db } from '@/lib/db';
import type { Forum, ForumWithStats } from '@/types';

export async function getAllForums(): Promise<ForumWithStats[]> {
  const query = `
    SELECT 
      f.*,
      datetime(f.creation_epoch_seconds, 'unixepoch') as recent_activity
    FROM Forums f
    WHERE f.is_deleted = 0 OR f.is_deleted IS NULL
    ORDER BY f.display_order ASC, f.post_count DESC
  `;

  const result = await db.execute(query);
  return result.rows as unknown as ForumWithStats[];
}

export async function getForumById(id: string): Promise<Forum | null> {
  const query = `
    SELECT * FROM Forums
    WHERE id = ?
  `;

  const result = await db.execute({ sql: query, args: [id] });
  return (result.rows[0] as unknown as Forum) || null;
}

export async function getForumStats(): Promise<{ id: string; name: string; threads: number; posts: number }[]> {
  const query = `
    SELECT 
      id,
      name,
      thread_count as threads,
      post_count as posts
    FROM Forums
    WHERE name != 'Root Forum'
    ORDER BY post_count DESC
  `;

  const result = await db.execute(query);
  return result.rows as unknown as { id: string; name: string; threads: number; posts: number }[];
}