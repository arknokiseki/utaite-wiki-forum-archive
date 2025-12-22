import { useQuery } from '@tanstack/react-query';
import type { ForumWithStats, ThreadWithAuthor, PaginatedResponse, Forum } from '@/types';

export function useForums() {
  return useQuery<ForumWithStats[]>({
    queryKey: ['forums'],
    queryFn: async () => {
      const res = await fetch('/api/forums');
      if (!res.ok) throw new Error('Failed to fetch forums');
      return res.json();
    },
  });
}

export function useForum(id: string, page: number = 1) {
  return useQuery<{ forum: Forum; threads: PaginatedResponse<ThreadWithAuthor> }>({
    queryKey: ['forum', id, page],
    queryFn: async () => {
      const res = await fetch(`/api/forums/${id}?page=${page}`);
      if (!res.ok) throw new Error('Failed to fetch forum');
      return res.json();
    },
    enabled: !!id,
  });
}