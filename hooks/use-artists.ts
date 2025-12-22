import { useQuery } from '@tanstack/react-query';
import type { ArtistStats } from '@/lib/queries/artists';

export function useArtists(limit: number = 50) {
  return useQuery<ArtistStats[]>({
    queryKey: ['artists', limit],
    queryFn: async () => {
      const res = await fetch(`/api/artists?limit=${limit}`);
      if (!res.ok) throw new Error('Failed to fetch artists');
      return res.json();
    },
  });
}

export function useArtistThreads(name: string) {
  return useQuery<{ name: string; threadIds: string[] }>({
    queryKey: ['artist', name],
    queryFn: async () => {
      const res = await fetch(`/api/artists?name=${encodeURIComponent(name)}`);
      if (!res.ok) throw new Error('Failed to fetch artist threads');
      return res.json();
    },
    enabled: !!name,
  });
}