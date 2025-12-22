import { db } from '@/lib/db';
import type { SearchResult } from '@/types';

export async function searchAll(query: string, limit: number = 50): Promise<SearchResult[]> {
  const searchTerm = `%${query}%`;

  const sql = `
    SELECT 'thread' as type, id, title, raw_content as content, 
           (SELECT name FROM Users WHERE id = created_by) as author,
           created_epoch_seconds as created_at,
           1 as relevance
    FROM DiscussionThreads
    WHERE (title LIKE ? OR raw_content LIKE ?)
      AND (is_deleted = 0 OR is_deleted IS NULL)
    
    UNION ALL
    
    SELECT 'post' as type, id, title, raw_content as content,
           (SELECT name FROM Users WHERE id = creator_id) as author,
           created_epoch_seconds as created_at,
           1 as relevance
    FROM DiscussionPosts
    WHERE raw_content LIKE ?
      AND (is_deleted = 0 OR is_deleted IS NULL)
    
    UNION ALL
    
    SELECT 'user' as type, id, name as title, NULL as content,
           name as author, NULL as created_at,
           1 as relevance
    FROM Users
    WHERE name LIKE ?
    
    ORDER BY created_at DESC NULLS LAST
    LIMIT ?
  `;

  const result = await db.execute({ 
    sql, 
    args: [searchTerm, searchTerm, searchTerm, searchTerm, limit] 
  });
  
  return result.rows as unknown as SearchResult[];
}

export async function searchThreads(query: string, limit: number = 20): Promise<SearchResult[]> {
  const searchTerm = `%${query}%`;

  const sql = `
    SELECT 'thread' as type, id, title, raw_content as content,
           (SELECT name FROM Users WHERE id = created_by) as author,
           created_epoch_seconds as created_at,
           1 as relevance
    FROM DiscussionThreads
    WHERE (title LIKE ? OR raw_content LIKE ?)
      AND (is_deleted = 0 OR is_deleted IS NULL)
    ORDER BY created_epoch_seconds DESC
    LIMIT ?
  `;

  const result = await db.execute({ 
    sql, 
    args: [searchTerm, searchTerm, limit] 
  });

  return result.rows as unknown as SearchResult[];
}