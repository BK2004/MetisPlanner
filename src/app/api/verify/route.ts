import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
        NextResponse.redirect(new URL("/", req.url));
    }
}