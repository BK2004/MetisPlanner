import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib";
import { userManagement } from "../../../../lib/api";

export async function POST(req: NextRequest) {
    const data = await req.json();

    try {
        if (!data.email || !data.resetId || !data.password) throw 'Invalid credentials';

        const res = await userManagement.finalizePasswordChange({ email: data.email, resetId: data.resetId, newPassword: data.password });

        return NextResponse.json({ status: 200 });
    } catch(e: any) {
        return NextResponse.json({ message: e }, { status: 401 });
    }

}