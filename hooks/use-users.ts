import { useQuery } from '@tanstack/react-query';
import type { UserWithStats, PaginatedResponse } from '@/types';

export function useUsers(
  page: number = 1,
  pageSize: number = 50,
  sortBy: 'name' | 'posts' | 'threads' = 'posts'
) {
  return useQuery<PaginatedResponse<UserWithStats>>({
    queryKey: ['users', page, pageSize, sortBy],
    queryFn: async () => {
      const res = await fetch(`/api/users?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}`);
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    },
  });
}

export function useTopUsers(limit: number = 10) {
  return useQuery<UserWithStats[]>({
    queryKey: ['users', 'top', limit],
    queryFn: async () => {
      const res = await fetch(`/api/users?top=${limit}`);
      if (!res.ok) throw new Error('Failed to fetch top users');
      return res.json();
    },
  });
}

export function useUser(id: string) {
  return useQuery<UserWithStats>({
    queryKey: ['user', id],
    queryFn: async () => {
      const res = await fetch(`/api/users/${id}`);
      if (!res.ok) throw new Error('Failed to fetch user');
      return res.json();
    },
    enabled: !!id,
  });
}