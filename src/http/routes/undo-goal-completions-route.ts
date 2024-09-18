import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { undoGoalCompletion } from '../../use-cases/undo-goal-completion'

export const undoGoalCompletionsRoute: FastifyPluginAsyncZod = async (
  app,
  _opts
) => {
  app.post(
    '/undo-goal-completions',
    {
      schema: {
        body: z.object({
          goalCompletionId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { goalCompletionId } = request.body

      const goal = await undoGoalCompletion({
        goalCompletionId,
      })

      reply.send(goal).code(200)
    }
  )
}
