'use client';

import { useSearchParams } from 'next/navigation';
import { useSearch } from '@/hooks/use-search';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserAvatar } from '@/components/users/user-avatar';
import { Search, Loader2 } from 'lucide-react';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { formatRelativeTime } from '@/lib/utils';
import { useRouter } from 'next/navigation';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();
  
  const { data: results, isLoading } = useSearch(initialQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Search</h1>
        <p className="text-muted-foreground">Find threads, posts, and users</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            placeholder="Search keywords..."
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      {isLoading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      <div className="space-y-4">
        {results?.map((result) => (
          <Link 
            key={`${result.type}-${result.id}`} 
            href={result.type === 'user' ? `/users/${result.id}` : `/threads/${result.id}`}
          >
            <Card className="hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {result.type === 'user' ? (
                      <UserAvatar name={result.title} avatarUrl={null} />
                    ) : (
                      <div className="h-8 w-8 rounded bg-muted flex items-center justify-center text-xs uppercase font-bold text-muted-foreground">
                        {result.type[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{result.title}</h3>
                    {result.content && (
                      <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                        {result.content}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span className="capitalize">{result.type}</span>
                      {result.author && <span>• by {result.author}</span>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {results?.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No results found for "{initialQuery}"
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}