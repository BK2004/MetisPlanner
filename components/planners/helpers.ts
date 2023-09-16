import { Day, Month, Days, Months } from '.';

const TIME_INTERVAL = 15; // allow for 15 minute time intervals

export const daysAreEqual = (day1: Day|undefined, day2: Day|undefined) => {
    if (day1 === undefined || day2 === undefined) return undefined;

    return day1.date === day2.date && day1.month === day2.month && day1.year === day2.year;
}

export const daysInMonth = (month: number, year: number) => {
    return (new Date(year, month + 1, 0)).getDate();
}

export const getWeekDay = (day: number, month: number, year: number) => {
    return new Date(year, month, day).getDay();
}

export const getDaysInMonth = (month: number, year: number) => {
    const dayArr: Day[] = Array(35).fill(undefined);

    // Offset index by starting day of the week
    let arrIndex = getWeekDay(1, month, year);

    for (let i = 1; i <= daysInMonth(month, year); i++) {
        dayArr[arrIndex++] = {date: i, weekday: Object.values(Days)[getWeekDay(i, month, year)] as Days, month, year};
    }

    return dayArr;
}

export const convertToEpochSeconds = (day: number, month: number, year: number, addSeconds = 0) => {
    const date = new Date(new Date(year, month, day).getTime() + addSeconds * 1000);
    const secondsSinceEpoch = Math.floor(date.getTime()/1000);

    return secondsSinceEpoch;
}

export const convertToIsoTime = (day: number, month: number, year: number, addSeconds = 0) => {
    return new Date(new Date(year, month, day).getTime() + addSeconds*1000).toISOString();
}

export const convertMsToIsoTime = (ms: number) => {
    return new Date(ms).toISOString();
}

export const convertIsoToMsTime = (iso: string) => {
    return new Date(iso).getTime();
}

export const getDayFromIso = (iso: string) => {
    const d = new Date(iso);

    return { date: d.getDate(), weekday: d.getDay() as Days, month: d.getMonth(), year: d.getFullYear() }
}

export const getIsoFromDay = (d: Day) => {
    return new Date(d.year, d.month, d.date).toISOString();
}

export const getTimeString = (iso: string) => {
    const d = new Date(iso);
    const minutes = d.getMinutes();
    let hours = d.getHours();
    let amOrPm = "AM";

    if (hours === 0) {
        return "12:00 AM";
    }
    if (hours >= 12) {
        amOrPm = "PM";
    }
    if (hours > 12) {
        hours %= 12;
    }

    return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes} ${amOrPm}`;
}

export const getTimesForDay = (day: number, month: number, year: number) => {
    let t = Number(new Date(year, month, day)) + 3600000; // Time at 1 AM on day
    const endTime = Number(new Date(year, month, day + 1)); // Time at 12 AM on next day
    const res = [];

    while (t <= endTime) {
        const dateAtTime = new Date(t);
        res.push({ value: t, label: getTimeString(dateAtTime.toISOString()) });

        t += TIME_INTERVAL * 60 * 1000;
    }

    return res;
}

export const convertIsoToDay = (iso: string) => {
    let d = new Date(iso);

    // If time is 12:00 AM, the day should be 1 day less
    if (d.getHours() === 0) d = new Date(d.getTime() - 1000);

    return { date: d.getDate(), weekday: d.getDay(), month: d.getMonth(), year: d.getFullYear() }
}