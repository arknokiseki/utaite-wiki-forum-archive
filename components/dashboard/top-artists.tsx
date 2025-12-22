'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic2 } from 'lucide-react';
import Link from 'next/link';

interface TopArtistsProps {
  artists: { name: string; count: number }[];
}

export function TopArtists({ artists }: TopArtistsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic2 className="h-5 w-5 text-primary" />
          Most Discussed Artists
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {artists.map((artist, index) => (
            <Link
              key={artist.name}
              href={`/artists?highlight=${encodeURIComponent(artist.name)}`}
            >
              <Badge
                variant={index < 3 ? 'default' : 'secondary'}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                {artist.name}
                <span className="ml-1 opacity-70">({artist.count})</span>
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}