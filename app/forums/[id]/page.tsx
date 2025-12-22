'use client';

import { use, useState } from 'react';
import { useForum } from '@/hooks/use-forums';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { truncateText } from '@/lib/utils';
import { UserAvatar } from '@/components/users/user-avatar';
import { Pagination } from '@/components/shared/pagination';
import { ThreadListSkeleton } from '@/components/shared/loading-skeleton';
import { EmptyState } from '@/components/shared/empty-state';

export default function ForumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useForum(id, page);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load forum</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button & Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/forums">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {data?.forum.name || 'Loading...'}
          </h1>
          {data?.forum.description && (
            <p className="text-muted-foreground mt-1">
              {data.forum.description}
            </p>
          )}
        </div>
      </div>

      {/* Threads List */}
      {isLoading ? (
        <ThreadListSkeleton />
      ) : data?.threads.data.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No threads yet"
          description="This forum doesn't have any discussions yet."
        />
      ) : (
        <div className="space-y-3">
          {data?.threads.data.map((thread) => (
            <Link key={thread.id} href={`/threads/${thread.id}`}>
              <Card className="transition-all hover:shadow-md hover:border-primary/50 cursor-pointer mb-4">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <UserAvatar
                      name={thread.author_name}
                      avatarUrl={thread.author_avatar}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium line-clamp-1 group-hover:text-primary">
                        {thread.title || 'Untitled Thread'}
                      </h3>
                      {thread.raw_content && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {truncateText(thread.raw_content, 150)}
                        </p>
                      )}
                      </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {data && data.threads.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={data.threads.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}