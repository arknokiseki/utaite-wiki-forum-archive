'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Mic2,
  BarChart3,
  Search,
  MessagesSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Forums', href: '/forums', icon: MessageSquare },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Artists', href: '/artists', icon: Mic2 },
  { name: 'Polls', href: '/polls', icon: BarChart3 },
  { name: 'Search', href: '/search', icon: Search },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r bg-muted/30 md:block">
      <nav className="flex flex-col gap-1 p-4">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Stats Preview */}
      <div className="border-t p-4">
        <div className="rounded-lg bg-primary/10 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <MessagesSquare className="h-4 w-4" />
            Community Stats
          </div>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Threads</span>
              <span className="font-medium">1,155</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Posts</span>
              <span className="font-medium">5,779</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Users</span>
              <span className="font-medium">1,782</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}