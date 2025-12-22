'use client';

import { useArtists } from '@/hooks/use-artists';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic2 } from 'lucide-react';
import Link from 'next/link';

export default function ArtistsPage() {
  const { data: artists, isLoading } = useArtists(100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Artists</h1>
        <p className="text-muted-foreground">Browse discussions by Utaite</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic2 className="h-5 w-5 text-primary" />
            Top Discussed Artists
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
             <div className="flex gap-2">Loading...</div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {artists?.map((artist, i) => (
                <Link key={artist.name} href={`/search?q=${encodeURIComponent(artist.name)}&type=threads`}>
                  <Badge 
                    variant={i < 5 ? "default" : "secondary"}
                    className="text-base py-1 px-3 cursor-pointer hover:opacity-80"
                  >
                    {artist.name}
                    <span className="ml-2 bg-black/10 dark:bg-white/10 rounded-full px-1.5 text-xs">
                      {artist.thread_count}
                    </span>
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}