import fastify from 'fastify'
import dotenv from 'dotenv'
dotenv.config()

const PORT = Number(process.env.PORT) || 3333

const app = fastify()

app.listen({
  port: PORT,
}).then(() => {
  console.log(`Server is running on http://localhost:${PORT}`)
})