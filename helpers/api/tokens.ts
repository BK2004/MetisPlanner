import * as jose from 'jose';
import { cookies } from 'next/headers';

const jwtSecret = new TextEncoder().encode(process.env.SECRET);

export async function assignToken({ username, id }: { username: string, id: string}) {
    if (!(await getUser())) {
        const token = await new jose.SignJWT({ username, id })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime("7d") // Default token expiry to 7 days
            .sign(jwtSecret); 

        cookies().set("auth-token", token, { httpOnly: true, expires: Date.now() + 1000 * 60 * 60 * 24 * 7 });
    } else {
        throw 'Already signed in.';
    }
}

export async function getUser(): Promise<jose.JWTPayload | undefined> {
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

export async function signOut() {
    if (await getUser()) {
        cookies().delete("auth-token");
    } else {
        throw 'Not signed in.';
    }
}