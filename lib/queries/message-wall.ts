import { db } from '@/lib/db';
import type { PaginatedResponse } from '@/types';

export interface MessageWallThread {
  id: string;
  wall_owner_id: string;
  title: string | null;
  first_post_id: string | null;
  created_epoch_seconds: number;
  creator_id: string | null;
  creator_name: string | null;
  creator_avatar: string | null;
  creator_badge: string | null;
  post_count: number;
  // First post content
  raw_content: string | null;
  rendered_content: string | null;  // HTML content for old/migrated posts
  json_model: string | null;
}

export interface MessageWallPost {
  id: string;
  thread_id: string;
  parent_id: string | null;
  created_epoch_seconds: number;
  creator_id: string | null;
  creator_name: string | null;
  creator_avatar: string | null;
  creator_badge: string | null;
  raw_content: string | null;
  rendered_content: string | null;  // HTML content for old/migrated posts
  json_model: string | null;
}

export async function getMessageWallThreads(
  userId: string,
  page: number = 1,
  pageSize: number = 20
): Promise<PaginatedResponse<MessageWallThread>> {
  const offset = (page - 1) * pageSize;

  // Count query
  const countQuery = `
    SELECT COUNT(*) as total
    FROM MessageWallThreads
    WHERE wall_owner_id = ?
  `;
  const countResult = await db.execute({ sql: countQuery, args: [userId] });
  const total = Number(countResult.rows[0]?.total || 0);

  // Data query - get threads with first post content from MessageWallThreadDetails
  // MessageWallThreadDetails contains scraped data from Fandom API
  // Note: Old/migrated posts may have empty rawContent with content in renderedContent (HTML)
  const query = `
    SELECT 
      mwt.id,
      mwt.wall_owner_id,
      mwt.title,
      mwt.first_post_id,
      mwt.created_epoch_seconds,
      mwt.creator_id,
      mwt.post_count,
      u.name as creator_name,
      u.avatar_url as creator_avatar,
      u.badge_permission as creator_badge,
      COALESCE(mwtd.first_post_raw_content, mwp.raw_content) as raw_content,
      mwtd.first_post_rendered_content as rendered_content,
      COALESCE(mwtd.first_post_json_model, mwp.json_model) as json_model
    FROM MessageWallThreads mwt
    LEFT JOIN Users u ON mwt.creator_id = u.id
    LEFT JOIN MessageWallThreadDetails mwtd ON mwt.id = mwtd.thread_id
    LEFT JOIN MessageWallPosts mwp ON mwt.first_post_id = mwp.id
    WHERE mwt.wall_owner_id = ?
    ORDER BY mwt.created_epoch_seconds DESC
    LIMIT ? OFFSET ?
  `;

  const result = await db.execute({
    sql: query,
    args: [userId, pageSize, offset],
  });


  return {
    data: result.rows as unknown as MessageWallThread[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function getMessageWallReplies(threadId: string): Promise<MessageWallPost[]> {
  // Get all replies for this thread from MessageWallPostDetails (scraped data)
  // This only returns data if the scraper has populated the table
  // Note: Old/migrated posts may have empty rawContent with content in renderedContent (HTML)
  const query = `
    SELECT 
      mwpd.post_id as id,
      mwpd.thread_id,
      mwpd.parent_post_id as parent_id,
      mwpd.created_epoch_seconds,
      mwpd.creator_id,
      mwpd.raw_content,
      mwpd.rendered_content,
      mwpd.json_model,
      COALESCE(mwpd.creator_name, u.name) as creator_name,
      COALESCE(mwpd.creator_avatar, u.avatar_url) as creator_avatar,
      COALESCE(mwpd.creator_badge, u.badge_permission) as creator_badge
    FROM MessageWallPostDetails mwpd
    LEFT JOIN Users u ON mwpd.creator_id = u.id
    WHERE mwpd.thread_id = ?
    ORDER BY mwpd.position ASC, mwpd.created_epoch_seconds ASC
  `;

  const result = await db.execute({ sql: query, args: [threadId] });
  return result.rows as unknown as MessageWallPost[];
}
