'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAvatarUrl, cn } from '@/lib/utils';

interface UserAvatarProps {
  name: string | null;
  avatarUrl: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
};

export function UserAvatar({ name, avatarUrl, size = 'md', className }: UserAvatarProps) {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '??';

  return (
    <Avatar className={cn(sizes[size], className)}>
      <AvatarImage src={getAvatarUrl(avatarUrl)} alt={name || 'User'} />
      <AvatarFallback className="bg-primary/10 text-primary text-xs">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}