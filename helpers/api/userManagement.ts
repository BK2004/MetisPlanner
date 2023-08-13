import { cookies } from 'next/headers';
import { prisma } from '..';
import * as jose from 'jose';

const { MongoClient } = require("mongodb");
const bcrypt = require('bcryptjs');

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const jwtSecret = new TextEncoder().encode(process.env.SECRET);

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
    assignToken,
    getUser,
    signOut,
}

type User = {
    id: string | undefined,
    email: string,
    password: string,
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

    try {
        // Create verification document
        const verification = await prisma.verifications.create({
            data: {
                email,
                password: bcrypt.hashSync(password, 10),
            }
        });
        
        return verification;
    } catch(e) {
        throw e
    }
}

async function assignToken({ email, id }: User) {
    if (!(await getUser())) {
        const token = await new jose.SignJWT({ email, id })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime("7d") // Default token expiry to 7 days
            .sign(jwtSecret); 

        cookies().set("auth-token", token, { httpOnly: true, expires: Date.now() + 1000 * 60 * 60 * 24 * 7 });
    } else {
        throw 'Already signed in.';
    }
}

async function getUser(): Promise<jose.JWTPayload | undefined> {
    const token = cookies().get("auth-token")?.value;
    if (!token) {
        return undefined;
    }

    try {
        const res = (await jose.jwtVerify(token, jwtSecret)).payload;
        return res;
    } catch(e) {
        return undefined;
    }
}

async function signOut() {
    if (await getUser()) {
        cookies().delete("auth-token");
    } else {
        throw 'Not signed in.';
    }
}