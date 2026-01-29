'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Music, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MobileNav } from './mobile-nav';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <MobileNav />
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg">
            <Image
              src="https://static.wikitide.net/utaitewiki/e/e6/Site-logo.png"
              alt="Utaite Wiki's Logo"
              width={48}
              height={48}
            />
          </div>
          <span className="hidden font-bold text-xl md:inline-block">
            Utaite Wiki Forum Archive
          </span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 md:max-w-md md:mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 bg-muted/50"
            />
          </div>
        </form>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="https://utaite.wiki"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Wiki
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}