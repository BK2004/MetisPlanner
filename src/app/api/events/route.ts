import { NextRequest, NextResponse } from "next/server";
import { events } from "../../../../lib/api";

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams;
    const startTime = params.get("start-time");
    const endTime = params.get("end-time");

    try {
        const res = await events.getEvents(parseInt(startTime!), parseInt(endTime!));
        
        return NextResponse.json({status: 200});
    } catch(e: any) {
        return NextResponse.json({message: e}, {status: 401, statusText: e});
    }
}