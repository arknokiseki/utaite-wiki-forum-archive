'use client';

import { Badge } from '@/components/ui/badge';
import { getBadgeInfo, cn } from '@/lib/utils';
import { Shield, Star, Crown, Wrench, MessageSquare } from 'lucide-react';

interface UserBadgeProps {
  badge: string | null;
  className?: string;
}

const badgeIcons: Record<string, typeof Shield> = {
  'badge:sysop': Crown,
  'badge:staff': Star,
  'badge:threadmoderator': Shield,
  'badge:content-moderator': Wrench,
  'badge:soap': MessageSquare,
};

export function UserBadge({ badge, className }: UserBadgeProps) {
  if (!badge) return null;

  const { label, color } = getBadgeInfo(badge);
  const Icon = badgeIcons[badge] || Shield;

  return (
    <Badge className={cn(color, 'gap-1', className)}>
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
}