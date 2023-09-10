import { getUser } from ".";
import { prisma } from "..";

export const events = {
    getEvents: getEvents,
}

async function getEvents(startTime: number, endTime: number) {
    if (Number.isNaN(startTime) || Number.isNaN(endTime)) throw 'Invalid arguments';

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
        user: false,
        userId: false,
        id: false
    } });

    return events;
}