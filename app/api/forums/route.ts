import { NextResponse } from 'next/server';
import { getAllForums } from '@/lib/queries/forums';

export async function GET() {
  try {
    const forums = await getAllForums();
    return NextResponse.json(forums);
  } catch (error) {
    console.error('Error fetching forums:', error);
    return NextResponse.json({ error: 'Failed to fetch forums' }, { status: 500 });
  }
}