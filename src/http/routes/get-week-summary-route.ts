import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekSummary } from '../../use-cases/get-week-summary'

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async (
  app,
  _opts
) => {
  app.get('/week-summary', async (request, reply) => {
    const weekSummary = await getWeekSummary()

    reply.send(weekSummary).code(200)
  })
}
