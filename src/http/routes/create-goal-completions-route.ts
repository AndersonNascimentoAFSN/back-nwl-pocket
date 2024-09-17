import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createGoalCompletion } from '../../use-cases/create-goal-completion'

export const createGoalCompletionsRoute: FastifyPluginAsyncZod = async (
  app,
  _opts
) => {
  app.post(
    '/goal-completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { goalId } = request.body

      const goal = await createGoalCompletion({
        goalId,
      })

      reply.send(goal).code(201)
    }
  )
}
