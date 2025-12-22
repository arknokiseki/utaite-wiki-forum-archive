'use client';

import { useState } from 'react';
import { useUsers } from '@/hooks/use-users';
import { Card, CardContent } from '@/components/ui/card';
import { UserAvatar } from '@/components/users/user-avatar';
import { UserBadge } from '@/components/users/user-badge';
import { Pagination } from '@/components/shared/pagination';
import { UserListSkeleton } from '@/components/shared/loading-skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<'posts' | 'name'>('posts');
  const { data, isLoading } = useUsers(page, 50, sortBy);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">Community members</p>
        </div>
        <Tabs defaultValue="posts" onValueChange={(v) => setSortBy(v as any)}>
          <TabsList>
            <TabsTrigger value="posts">Most Active</TabsTrigger>
            <TabsTrigger value="name">Name (A-Z)</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <UserListSkeleton />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.data.map((user) => (
            <Link key={user.id} href={`/users/${user.id}`}>
              <Card className="h-full hover:border-primary/50 transition-colors">
                <CardContent className="p-4 flex items-center gap-4">
                  <UserAvatar name={user.name} avatarUrl={user.avatar_url} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{user.name}</p>
                      {user.badge_permission && (
                        <UserBadge badge={user.badge_permission} className="scale-75 origin-left" />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {user.post_count} posts • {user.thread_count} threads
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {data && (
        <Pagination 
          page={page} 
          totalPages={data.totalPages} 
          onPageChange={setPage} 
        />
      )}
    </div>
  );
}