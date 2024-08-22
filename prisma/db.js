import { PrismaClient } from '@prisma/client'
import { Redis } from 'ioredis'
import { getCacheKey, getCacheKeyPattern, PrismaExtensionRedis } from 'prisma-extension-redis'

const redis = new Redis()

const cache = {
  ttl: 60,
  storage: {
    type: 'redis',
    options: {
      client: redis,
      invalidation: { referencesTTL: 60 }, 
      log: console
    }
  }
}

const prismaClientSingleton = () => {
  const client = new PrismaClient()
  return client.$extends(
    PrismaExtensionRedis({ cache, redis })
  )
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export { prisma, getCacheKey, getCacheKeyPattern }

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma