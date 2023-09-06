import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signOut } from "../../../../lib/api";

export async function POST(req: NextRequest) {
    try {
        await signOut();

        return NextResponse.json({status: 200});
    } catch {
        return NextResponse.json({status: 500});
    }
}