import { getUser } from ".";
import { prisma } from "..";

export const events = {
    getEvents: getEvents,
}

async function getEvents(startTime: number, endTime: number) {
    if (Number.isNaN(startTime) || Number.isNaN(endTime)) throw 'Invalid arguments';

    const user = await getUser();
    if (!user) throw 'User not logged in.';
}