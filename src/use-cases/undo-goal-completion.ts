import dayjs from 'dayjs'
import { and, eq, gte, lte } from 'drizzle-orm'

import { db } from '../db'
import { goalCompletions } from '../db/schema'

interface UndoGoalCompletionRequest {
  goalCompletionId: string
}

export async function undoGoalCompletion({
  goalCompletionId,
}: UndoGoalCompletionRequest) {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const [goalHasCompletionInThisWeek] = await db
    .select()
    .from(goalCompletions)
    .where(
      and(
        gte(goalCompletions.createdAt, firstDayOfWeek),
        lte(goalCompletions.createdAt, lastDayOfWeek),
        eq(goalCompletions.id, goalCompletionId)
      )
    )
    .limit(1)
    .execute()

  if (!goalHasCompletionInThisWeek) {
    throw new Error('Goal has not been completed this week!')
  }

  const [undoGoalCompletion] = await db
    .delete(goalCompletions)
    .where(
      and(
        gte(goalCompletions.createdAt, firstDayOfWeek),
        lte(goalCompletions.createdAt, lastDayOfWeek),
        eq(goalCompletions.id, goalCompletionId)
      )
    )
    .returning()
    .execute()

  return {
    undoGoalCompletion,
  }
}
