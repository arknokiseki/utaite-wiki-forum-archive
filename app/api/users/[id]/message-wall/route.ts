import { NextResponse } from 'next/server';
import { getMessageWallThreads, getMessageWallReplies } from '@/lib/queries/message-wall';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;
    const { searchParams } = new URL(request.url);

    const threadId = searchParams.get('threadId');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);

    // If threadId is provided, get replies for that thread
    if (threadId) {
      const replies = await getMessageWallReplies(threadId);
      return NextResponse.json(replies);
    }

    // Otherwise, get message wall threads for this user
    const threads = await getMessageWallThreads(userId, page, pageSize);
    return NextResponse.json(threads);
  } catch (error) {
    console.error('Error fetching message wall:', error);
    return NextResponse.json(
      { error: 'Failed to fetch message wall' },
      { status: 500 }
    );
  }
}
