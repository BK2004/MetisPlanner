import { NextRequest, NextResponse } from "next/server";
import { userManagement } from "../../../../helpers/api";

export async function POST(req: NextRequest) {
    const data = await req.json();
    try {
        await userManagement.logIn(data);

        return NextResponse.json({status: 200});
    } catch(e: any) {
        return NextResponse.json({message: e}, {status: 401, statusText: e});
    }
}