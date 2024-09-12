import fastify from 'fastify'
import z from 'zod'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
} from "fastify-type-provider-zod";

import { env } from '../env'
import { createGoal } from '../use-cases/create-goal'
import { fetchGoals } from '../use-cases/fetch-goals'
import { getWeekPendingGoals } from '../use-cases/get-week-pending-goals';
import { createGoalCompletion } from '../use-cases/create-goal-completion';

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


app.get('/pending-goals', async (request, reply) => {
  const pendingGoals = await getWeekPendingGoals()

  reply.send(pendingGoals).code(200)
})

app.post('/goal-completions',
  {
    schema: {
      body: z.object({
        goalId: z.string(),
      }),
    },
  }, async (request, reply) => {
    const { goalId } = request.body
    console.log('goalId', goalId)

    const goal = await createGoalCompletion({
      goalId,
    })

    reply.send(goal).code(201)
  })

app.post('/goals',
  {
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeeklyFrequency: z
          .number()
          .int()
          .min(1)
          .max(7),
      }),
    },
  }, async (request, reply) => {
    const { title, desiredWeeklyFrequency } = request.body

    const goal = await createGoal({
      title,
      desiredWeeklyFrequency,
    })

    reply.send(goal).code(201)
  })

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
    // const query = z.object({
    //   page: z.coerce.number().default(1),
    //   limit: z.coerce.number().default(10),
    // }).safeParse(request.query)

    // if (query.error) {
    //   reply.send(query.error.errors).code(400)
    //   return
    // }
    const { query } = request

    const goal = await fetchGoals(query)

    reply.send(goal).code(200)
  })

app.listen({
  port: env.PORT,
}).then(() => {
  console.log(`Server is running on http://localhost:${env.PORT}`)
})