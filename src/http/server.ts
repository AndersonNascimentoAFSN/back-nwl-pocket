import fastify from 'fastify'
import z from 'zod'

import { env } from '../env'
import { createGoal } from '../use-cases/create-goal'
import { fetchGoals } from '../use-cases/fetch-goals'

const app = fastify()

app.post('/goals', async (request, reply) => {
  const createGoalSchema = z.object({
    title: z.string(),
    desiredWeeklyFrequency: z.number(),
  })

  const body = createGoalSchema.safeParse(request.body)

  if (body.error) {
    reply.send(body.error.errors).code(400)
    return
  }

  const goal = await createGoal({
    title: body.data.title,
    desiredWeeklyFrequency: body.data.desiredWeeklyFrequency,
  })

  reply.send(goal).code(201)
})

app.get('/goals', async (request, reply) => {
  const query = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
  }).safeParse(request.query)

  if (query.error) {
    reply.send(query.error.errors).code(400)
    return
  }

  const goal = await fetchGoals(query.data)

  reply.send(goal).code(200)
})

app.listen({
  port: env.PORT,
}).then(() => {
  console.log(`Server is running on http://localhost:${env.PORT}`)
})