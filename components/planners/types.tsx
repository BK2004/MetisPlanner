export enum Days {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

export enum Months {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
}

export type CalendarType = 'Day' | 'Month' | 'Year';

export type Month = {
    month: Months,
    year: number
}

export type Day = {
    date: number,
    weekday: Days,
} & Month