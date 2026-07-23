import 'dotenv/config'
import { PrismaClient } from './generated/prisma'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import ws from 'ws'

neonConfig.webSocketConstructor = ws

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_cCWo2bVGRt5s@ep-gentle-sound-axyewasy-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require';
  console.log("Using connection string for adapter:", connectionString);
  const adapter = new PrismaNeon({ connectionString });
  
  return new PrismaClient({ adapter })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
