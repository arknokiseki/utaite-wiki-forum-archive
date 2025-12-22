import { NextResponse } from 'next/server';
import { getAllPolls } from '@/lib/queries/polls';

export async function GET() {
  try {
    const polls = await getAllPolls();
    return NextResponse.json(polls);
  } catch (error) {
    console.error('Error fetching polls:', error);
    return NextResponse.json({ error: 'Failed to fetch polls' }, { status: 500 });
  }
}