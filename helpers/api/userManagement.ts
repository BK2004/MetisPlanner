import { NextResponse } from 'next/server';
import { prisma } from '..';
import { assignToken, getUser, signOut } from './';

const { MongoClient } = require("mongodb");
const bcrypt = require('bcryptjs');

const mongoClient = new MongoClient(process.env.MONGODB_URI);

// Create TTL index on verifications & passwordChanges collections
try {
    const db = mongoClient.db("planner");
    const verificationsCol = db.collection("Verifications");
    const passwordChangesCol = db.collection("PasswordChanges");

    verificationsCol.createIndex({ createdAt: 1 }, { expireAfterSeconds: 60 * 15 }) // Create index that defaults to expire after 15 minutes
    passwordChangesCol.createIndex({ createdAt: 1 }, { expireAfterSeconds: 60 * 10 }) // Create index that defaults to expire after 10 minutes
} catch(e) {} finally {
    mongoClient.close();
}

export const userManagement = {
    verifyUser,
    registerUser,
    logIn,
    requestPasswordChange,
    finalizePasswordChange
}

type User = {
    id: string | undefined,
    email: string,
    password: string,
}

function hashPassword(text: string) {
    return bcrypt.hashSync(text, 10);
}

async function verifyUser({ verificationId }: { verificationId: string }) {
    const verification = await prisma.verifications.findUnique({ where: {
        id: verificationId
    }})

    if (!verification) {
        throw 'Invalid verification attempt';
    }

    // Valid verification attempt, register user's account and remove document from verification collection
    const user = await prisma.users.create({
        data: {
            email: verification.email,
            password: verification.password,
        }
    })
    
    await prisma.verifications.delete({ where: { id: verificationId }});

    await assignToken(user);
}

async function registerUser({ email, password }: User)  {
    if (!email || !password) {
        throw 'Invalid arguments';
    }
    if (await prisma.verifications.findUnique({ where: { email } }) || await prisma.users.findUnique({ where: { email } })) {
        throw 'Email already active.';
    }

    // Create verification document
    const verification = await prisma.verifications.create({
        data: {
            email,
            password: hashPassword(password),
        }
    });

    if (!verification) throw 'Internal server error';
    
    return verification;
}

async function logIn({ email, password }: User) {
    if (!email || !password) {
        throw "Invalid arguments";
    }

    if (await getUser()) {
        throw "Already logged in";
    }

    // Attempt to retrieve user based on credentials
    const user = await prisma.users.findUnique({ where: {
        email,
    }});

    if (!user) {
        // Invalid email or user not signed up
        throw 'Invalid email';
    }

    if (!bcrypt.compareSync(password, user.password)) {
        throw 'Invalid credentials'
    }

    await assignToken(user);

    return user;
}

async function requestPasswordChange(email: string) {
    if (!(await prisma.users.findUnique({ where: { email: email }}))) throw 'Invalid email';

    if ((await prisma.passwordChanges.findUnique({ where: {
        email: email
    }}))) {
        // Overwrite existing entry
        await prisma.passwordChanges.delete({ where: { email: email }});
    }
    const res = await prisma.passwordChanges.create({data: {
        email: email
    }});

    return res;
}

async function finalizePasswordChange({ email, resetId, newPassword }: { email: string, resetId: string, newPassword: string }) {
    if (!(await prisma.users.findUnique({ where: { email }})) || !(await prisma.passwordChanges.findUnique({ where: { id: resetId, email }}))) {
        throw 'Invalid credentials';
    }

    const res = await prisma.users.update({ where: {
        email
    }, data: {
        password: hashPassword(newPassword)
    }})

    if (!res) throw 'Internal server error';

    await prisma.passwordChanges.delete({ where: {
        id: resetId,
        email
    }});

    await assignToken(res);

    return res;
}