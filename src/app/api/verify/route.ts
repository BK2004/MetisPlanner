import { NextRequest, NextResponse } from 'next/server';
import { userManagement } from '../../../../helpers/api';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id");
    
    if (!id) {
        return NextResponse.redirect(new URL("/register", req.url));
    }

    try {
        const res = await userManagement.verifyUser({ verificationId: id });

        // Successful verification, send to daily planner
        console.log(cookies().get("auth-token"));
        return NextResponse.redirect(new URL("/planner/daily", req.url));
    } catch(e) {
        return NextResponse.redirect(new URL("/register", req.url));
    }
}