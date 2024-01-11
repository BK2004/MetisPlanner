import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const prismaGlobal = globalThis as unknown as {
    prisma: any
}

export const prisma = prismaGlobal.prisma ?? new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") {
    // Use development environment, set global variable
    prismaGlobal.prisma = prisma;
}