import { cookies } from 'next/headers';
import { prisma } from '..';

const emailTemplates = require('../../components/emailTemplates');

const { MongoClient } = require("mongodb");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    assignToken(user);
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

function assignToken({ email, id }: User) {
    if (!getUser()) {
        const token = jwt.sign({ email, id }, process.env.SECRET, { expiresIn: '7d' }); // Default token expiry to 7 days

        cookies().set("auth-token", token);
    } else {
        throw 'Already signed in.';
    }
}

function getUser(): User | undefined {
    const token = cookies().get("auth-token");
    if (!token) { return; }

    const decoded = jwt.verify(token, process.env.SECRET);
    return decoded;
}

function signOut() {
    if (getUser()) {
        cookies().delete("auth-token");
    } else {
        throw 'Not signed in.';
    }
}