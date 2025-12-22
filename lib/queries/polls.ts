import { db } from '@/lib/db';
import type { Poll, PollAnswer, PollWithAnswers } from '@/types';

export async function getAllPolls(): Promise<PollWithAnswers[]> {
  const pollsQuery = `
    SELECT p.*, dt.title as thread_title
    FROM Polls p
    LEFT JOIN DiscussionThreads dt ON p.thread_id = dt.id
    ORDER BY p.total_votes DESC
  `;

  const pollsResult = await db.execute(pollsQuery);
  const polls = pollsResult.rows as unknown as (Poll & { thread_title: string })[];

  const answersQuery = `
    SELECT * FROM PollAnswers
    WHERE poll_id = ?
    ORDER BY position ASC
  `;

  // Use Promise.all to fetch answers in parallel
  const results = await Promise.all(
    polls.map(async (poll) => {
      const answersResult = await db.execute({ 
        sql: answersQuery, 
        args: [poll.id] 
      });
      return {
        ...poll,
        answers: answersResult.rows as unknown as PollAnswer[],
      };
    })
  );

  return results;
}

export async function getPollById(id: number): Promise<PollWithAnswers | null> {
  const pollQuery = `SELECT * FROM Polls WHERE id = ?`;
  const pollResult = await db.execute({ sql: pollQuery, args: [id] });
  const poll = pollResult.rows[0] as unknown as Poll | undefined;

  if (!poll) return null;

  const answersQuery = `
    SELECT * FROM PollAnswers
    WHERE poll_id = ?
    ORDER BY position ASC
  `;
  
  const answersResult = await db.execute({ 
    sql: answersQuery, 
    args: [id] 
  });

  return {
    ...poll,
    answers: answersResult.rows as unknown as PollAnswer[],
  };
}