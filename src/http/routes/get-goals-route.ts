import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { fetchGoals } from '../../use-cases/fetch-goals';

export const getGoalsRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.get('/goals',
    {
      schema: {
        querystring: z.object({
          page: z.coerce.number().default(1),
          limit: z.coerce.number().default(10),
        }),
      }
    }
    , async (request, reply) => {

      const { query } = request

      const goal = await fetchGoals(query)

      reply.send(goal).code(200)
    })
};