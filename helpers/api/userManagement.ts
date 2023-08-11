import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

export const userManagement = {
    createUser,

}

async function createUser({ email, password }: { email: string, password: string})  {
    if (await prisma.user.findUnique({ where: { email } })) {
        throw 'Username already claimed.';
    }

    const user = await prisma.user.create({
        data: {
            email,
            password: bcrypt.hashSync(password, 10),
        }
    });

    return user;
}