import { NextResponse } from 'next/server';
import { getDashboardStats, getActivityByMonth } from '@/lib/queries/stats';

export async function GET() {
  try {
    const stats = await getDashboardStats();
    const activity = await getActivityByMonth();

    return NextResponse.json({ ...stats, monthlyActivity: activity });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}