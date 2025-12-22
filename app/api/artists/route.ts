import { NextResponse } from 'next/server';
import { getTopArtists, getThreadsByArtist } from '@/lib/queries/artists';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');
    const limit = parseInt(url.searchParams.get('limit') || '50');

    if (name) {
      const threadIds = await getThreadsByArtist(name);
      return NextResponse.json({ name, threadIds });
    }

    const artists = await getTopArtists(limit);
    return NextResponse.json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    return NextResponse.json({ error: 'Failed to fetch artists' }, { status: 500 });
  }
}