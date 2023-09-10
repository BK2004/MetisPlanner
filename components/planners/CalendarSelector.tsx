'use client'

import { useState, useEffect } from "react";
import { Day, Month, Days, Months } from '.';
import { Loading } from "..";
import { requestWrapper } from "../../lib/client";

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

const convertToEpochSeconds = (day: number, month: number, year: number) => {
    const date = new Date(year, month, day);
    const secondsSinceEpoch = Math.floor(date.getTime()/1000);

    return secondsSinceEpoch;
}

export function CalendarSelector({ onSelect, date, setDate }: { onSelect: (date: Day) => void, date: Day | undefined, setDate: any }) {
    const [currMonth, setCurrMonth] = useState<Month>({ month: (new Date(Date.now()).getMonth() as Months), year: (new Date(Date.now()).getFullYear()) })
    const [loading, setLoading] = useState(true);

    const incrementDate = (months: number, years: number) => {
        const newMonth = (currMonth.month + months + 12) % 12;
        const newYear = (currMonth.year + years + Math.floor((currMonth.month + months) / 12));

        setCurrMonth({month: newMonth as Months, year: newYear });
        setLoading(true);
        loadData();
    }

    const loadData = () => {
        // Get data and wait for it to load
        const data = requestWrapper.get("/api/events", {'start-time': convertToEpochSeconds(1, currMonth.month, currMonth.year) + 3600, 'end-time': convertToEpochSeconds(1, currMonth.month + 1, currMonth.year)});
        data.then((res) => {
            res.json().then((data) => {
                setLoading(false);

                console.log(data.events);
            });
        });
    }

    useEffect(() => {
        // Load data on startup
        loadData();
    }, []);

    return (<>
        {loading ? <>
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-30 z-50"></div>
            <div className="fixed top-0 left-0 w-full h-full bg-transparent z-60">
                <Loading />
            </div>
        </> : ""}
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
                <div className={`day-bar flex-1 w-full grid grid-rows-${Math.ceil(getDaysInMonth(currMonth.month, currMonth.year).length / 7)} grid-cols-7 gap-[2px]`}>
                    {getDaysInMonth(currMonth.month, currMonth.year).map((day: Day | undefined, i: number) => {
                        if (day !== undefined) {
                            return (<div key={"day-" + day.date + "-" + day.month + "-" + day.year} className={`transition-all duration-300 ease-in-out bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 hover:dark:bg-neutral-700 col-start-${i % 7 + 1} row-start-${Math.floor(i / 7) + 1}`}>
                                <button onClick={() => { setLoading(true); setDate(day); loadData(); }} className="w-full h-full text-left p-2">
                                    <span className="block h-full">{day.date}</span>
                                    {/* TODO: Load in events for selected month */}
                                </button>
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