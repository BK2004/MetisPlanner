import { NextRequest, NextResponse } from "next/server";
import { events } from "../../../../lib/api";

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams;

    try {
        const [startTime, endTime] = events.extractTimesGET(params);
        const res = await events.getEvents(startTime, endTime);
        
        return NextResponse.json({events: res}, {status: 200});
    } catch(e: any) {
        return NextResponse.json({message: e}, {status: 401, statusText: e});
    }
}

export async function POST(req: NextRequest) {
    const data = await req.json();

    try {
        const [startTime, endTime] = events.extractTimesPOST(data);

        const res = await events.createEvent(startTime, endTime, data.label);

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ message: e, success: false });
    }
}