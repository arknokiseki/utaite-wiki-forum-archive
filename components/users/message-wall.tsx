'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar } from '@/components/users/user-avatar';
import { UserBadge } from '@/components/users/user-badge';
import { RichTextRenderer } from '@/components/shared/rich-text-renderer';
import { Pagination } from '@/components/shared/pagination';
import { useMessageWall, useMessageWallReplies } from '@/hooks/use-message-wall';
import { formatDateTime } from '@/lib/utils';
import { MessageSquare, ChevronDown, ChevronUp, MessagesSquare } from 'lucide-react';
import type { MessageWallThread } from '@/lib/queries/message-wall';

interface MessageWallProps {
  userId: string;
}

export function MessageWall({ userId }: MessageWallProps) {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, isLoading, isError } = useMessageWall(userId, page, pageSize);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessagesSquare className="h-5 w-5" />
            Message Wall
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessagesSquare className="h-5 w-5" />
            Message Wall
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Failed to load message wall.</p>
        </CardContent>
      </Card>
    );
  }

  const threads = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessagesSquare className="h-5 w-5" />
          Message Wall
          {data?.total ? (
            <span className="text-sm font-normal text-muted-foreground">
              ({data.total} messages)
            </span>
          ) : null}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {threads.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">No messages yet.</p>
          </div>
        ) : (
          <>
            {threads.map((thread) => (
              <MessageThreadCard
                key={thread.id}
                thread={thread}
                userId={userId}
              />
            ))}

            {totalPages > 1 && (
              <div className="pt-4">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

interface MessageThreadCardProps {
  thread: MessageWallThread;
  userId: string;
}

function MessageThreadCard({ thread, userId }: MessageThreadCardProps) {
  const [showReplies, setShowReplies] = useState(false);
  const { data: replies, isLoading: repliesLoading } = useMessageWallReplies(
    userId,
    showReplies ? thread.id : null
  );

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Main message */}
      <div className="p-4 bg-card">
        <div className="flex gap-3">
          <div className="shrink-0">
            <Link href={`/users/${thread.creator_id}`}>
              <UserAvatar
                name={thread.creator_name}
                avatarUrl={thread.creator_avatar}
                size="md"
              />
            </Link>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <Link
                href={`/users/${thread.creator_id}`}
                className="font-semibold hover:underline"
              >
                {thread.creator_name || 'Unknown User'}
              </Link>
              <UserBadge badge={thread.creator_badge} />
              <span className="text-xs text-muted-foreground">
                • {formatDateTime(thread.created_epoch_seconds)}
              </span>
            </div>
            {/* Display thread title if available */}
            {thread.title && (
              <h3 className="font-semibold text-base mb-2">{thread.title}</h3>
            )}
            {/* Display message content if available */}
            {(thread.json_model || thread.raw_content) && (
              <div className="prose dark:prose-invert max-w-none text-sm">
                <RichTextRenderer
                  jsonModel={thread.json_model}
                  fallbackContent={thread.raw_content}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Replies toggle */}
      {thread.post_count > 0 && (
        <div className="border-t">
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center justify-center gap-2 rounded-none h-10"
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Hide replies
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Show {thread.post_count} {thread.post_count === 1 ? 'reply' : 'replies'}
              </>
            )}
          </Button>

          {/* Replies list */}
          {showReplies && (
            <div className="border-t bg-muted/30">
              {repliesLoading ? (
                <div className="p-4 space-y-3">
                  {[...Array(Math.min(thread.post_count, 3))].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : replies && replies.length > 0 ? (
                <div className="divide-y">
                  {replies.map((reply) => (
                    <div key={reply.id} className="p-4">
                      <div className="flex gap-3">
                        <div className="shrink-0">
                          <Link href={`/users/${reply.creator_id}`}>
                            <UserAvatar
                              name={reply.creator_name}
                              avatarUrl={reply.creator_avatar}
                              size="sm"
                            />
                          </Link>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <Link
                              href={`/users/${reply.creator_id}`}
                              className="font-semibold text-sm hover:underline"
                            >
                              {reply.creator_name || 'Unknown User'}
                            </Link>
                            <UserBadge badge={reply.creator_badge} />
                            <span className="text-xs text-muted-foreground">
                              • {formatDateTime(reply.created_epoch_seconds)}
                            </span>
                          </div>
                          <div className="prose dark:prose-invert max-w-none text-sm">
                            <RichTextRenderer
                              jsonModel={reply.json_model}
                              fallbackContent={reply.raw_content}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Replies not yet available.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
