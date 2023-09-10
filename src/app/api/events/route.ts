import { NextRequest, NextResponse } from "next/server";
import { events } from "../../../../lib/api";

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams;

    try {
        const startTime = new Date(params.get("start-time") as string).getTime();
        const endTime = new Date(params.get("end-time") as string).getTime();

        const res = await events.getEvents(startTime!, endTime!);
        
        return NextResponse.json({events: res}, {status: 200});
    } catch(e: any) {
        return NextResponse.json({message: e}, {status: 401, statusText: e});
    }
}