import { NextResponse } from 'next/server';
import { getAllUsers, getTopUsers } from '@/lib/queries/users';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '50');
    const sortBy = (url.searchParams.get('sortBy') || 'posts') as 'name' | 'posts' | 'threads';
    const top = url.searchParams.get('top');

    if (top) {
      const users = await getTopUsers(parseInt(top));
      return NextResponse.json(users);
    }

    const users = await getAllUsers(page, pageSize, sortBy);
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}