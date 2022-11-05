import Fastify from 'fastify'
import { prisma } from './clients/Prisma'
import cors from '@fastify/cors'

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  fastify.get('/users', async () => {
    const users = await prisma.user.findMany({
      where: {
        name: {
          startsWith: 'm',
        },
      },
    })
    return { users }
  })
  await fastify.listen({ port: 4000 /*host: '0.0.0.0' */ })
}

bootstrap()
