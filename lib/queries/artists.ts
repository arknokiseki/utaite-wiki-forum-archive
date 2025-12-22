import { db } from '@/lib/db';

export interface ArtistStats {
  name: string;
  thread_count: number;
  article_id: string;
  relative_url: string;
}

export async function getTopArtists(limit: number = 50): Promise<ArtistStats[]> {
  const query = `
    SELECT 
      json_extract(tag, '$.articleTitle') as name,
      json_extract(tag, '$.articleId') as article_id,
      json_extract(tag, '$.relativeUrl') as relative_url,
      COUNT(*) as thread_count
    FROM ThreadTags
    WHERE json_extract(tag, '$.articleTitle') IS NOT NULL
      AND json_extract(tag, '$.articleTitle') != 'Utaite'
      AND json_extract(tag, '$.articleTitle') != 'Utattemita'
    GROUP BY json_extract(tag, '$.articleTitle')
    ORDER BY thread_count DESC
    LIMIT ?
  `;

  const result = await db.execute({ sql: query, args: [limit] });
  return result.rows as unknown as ArtistStats[];
}

export async function getThreadsByArtist(artistName: string): Promise<string[]> {
  const query = `
    SELECT thread_id
    FROM ThreadTags
    WHERE json_extract(tag, '$.articleTitle') = ?
  `;

  const result = await db.execute({ sql: query, args: [artistName] });
  return result.rows.map((r) => r.thread_id as string);
}