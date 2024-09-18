import fastify from 'fastify'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { env } from '../env'

import fastifyCors from '@fastify/cors'
import { createGoalCompletionsRoute } from './routes/create-goal-completions-route'
import { createGoalRoute } from './routes/create-goal-route'
import { getGoalsRoute } from './routes/get-goals-route'
import { getPendingGoalsRoute } from './routes/get-pending-goals-route'
import { getWeekSummaryRoute } from './routes/get-week-summary-route'
import { undoGoalCompletionsRoute } from './routes/undo-goal-completions-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(getGoalsRoute)
app.register(createGoalRoute)
app.register(getWeekSummaryRoute)
app.register(getPendingGoalsRoute)
app.register(createGoalCompletionsRoute)
app.register(undoGoalCompletionsRoute)

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.info(`Server is running on http://localhost:${env.PORT}`)
  })
  .catch(error => {
    console.error(error.message)
    process.exit(1)
  })
