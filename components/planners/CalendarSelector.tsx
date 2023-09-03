'use client'

import { useEffect, useState } from "react";

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

export type Day = {
    date: number,
    weekday: Days,
    month: number,
    year: number,
}

const daysAreEqual = (day1: Day|undefined, day2: Day|undefined) => {
    if (day1 === undefined || day2 === undefined) return undefined;
    return day1.date === day2.date && day1.month === day2.month && day1.year === day2.year;
}

const daysInMonth = (month: number, year: number) => {
    return (new Date(year, month + 1, 0)).getDate();
}

const getWeekDay = (day: number, month: number, year: number) => {
    return new Date(year, month, day).getDay();
}

const getDaysInMonth = (month: number, year: number) => {
    const dayArr: Day[] = Array(35).fill(undefined);

    // Offset index by starting day of the week
    let arrIndex = getWeekDay(1, month, year);

    for (let i = 1; i <= daysInMonth(month, year); i++) {
        dayArr[arrIndex++] = {date: i, weekday: Object.values(Days)[getWeekDay(i, month, year)] as Days, month, year};
    }

    return dayArr;
}

export function CalendarSelector() {
    const [date, setDate] = useState(new Date(Date.now()));
    const [selected, setSelected] = useState<Day|undefined>(undefined);

    const incrementDate = (months: number, years: number) => {
        const newMonth = (date.getMonth() + months + 12) % 12;
        const newYear = (date.getFullYear() + years + Math.floor((date.getMonth() + months) / 12));

        setDate(new Date(newYear, newMonth, 1));
    }

    return (<>
        <div className="my-3 max-w-[1000px] w-full bg-white dark:bg-neutral-850 border-x-0 lg:border-x-2 border-2 border-blue-500 flex flex-1 flex-col justify-between">
            <div className="calendar-grid h-full flex flex-col">
                <div className="yymm-bar w-full grid grid-rows-1 grid-cols-7 text-center bg-gray-200 dark:bg-neutral-800 py-[.2rem]">
                    {(Object.keys(Days).filter((val) => {
                        return isNaN(Number(val));
                    })).map((day: string | Days) => {
                        return <p className="break-all" key={"day-" + day}>{(day as String).slice(0, 3).toUpperCase()}</p>;
                    })}
                </div>
                <hr className="border-0 bg-white dark:bg-neutral-850 h-[2px] w-full"></hr>
                <div className={`day-bar flex-1 w-full grid grid-rows-${Math.ceil(getDaysInMonth(date.getMonth(), date.getFullYear()).length / 7)} grid-cols-7 gap-[2px]`}>
                    {getDaysInMonth(date.getMonth(), date.getFullYear()).map((day: Day | undefined, i: number) => {
                        if (day !== undefined) {
                            return (<div key={"day-" + day.date + "-" + day.month + "-" + day.year} className={`transition-all duration-300 ease-in-out ${daysAreEqual(selected, day) ? "bg-blue-400 dark:bg-blue-700" : "bg-gray-200 dark:bg-neutral-800"} col-start-${i % 7 + 1} row-start-${Math.floor(i / 7) + 1}`}>
                                <button onClick={() => { setSelected(daysAreEqual(selected, day) ? undefined : day) }} className="w-full h-full text-left p-2">
                                    <span className="block h-full">{day.date}</span>
                                </button>
                            </div>);
                        }
                    })}
                </div>
            </div>
            <div className="mmyy-bar flex flex-row w-3/4 mx-auto justify-around text-xl py-2">
                <button className="year-back bg-transparent" onClick={() => { incrementDate(0, -1); }}>&lt;&lt;</button>
                <button className="month-back bg-transparent" onClick={() => { incrementDate(-1, 0); }}>&lt;</button>
                <h1 className="month-year-label">{Object.values(Months)[date.getMonth()]} {date.getFullYear()}</h1>
                <button className="month-forward bg-transparent" onClick={() => { incrementDate(1, 0); }}>&gt;</button>
                <button className="year-forward bg-transparent" onClick={() => { incrementDate(0, 1); }}>&gt;&gt;</button>
            </div>
        </div>
    </>);
}