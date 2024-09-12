import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
} from "fastify-type-provider-zod";

import { env } from '../env'

import { getGoalsRoute } from './routes/get-goals-route';
import { createGoalRoute } from './routes/create-goal-route';
import { getWeekSummaryRoute } from './routes/get-week-summary-route';
import { getPendingGoalsRoute } from './routes/get-pending-goals-route';
import { createGoalCompletionsRoute } from './routes/create-goal-completions-route';
import fastifyCors from '@fastify/cors';


const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(getGoalsRoute)
app.register(createGoalRoute)
app.register(getWeekSummaryRoute)
app.register(getPendingGoalsRoute)
app.register(createGoalCompletionsRoute)

app.listen({
  port: env.PORT,
}).then(() => {
  console.log(`Server is running on http://localhost:${env.PORT}`)
})