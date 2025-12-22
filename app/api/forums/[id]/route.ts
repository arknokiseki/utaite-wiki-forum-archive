import { NextResponse } from 'next/server';
import { getForumById } from '@/lib/queries/forums';
import { getThreadsByForum } from '@/lib/queries/threads';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20');

    const forum = await getForumById(id);
    if (!forum) {
      return NextResponse.json({ error: 'Forum not found' }, { status: 404 });
    }

    const threads = await getThreadsByForum(id, page, pageSize);

    return NextResponse.json({ forum, threads });
  } catch (error) {
    console.error('Error fetching forum:', error);
    return NextResponse.json({ error: 'Failed to fetch forum' }, { status: 500 });
  }
}