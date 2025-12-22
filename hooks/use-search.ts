import { useQuery } from '@tanstack/react-query';
import type { SearchResult } from '@/types';

export function useSearch(query: string, type?: 'threads' | 'all') {
  return useQuery<SearchResult[]>({
    queryKey: ['search', query, type],
    queryFn: async () => {
      const params = new URLSearchParams({ q: query });
      if (type) params.set('type', type);
      const res = await fetch(`/api/search?${params}`);
      if (!res.ok) throw new Error('Search failed');
      return res.json();
    },
    enabled: query.length >= 2,
  });
}