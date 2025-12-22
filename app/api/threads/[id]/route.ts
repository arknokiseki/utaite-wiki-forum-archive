import { NextResponse } from 'next/server';
import { getThreadById } from '@/lib/queries/threads';
import { getPostsByThread } from '@/lib/queries/posts';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const thread = await getThreadById(id);
    if (!thread) {
      return NextResponse.json({ error: 'Thread not found' }, { status: 404 });
    }

    const posts = await getPostsByThread(id);

    return NextResponse.json({ thread, posts });
  } catch (error) {
    console.error('Error fetching thread:', error);
    return NextResponse.json({ error: 'Failed to fetch thread' }, { status: 500 });
  }
}