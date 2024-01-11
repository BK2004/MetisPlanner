import { NextRequest, NextResponse } from "next/server";
import { events } from "../../../../lib/api";

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams;

    try {
        const [startTime, endTime] = events.extractTimesGET(params);
        const res = await events.getEvents(startTime, endTime);
        
        return NextResponse.json({events: res}, {status: 200});
    } catch(e: any) {
        return NextResponse.json({message: e}, {status: 401});
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        
        const [startTime, endTime] = events.extractTimesPOST(data);

        const res = await events.createEvent(startTime, endTime, data.label, data.color);

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ message: e, success: false });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const data = await req.json();

        const res = await events.updateEvent(data.id, new Date(data.start), new Date(data.end), data.content, data.color);

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ message: e, success: false });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const data = await req.json();

        const res = await events.deleteEvent(data.id);

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ message: e, success: false });
    }
}