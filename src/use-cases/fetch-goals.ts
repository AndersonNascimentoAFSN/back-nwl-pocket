import { count } from "drizzle-orm";
import { db } from "../db"
import { goals } from "../db/schema"

interface FetchGoals {
  page: number
  limit: number
}

export async function fetchGoals({
  page = 1,
  limit = 10
}: FetchGoals) {
  const offset = (page - 1) * limit;

  const [{ count: total }] = await db.select({ count: count() }).from(goals);

  // const results = await db.execute(
  //   `SELECT *, COUNT(*) OVER() AS total 
  //    FROM goals
  //    ORDER BY id
  //    LIMIT $1 OFFSET $2`,
  //   [limit, offset]
  // );

  const data = await db
    .select()
    .from(goals)
    .orderBy(goals.id)
    .limit(limit)
    .offset(offset)

  return {
    data,
    limit,
    page,
    total: total || 0,
  }
}