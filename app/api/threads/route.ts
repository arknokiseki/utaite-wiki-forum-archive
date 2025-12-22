import { NextResponse } from 'next/server';
import { getAllThreads } from '@/lib/queries/threads';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20');
    const sortBy = (url.searchParams.get('sortBy') || 'recent') as 'recent' | 'popular' | 'active';

    const threads = await getAllThreads(page, pageSize, sortBy);
    return NextResponse.json(threads);
  } catch (error) {
    console.error('Error fetching threads:', error);
    return NextResponse.json({ error: 'Failed to fetch threads' }, { status: 500 });
  }
}