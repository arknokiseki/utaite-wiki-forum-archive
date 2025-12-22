import { useQuery } from '@tanstack/react-query';
import type { StatsResponse } from '@/types';

export function useStats() {
  return useQuery<StatsResponse & { monthlyActivity: { month: string; threads: number }[] }>({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await fetch('/api/stats');
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    },
  });
}