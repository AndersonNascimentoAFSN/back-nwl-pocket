import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../../use-cases/get-week-pending-goals'

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async (
  app,
  _opts
) => {
  app.get('/pending-goals', async (request, reply) => {
    const pendingGoals = await getWeekPendingGoals()

    reply.send(pendingGoals).code(200)
  })
}
