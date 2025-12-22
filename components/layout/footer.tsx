'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Music, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

function DeviousTwitterBtn() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const runAway = () => {
    const randomX = Math.floor(Math.random() * 300) - 150;
    const randomY = Math.floor(Math.random() * 300) - 150;
    
    setPosition({ x: randomX, y: randomY });
    setIsHovered(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("🚫 Go touch grass, fellow traveler!");
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={runAway}
    >
      <Button 
        variant="outline" 
        size="icon" 
        className={cn(
          "h-9 w-9 transition-transform duration-100 ease-in-out",
          isHovered && "border-destructive text-destructive hover:text-destructive hover:bg-destructive/10"
        )}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        onClick={handleClick}
        title="Don't even think about it"
      >
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>X</title><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/></svg>
        <span className="sr-only">Twitter</span>
      </Button>
    </div>
  );
}

// 2. The Main Footer
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30 pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Music className="h-4 w-4" />
              </div>
              <span>Utaite Wiki</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              The ultimate community archive for Utaite, Youtaite, and vocal artists. 
              Preserving discussions, history, and the culture we love.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Community</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/forums" className="hover:text-primary transition-colors">
                  Forums
                </Link>
              </li>
              <li>
                <Link href="/users" className="hover:text-primary transition-colors">
                  Members
                </Link>
              </li>
              <li>
                <Link href="/artists" className="hover:text-primary transition-colors">
                  Artists Database
                </Link>
              </li>
              <li>
                <Link href="/polls" className="hover:text-primary transition-colors">
                  Polls & Surveys
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="https://utaite.wiki/wiki/UW:WR" className="hover:text-primary transition-colors">
                  Wiki Guidelines
                </Link>
              </li>
              <li>
                <Link href="https://utaite.wiki/wiki/Project:Copyrights" className="hover:text-primary transition-colors">
                  Content Policy
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li> */}
            </ul>
          </div>

          {/* SNS */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9" asChild>
                <Link href="https://github.com/arknokiseki" target="_blank" rel="noreferrer">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              
              <DeviousTwitterBtn />
              
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Utaite Wiki. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-current" /> by 
            <Link href="https://utaite.wiki/wiki/User:Makudoumee" className="ml-1 hover:text-primary transition-colors">Ark</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}