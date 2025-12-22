import { createClient } from '@libsql/client';

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  throw new Error('Missing TURSO_DATABASE_URL environment variable');
}

export const db = createClient({
  url,
  authToken,
});

export async function paginate<T>(
  query: string,
  params: any[],
  page: number,
  pageSize: number
): Promise<{ data: T[]; total: number }> {
  const offset = (page - 1) * pageSize;
  const countQuery = `SELECT COUNT(*) as total FROM (${query})`;
  const countResult = await db.execute({ sql: countQuery, args: params });
  const total = Number(countResult.rows[0]?.total || 0);
  const paginatedQuery = `${query} LIMIT ? OFFSET ?`;
  const result = await db.execute({
    sql: paginatedQuery,
    args: [...params, pageSize, offset],
  });
  return { data: result.rows as unknown as T[], total };
}