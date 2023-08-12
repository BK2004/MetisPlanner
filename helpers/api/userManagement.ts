import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import { sendEmail } from '..';

const emailTemplates = require('../../components/emailTemplates');

const { MongoClient } = require("mongodb");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
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
}

async function registerUser({ email, password }: { email: string | undefined, password: string | undefined})  {
    if (!email || !password) {
        throw 'Invalid arguments';
    }
    if (await prisma.users.findUnique({ where: { email } })) {
        throw 'Username already claimed.';
    }

    try {
        // Create verification document
        const verification = await prisma.verifications.create({
            data: {
                email,
                password: bcrypt.hashSync(password, 10),
            }
        });

        // Send verification email
        const res = await sendEmail({
            recipient: verification.email,
            content: emailTemplates.verification(),
            subject: "Account verification"
        })
        
        return true;
    } catch(e) {
        throw e
    }
    
    /*await prisma.user.create({
        data: {
            email,
            password: bcrypt.hashSync(password, 10),
        }
    });*/
}