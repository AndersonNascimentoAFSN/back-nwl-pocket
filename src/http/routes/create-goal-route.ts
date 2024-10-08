import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createGoal } from '../../use-cases/create-goal'

export const createGoalRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.post(
    '/goals',
    {
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
      },
    },
    async (request, reply) => {
      const { title, desiredWeeklyFrequency } = request.body

      const goal = await createGoal({
        title,
        desiredWeeklyFrequency,
      })

      reply.send(goal).code(201)
    }
  )
}
