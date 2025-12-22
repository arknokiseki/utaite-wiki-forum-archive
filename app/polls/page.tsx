'use client';

import { usePolls } from '@/hooks/use-polls';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function PollsPage() {
  const { data: polls, isLoading } = usePolls();

  if (isLoading) return <div>Loading polls...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Community Polls</h1>
        <p className="text-muted-foreground">See what the community thinks</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {polls?.map((poll) => (
          <Card key={poll.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-start gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-primary mt-1 shrink-0" />
                <Link href={`/threads/${poll.thread_id}`} className="hover:underline">
                  {poll.question || poll.thread_title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              {poll.answers.map((answer) => {
                const percentage = poll.total_votes > 0 
                  ? Math.round((answer.votes / poll.total_votes) * 100) 
                  : 0;
                
                return (
                  <div key={answer.id} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{answer.text}</span>
                      <span className="text-muted-foreground">{percentage}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
              <div className="pt-2 text-xs text-muted-foreground text-right">
                {poll.total_votes} total votes
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}