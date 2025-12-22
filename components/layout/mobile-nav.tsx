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
  Music,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SheetClose } from '@/components/ui/sheet';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Forums', href: '/forums', icon: MessageSquare },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Artists', href: '/artists', icon: Mic2 },
  { name: 'Polls', href: '/polls', icon: BarChart3 },
  { name: 'Search', href: '/search', icon: Search },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <Music className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="font-bold text-xl">Utaite Wiki</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="flex flex-col gap-1">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <SheetClose asChild key={item.name}>
                <Link
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
              </SheetClose>
            );
          })}
        </div>
      </nav>
    </div>
  );
}