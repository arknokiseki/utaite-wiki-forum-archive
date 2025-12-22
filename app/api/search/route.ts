import { NextResponse } from 'next/server';
import { searchAll, searchThreads } from '@/lib/queries/search';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    const type = url.searchParams.get('type');
    const limit = parseInt(url.searchParams.get('limit') || '50');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter required' }, { status: 400 });
    }

    let results;
    if (type === 'threads') {
      results = await searchThreads(query, limit);
    } else {
      results = await searchAll(query, limit);
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error searching:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}