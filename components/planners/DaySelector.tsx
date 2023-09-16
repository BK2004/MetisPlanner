'use client'

import { Month, Months, Days, getDaysInMonth, Day, daysAreEqual } from ".";
import { useEffect, useState } from "react";

export function DaySelector({ selected, selectDate }: { selected: Day, selectDate: (date: Day) => void }) {
    const [month, setMonth] = useState<Month>({ month: new Date().getMonth(), year: new Date().getFullYear() });

    useEffect(() => {
        console.log(selected);
    })

    return (<div className="w-full h-fit">
        <div className="top-bar w-full flex flex-row justify-center mx-auto">
            <select value={month.month} onChange={(e) => {
                setMonth({ month: Number(e.target.value), year: month.year });
            }} className="outline-0 bg-inherit focus:bg-gray-100 dark:focus:bg-neutral-700 focus:border-b-0 ring-gray-400 dark:ring-neutral-900 ring-0 appearance-none border-b-2 border-gray-200 dark:border-neutral-750 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 ring-inset rounded-md px-2 text-lg transition-all duration-100 ease-linear border-0 mx-2">
                {Object.keys(Months).filter((val) => !isNaN(Number(val))).map((value: string) => {
                    return (<option key={"month-select-" + value} value={value}>{String(Months[Number(value)])}</option>);
                })}
            </select>
            <select onChange={(e) => {
                setMonth({ month: month.month, year: Number(e.target.value) });
            }} className="outline-0 bg-inherit focus:bg-gray-100 dark:focus:bg-neutral-700 focus:border-b-0 ring-gray-400 dark:ring-neutral-900 ring-0 appearance-none border-b-2 border-gray-200 dark:border-neutral-750 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 ring-inset rounded-md px-2 text-lg transition-all duration-100 ease-linear border-0 mx-2">
                <option value="2023">2023</option>
                <option value="2024">2024</option>
            </select>
        </div>
        <div className={`py-3 day-choices w-full grid grid-cols-7 grid-rows-${Math.ceil(getDaysInMonth(month.month, month.year).length / 7)}`}>
            {getDaysInMonth(month.month, month.year).map((day: Day | undefined, i: number) => {
                if (day !== undefined) {
                    return (<div key={"day-" + day.date + "-" + day.month + "-" + day.year} className={`transition-all duration-300 ease-in-out col-start-${i % 7 + 1} row-start-${Math.floor(i / 7) + 1}`}>
                        <button onClick={() => { selectDate(day); }} className={`transition-all duration-300 ease-in-out w-8 h-8 text-center rounded-3xl ${daysAreEqual(selected, day) ? "bg-blue-500 hover:bg-blue-400 text-white" : "hover:bg-opacity-30 hover:bg-blue-500"}`}>
                            {day.date}
                        </button>
                    </div>);
                }
            })}
        </div>
    </div>);
}