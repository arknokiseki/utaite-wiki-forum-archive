import { useQuery } from '@tanstack/react-query';
import type { PollWithAnswers } from '@/types';

export function usePolls() {
  return useQuery<PollWithAnswers[]>({
    queryKey: ['polls'],
    queryFn: async () => {
      const res = await fetch('/api/polls');
      if (!res.ok) throw new Error('Failed to fetch polls');
      return res.json();
    },
  });
}