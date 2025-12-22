import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import type { ThreadWithAuthor, PostWithAuthor, PaginatedResponse } from '@/types';

export function useThreads(
  page: number = 1,
  pageSize: number = 20,
  sortBy: 'recent' | 'popular' | 'active' = 'recent'
) {
  return useQuery<PaginatedResponse<ThreadWithAuthor>>({
    queryKey: ['threads', page, pageSize, sortBy],
    queryFn: async () => {
      const res = await fetch(`/api/threads?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}`);
      if (!res.ok) throw new Error('Failed to fetch threads');
      return res.json();
    },
  });
}

export function useInfiniteThreads(
  pageSize: number = 20,
  sortBy: 'recent' | 'popular' | 'active' = 'recent'
) {
  return useInfiniteQuery<PaginatedResponse<ThreadWithAuthor>>({
    queryKey: ['threads', 'infinite', sortBy],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `/api/threads?page=${pageParam}&pageSize=${pageSize}&sortBy=${sortBy}`
      );
      if (!res.ok) throw new Error('Failed to fetch threads');
      return res.json();
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
}

export function useThread(id: string) {
  return useQuery<{ thread: ThreadWithAuthor; posts: PostWithAuthor[] }>({
    queryKey: ['thread', id],
    queryFn: async () => {
      const res = await fetch(`/api/threads/${id}`);
      if (!res.ok) throw new Error('Failed to fetch thread');
      return res.json();
    },
    enabled: !!id,
  });
}