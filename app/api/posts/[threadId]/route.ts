import { NextResponse } from 'next/server';
import { getPostsByThread } from '@/lib/queries/posts';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ threadId: string }> }
) {
  try {
    const { threadId } = await params;
    const posts = await getPostsByThread(threadId);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}