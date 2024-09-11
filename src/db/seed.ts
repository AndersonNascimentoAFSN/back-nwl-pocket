import dayjs from 'dayjs'
import { db, client } from "./index"
import { goals, goalCompletions } from "./schema"

(async function seed() {
  await db.delete(goals)
  await db.delete(goalCompletions)

  const result = await db.insert(goals).values([
    { title: 'Learn to cook', desiredWeeklyFrequency: 3 },
    { title: 'Learn to dance', desiredWeeklyFrequency: 2 },
    { title: 'Learn to code', desiredWeeklyFrequency: 5 },
  ]).returning()


  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: new Date() },
    { goalId: result[1].id, createdAt: new Date() },
    // { goalId: result[2].id, createdAt: new Date() },

    // { goalId: result.at(0)?.id as string, createdAt: startOfWeek.toDate() },
    // { goalId: result.at(1)?.id as string, createdAt: startOfWeek.add(1, 'day').toDate() },
    // { goalId: result.at(2)?.id as string, createdAt: startOfWeek.add(1, 'day').toDate() },
  ])

})()
  .finally(() => client.end())