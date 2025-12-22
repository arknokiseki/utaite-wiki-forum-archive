import { useQuery } from '@tanstack/react-query';
import type { PostWithAuthor } from '@/types';

export function usePosts(threadId: string) {
  return useQuery<PostWithAuthor[]>({
    queryKey: ['posts', threadId],
    queryFn: async () => {
      const res = await fetch(`/api/posts/${threadId}`);
      if (!res.ok) throw new Error('Failed to fetch posts');
      return res.json();
    },
    enabled: !!threadId,
  });
}