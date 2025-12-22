'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserAvatar } from '@/components/users/user-avatar';
import { formatDateTime } from '@/lib/utils';
import type { ThreadWithAuthor } from '@/types';
import { ThumbsUp } from 'lucide-react';
import Link from 'next/link';

export function ThreadDetail({ thread }: { thread: ThreadWithAuthor }) {
  return (
    <Card className="border-primary/20">
      <CardHeader className="bg-muted/30 pb-4">
        <div className="flex items-center justify-between">
          <Link href={`/users/${thread.author_name}`}>
            <div className="flex items-center gap-3">
              <UserAvatar 
                name={thread.author_name} 
                avatarUrl={thread.author_avatar}
                size="md"
              />
              <div>
                <div className="font-semibold text-primary">
                  {thread.author_name}
                </div>
                <div className="text-xs text-muted-foreground">
                  Posted {formatDateTime(thread.created_epoch_seconds)}
                </div>
              </div>
            </div>
          </Link>
          {thread.is_locked && (
            <Badge variant="destructive">Locked</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="prose dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap">
            {thread.raw_content || 'No content provided.'}
          </div>
        </div>
        
        <div className="mt-6 flex items-center gap-4 pt-4 border-t">
          <div className="flex items-center gap-1 text-muted-foreground">
            <ThumbsUp className="h-4 w-4" />
            <span className="text-sm">{thread.upvote_count} Upvotes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}