import { userManagement } from "../../../../helpers/api";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const data = await req.json();
    try {
        const res = await userManagement.registerUser(data);

        return NextResponse.json({"message": "success"});
    } catch (e) {
        return NextResponse.json({"message": "Email already in use, please sign in."}, {"status": 401});
    }
}