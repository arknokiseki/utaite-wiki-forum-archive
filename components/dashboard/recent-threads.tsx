'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, ArrowUpRight } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';
import type { ThreadWithAuthor } from '@/types';
import { UserAvatar } from '@/components/users/user-avatar';

interface RecentThreadsProps {
  threads: ThreadWithAuthor[];
}

export function RecentThreads({ threads }: RecentThreadsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Recent Discussions
          </CardTitle>
          <Link
            href="/forums"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View all
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {threads.map((thread) => (
            <Link
              key={thread.id}
              href={`/threads/${thread.id}`}
              className="block group"
            >
              <div className="flex items-start gap-3 rounded-lg p-2 -mx-2 transition-colors hover:bg-muted/50">
                <UserAvatar
                  name={thread.author_name}
                  avatarUrl={thread.author_avatar}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                    {thread.title || 'Untitled Thread'}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>{thread.author_name || 'Anonymous'}</span>
                    <span>•</span>
                    <span>{formatRelativeTime(thread.created_epoch_seconds)}</span>
                    <span>•</span>
                    <span>{thread.post_count} replies</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}