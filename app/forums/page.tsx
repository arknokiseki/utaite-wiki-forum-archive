'use client';

import { useForums } from '@/hooks/use-forums';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, MessagesSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function ForumsPage() {
  const { data: forums, isLoading, error } = useForums();

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load forums</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Forums</h1>
        <p className="text-muted-foreground mt-1">
          Browse discussion categories
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-full mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))
          : forums
              ?.filter((f) => f.name !== 'Root Forum')
              .map((forum) => (
                <Link key={forum.id} href={`/forums/${forum.id}`}>
                  <Card className="h-full transition-all hover:shadow-md hover:border-primary/50 cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {forum.name}
                        </CardTitle>
                        <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <CardDescription className="line-clamp-2">
                        {forum.description || 'No description available'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{forum.thread_count} threads</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessagesSquare className="h-4 w-4" />
                          <span>{forum.post_count} posts</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
      </div>
    </div>
  );
}