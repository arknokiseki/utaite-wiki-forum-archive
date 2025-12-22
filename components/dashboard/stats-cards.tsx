'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, MessagesSquare, Users, BarChart3 } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    totalThreads: number;
    totalPosts: number;
    totalUsers: number;
    totalPolls: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Threads',
      value: stats.totalThreads.toLocaleString(),
      icon: MessageSquare,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Total Posts',
      value: stats.totalPosts.toLocaleString(),
      icon: MessagesSquare,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      title: 'Community Members',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
    {
      title: 'Polls Created',
      value: stats.totalPolls.toLocaleString(),
      icon: BarChart3,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <div className={`rounded-lg p-2 ${card.bg}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}