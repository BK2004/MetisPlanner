import { userManagement } from "../../../../helpers/api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const data = await req.json();
    try {
        const res = await userManagement.createUser(data);

        return NextResponse.json({"message": "success"});
    } catch (e) {
        return NextResponse.json({"message": "Username already being used."});
    }
}