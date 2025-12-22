'use client';

import { Card, CardContent } from '@/components/ui/card';
import { UserAvatar } from '@/components/users/user-avatar';
import { UserBadge } from '@/components/users/user-badge';
import { formatDateTime } from '@/lib/utils';
import type { PostWithAuthor } from '@/types';

export function PostCard({ post }: { post: PostWithAuthor }) {
  return (
    <Card id={post.id}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 hidden sm:block">
            <UserAvatar 
              name={post.author_name} 
              avatarUrl={post.author_avatar}
              size="md"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm sm:text-base">
                  {post.author_name}
                </span>
                <UserBadge badge={post.author_badge} />
                <span className="text-xs text-muted-foreground">
                  • {formatDateTime(post.created_epoch_seconds)}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                #{post.position}
              </span>
            </div>
            
            <div className="prose dark:prose-invert max-w-none text-sm sm:text-base">
              <div className="whitespace-pre-wrap">
                {post.raw_content}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}