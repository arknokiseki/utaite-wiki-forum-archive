import { useQuery } from '@tanstack/react-query';
import type { PaginatedResponse } from '@/types';
import type { MessageWallThread, MessageWallPost } from '@/lib/queries/message-wall';

export function useMessageWall(userId: string, page: number = 1, pageSize: number = 20) {
  return useQuery<PaginatedResponse<MessageWallThread>>({
    queryKey: ['messageWall', userId, page, pageSize],
    queryFn: async () => {
      const res = await fetch(
        `/api/users/${encodeURIComponent(userId)}/message-wall?page=${page}&pageSize=${pageSize}`
      );
      if (!res.ok) throw new Error('Failed to fetch message wall');
      return res.json();
    },
    enabled: !!userId,
  });
}

export function useMessageWallReplies(userId: string, threadId: string | null) {
  return useQuery<MessageWallPost[]>({
    queryKey: ['messageWallReplies', userId, threadId],
    queryFn: async () => {
      const res = await fetch(
        `/api/users/${encodeURIComponent(userId)}/message-wall?threadId=${threadId}`
      );
      if (!res.ok) throw new Error('Failed to fetch replies');
      return res.json();
    },
    enabled: !!userId && !!threadId,
  });
}
