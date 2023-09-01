import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../helpers/db";

import * as jose from 'jose';

const jwtSecret = new TextEncoder().encode(process.env.SECRET);

const authRoutes = [
    "/login",
    "/register",
    "/api/verify",
]

const protectedRoutes = [
    '/planner',
    '/planner/:path*',
    '/api/logout',
    '/settings'
]

export async function middleware(req: NextRequest) {
    let user: any = undefined;

    try {
        user = await (await jose.jwtVerify(req.cookies.get("auth-token")?.value as string, jwtSecret)).payload;
    } catch(e) {
        
    }

    if ((user && !user.email) || (user && !(await prisma.users.findUnique({ where: { email: user.email }})))) {
        // Invalidate user (cookies will be deleted in later conditionals)
        user = undefined;
    }

    if (!authRoutes.includes(req.nextUrl.pathname) && !user) {
        const res = NextResponse.redirect(new URL("/register", req.url));
        res.cookies.delete("auth-token");

        return res;
    }
    
    if (authRoutes.includes(req.nextUrl.pathname) && user) {
        return NextResponse.redirect(new URL("/planner/daily", req.url));
    } else if (authRoutes.includes(req.nextUrl.pathname)) {
        const res = NextResponse.next();
        res.cookies.delete("auth-token");

        return res;
    }

    return;
}

export const config = {
    matcher: ['/login', '/register', '/api/verify', '/api/logout', '/planner', '/planner/:path*', '/settings'],
  }