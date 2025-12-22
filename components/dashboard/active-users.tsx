'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import Link from 'next/link';
import { UserAvatar } from '@/components/users/user-avatar';

interface ActiveUsersProps {
  users: { id: string; name: string; avatar: string | null; posts: number }[];
}

export function ActiveUsers({ users }: ActiveUsersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Top Contributors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {users.map((user, index) => (
            <Link
              key={user.id}
              href={`/users/${user.id}`}
              className="flex items-center gap-3 rounded-lg p-2 -mx-2 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {index + 1}
              </div>
              <UserAvatar name={user.name} avatarUrl={user.avatar} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{user.name}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                {user.posts} posts
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}