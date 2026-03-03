import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaInitFailed: boolean | undefined;
};

function createPrismaClient(): PrismaClient | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return null;
  }
  try {
    const adapter = new PrismaNeon({ connectionString });
    return new PrismaClient({ adapter });
  } catch (error) {
    console.error("Failed to initialize Prisma client:", error);
    return null;
  }
}

function getPrismaClient(): PrismaClient | null {
  if (globalForPrisma.prismaInitFailed) {
    return null;
  }
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }
  const client = createPrismaClient();
  if (!client) {
    globalForPrisma.prismaInitFailed = true;
    return null;
  }
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }
  return client;
}

/** Prisma client instance. May be null if DATABASE_URL is not configured. */
export const prisma = getPrismaClient();

/**
 * Returns a valid PrismaClient or throws a descriptive error.
 * Use in API routes and server components that require database access.
 */
export function requirePrisma(): PrismaClient {
  const client = getPrismaClient();
  if (!client) {
    throw new Error("Database is not configured. Set the DATABASE_URL environment variable.");
  }
  return client;
}
