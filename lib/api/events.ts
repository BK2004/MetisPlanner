import { getUser } from ".";
import { prisma } from "..";

export const events = {
    getEvents: getEvents,
    createEvent: createEvent,
    updateEvent: updateEvent,
    extractTimesGET: extractTimesGET,
    extractTimesPOST: extractTimesPOST,
}

function extractTimesGET(params: URLSearchParams) {
    const startTime = new Date(params.get("start-time") as string);
    const endTime = new Date(params.get("end-time") as string);

    return [startTime, endTime];
}

function extractTimesPOST(data: any) {
    const startTime = new Date(data['start-time']);
    const endTime = new Date(data['end-time']);

    return [startTime, endTime];
}

async function getEvents(startTime: Date, endTime: Date) {
    if (!startTime || !endTime) throw 'Invalid args';

    const user = await getUser();
    if (!user) throw 'User not logged in.';

    const events = await prisma.event.findMany({ where: { userId: user.id as string, OR: [
        { start: {
            gte: startTime,
            lt: endTime
        }},
        { end: {
            gt: startTime,
            lte: endTime
        } }
    ] }, select: {
        start: true,
        end: true,
        content: true,
        color: true,
        user: false,
        userId: false,
        id: true
    } });

    return events;
}

async function createEvent(startTime: Date, endTime: Date, label: string) {
    if (!startTime || !endTime || !label) throw 'Invalid args.';

    const user = await getUser();
    if (!user) throw 'User not logged in';

    const createRes = await prisma.users.update({ 
        where: { id: user.id as string }, 
        data: {
            events: {
                create: [
                    { content: label, start: startTime, end: endTime }
                ]
            }
        }
    });

    return createRes;
}

async function updateEvent(eventId: string, startTime: Date, endTime: Date, content: string, color: string) {
    if (!startTime || !endTime || !content || !color) throw 'Invalid args.';

    const user = await getUser();
    if (!user) throw 'User not logged in';

    const updateRes = await prisma.event.update({ where: {
        id: eventId,
        userId: user.id as string
    },
    data: {
        content: content,
        start: startTime,
        end: endTime,
        color: color,
    }})

    return updateRes;
}