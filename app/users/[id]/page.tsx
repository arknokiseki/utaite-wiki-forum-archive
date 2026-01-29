'use client';

import { use } from 'react';
import Link from 'next/link';
import { useUser } from '@/hooks/use-users';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserAvatar } from '@/components/users/user-avatar';
import { UserBadge } from '@/components/users/user-badge';
import { MessageWall } from '@/components/users/message-wall';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageSquare, ThumbsUp, MessagesSquare } from 'lucide-react';

export default function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: user, isLoading } = useUser(id);

  if (isLoading) return <div className="p-8"><Skeleton className="h-64 w-full" /></div>;
  if (!user) return <div className="p-8">User not found</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card className="border-t-4 border-t-primary">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <UserAvatar 
              name={user.name} 
              avatarUrl={user.avatar_url} 
              className="h-24 w-24 md:h-32 md:w-32"
            />
            <div className="text-center md:text-left space-y-2 flex-1">
              <Link href={`https://utaite.fandom.com/wiki/User:${user.name}`} target="_blank" rel="noreferrer noopener" className=" text-blue-400 hover:text-blue-500 transition-colors">
                <h1 className="text-3xl font-bold">{user.name}</h1>
              </Link>
              {user.badge_permission && (
                <div className="flex justify-center md:justify-start">
                  <UserBadge badge={user.badge_permission} />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-4 md:gap-8 w-full md:w-auto text-center">
              <div>
                <div className="font-bold text-2xl">{user.thread_count}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Threads</div>
              </div>
              <div>
                <div className="font-bold text-2xl">{user.post_count}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Posts</div>
              </div>
              <div>
                <div className="font-bold text-2xl">{user.total_upvotes}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Karma</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> Threads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.thread_count}</div>
            <p className="text-xs text-muted-foreground">Discussions started</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessagesSquare className="h-4 w-4" /> Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.post_count}</div>
            <p className="text-xs text-muted-foreground">Replies made</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ThumbsUp className="h-4 w-4" /> Reputation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{user.total_upvotes}</div>
            <p className="text-xs text-muted-foreground">Total upvotes received</p>
          </CardContent>
        </Card>
      </div>

      {/* Message Wall */}
      <MessageWall userId={user.id} />
    </div>
  );
}