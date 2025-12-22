'use client';

import { use } from 'react';
import { useThread } from '@/hooks/use-threads';
import { usePosts as useThreadPosts } from '@/hooks/use-posts';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { ThreadDetail } from '@/components/threads/thread-detail';
import { PostCard } from '@/components/posts/post-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: threadData, isLoading: threadLoading } = useThread(id);
  const { data: posts, isLoading: postsLoading } = useThreadPosts(id);

  if (threadLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-50 w-full rounded-lg" />
      </div>
    );
  }

  if (!threadData?.thread) {
    return <div>Thread not found</div>;
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/forums/${threadData.thread.forum_id}`}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{threadData.thread.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>in {threadData.thread.forum_name}</span>
          </div>
        </div>
      </div>

      <ThreadDetail thread={threadData.thread} />

      <div className="flex items-center gap-2 my-8">
        <MessageSquare className="h-5 w-5" />
        <h2 className="text-xl font-semibold">
          {posts?.length || 0} Replies
        </h2>
      </div>

      <div className="space-y-4">
        {postsLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : (
          posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}