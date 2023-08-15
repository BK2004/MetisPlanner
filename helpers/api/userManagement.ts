import { NextResponse } from 'next/server';
import { prisma } from '..';
import { assignToken, getUser, signOut } from './';

const { MongoClient } = require("mongodb");
const bcrypt = require('bcryptjs');

const mongoClient = new MongoClient(process.env.MONGODB_URI);

// Create TTL index on verifications collection
try {
    const db = mongoClient.db("planner");
    const verificationsCol = db.collection("Verifications");

    verificationsCol.createIndex({ createdAt: 1 }, { expireAfterSeconds: 60 * 15 }) // Create index that defaults to expire after 15 minutes
} catch(e) {} finally {
    mongoClient.close();
}

export const userManagement = {
    verifyUser,
    registerUser,
    logIn,
    validateUser,
}

type User = {
    id: string | undefined,
    username: string,
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
            username: verification.username,
            password: verification.password,
        }
    })
    
    await prisma.verifications.delete({ where: { id: verificationId }});

    await assignToken(user);
}

async function registerUser({ username, password }: User)  {
    if (!username || !password) {
        throw 'Invalid arguments';
    }
    if (await prisma.verifications.findUnique({ where: { username } }) || await prisma.users.findUnique({ where: { username } })) {
        throw 'Email already active.';
    }

    try {
        // Create verification document
        const verification = await prisma.verifications.create({
            data: {
                username,
                password: hashPassword(password),
            }
        });
        
        return verification;
    } catch(e) {
        throw e
    }
}

async function logIn({ username, password }: User) {
    if (!username || !password) {
        throw "Invalid arguments";
    }

    if (await getUser()) {
        throw "Already logged in";
    }

    // Attempt to retrieve user based on credentials
    const user = await prisma.users.findUnique({ where: {
        username,
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

async function validateUser() {
    const user = await getUser();
    if (!user || !user.username) {
        await signOut();

        return false;
    }

    if (user) {
        // Check database to see if they are a valid user
        const userExists = await prisma.users.findUnique({ where: { username: user.username as string }});
        if (userExists) return true;

        await signOut();

        return false;
    }

    return false;
}