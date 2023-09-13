'use client'

import { useState, useEffect } from "react";
import { Day, Month, Days, Months, convertToIsoTime, daysAreEqual } from '.';
import { getDaysInMonth } from ".";

export function CalendarSelector({  date, setDate, data, loadData }: { date: Day | undefined, setDate: any, data: any, loadData: (targetTimeline: { start: string, end: string }) => void }) {
    const [currMonth, setCurrMonth] = useState<Month>({ month: (new Date(Date.now()).getMonth() as Months), year: (new Date(Date.now()).getFullYear()) })

    const incrementDate = (months: number, years: number) => {
        const newMonth = (currMonth.month + months + 12) % 12;
        const newYear = (currMonth.year + years + Math.floor((currMonth.month + months) / 12));

        setCurrMonth({month: newMonth as Months, year: newYear });
    }

    const getEventsOnDay = (day: Day) => {
        const dayEvents = [];

        for (let event of data.events) {
            const eventDate = new Date(event.start);

            if (daysAreEqual(day, { date: eventDate.getDate(), month: eventDate.getMonth(), weekday: eventDate.getDay(), year: eventDate.getFullYear() })) {
                dayEvents.push(event);
            }
        }

        return dayEvents;
    }

    useEffect(() => {
        // Load data on change
        loadData({start: convertToIsoTime(1, currMonth.month, currMonth.year, 3600), end: convertToIsoTime(1, currMonth.month + 1, currMonth.year)});
    }, [currMonth]);

    return (<>
        <div className="max-w-[1000px] w-full h-full bg-white dark:bg-neutral-850 border-2 border-blue-500 flex flex-col justify-between">
            <div className="calendar-grid h-full flex flex-col">
                <div className="yymm-bar w-full grid grid-rows-1 grid-cols-7 text-center bg-gray-200 dark:bg-neutral-800 py-[.2rem]">
                    {(Object.keys(Days).filter((val) => {
                        return isNaN(Number(val));
                    })).map((day: string | Days) => {
                        return <p className="break-all" key={"day-" + day}>{(day as String).slice(0, 3).toUpperCase()}</p>;
                    })}
                </div>
                <hr className="border-0 bg-white dark:bg-neutral-850 h-[2px] w-full"></hr>
                <div className={`day-bar flex-1 w-full grid auto-rows-[1fr] grid-cols-7 gap-[2px]`}>
                    {getDaysInMonth(currMonth.month, currMonth.year).map((day: Day | undefined, i: number) => {
                        if (day !== undefined) {
                            return (<div key={"day-" + day.date + "-" + day.month + "-" + day.year} className={`col-start-${i % 7 + 1} row-start-${Math.floor(i / 7) + 1}`}>
                                <button onClick={() => { setDate(day); }} className="w-full h-full text-left p-2 flex flex-col justify-between transition-all duration-300 ease-in-out bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 hover:dark:bg-neutral-700">
                                    <span className="block">{day.date}</span>
                                    {/* Load events for current month */}
                                    <div className="w-full">
                                        {getEventsOnDay(day).filter((val, i) => i < 3).map((value) => {
                                            return (<div className="hover:bg-gray-200 hover:dark:bg-neutral-750 hover:border-blue-400 transition-all duration-300 ease-in-out text-ellipsis mb-1 px-1 last:mb-0 w-full overflow-x-hidden whitespace-nowrap border-blue-500 border-l-4 rounded-l-none rounded-md bg-white dark:bg-neutral-850" key={value.id}>{value.content}</div>);
                                        })}
                                    </div>
                                </button>-
                            </div>);
                        }
                    })}
                </div>
            </div>
            <div className="mmyy-bar flex flex-row w-3/4 mx-auto justify-around text-xl py-2">
                <button className="year-back bg-transparent" onClick={() => { incrementDate(0, -1); }}>&lt;&lt;</button>
                <button className="month-back bg-transparent" onClick={() => { incrementDate(-1, 0); }}>&lt;</button>
                <h1 className="month-year-label w-[200px] text-center">{Months[currMonth.month]} {currMonth.year}</h1>
                <button className="month-forward bg-transparent" onClick={() => { incrementDate(1, 0); }}>&gt;</button>
                <button className="year-forward bg-transparent" onClick={() => { incrementDate(0, 1); }}>&gt;&gt;</button>
            </div>
        </div>
    </>);
}