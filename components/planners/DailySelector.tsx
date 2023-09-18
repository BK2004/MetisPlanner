import { Day, Days, convertIsoToDay, convertToIsoTime, daysAreEqual, getDaysInRange } from ".";
import { useEffect, useState } from "react";

export function DailySelector({ data, loadData }: { data: any,  loadData: (targetTimeline: { start: string, end: string }) => void}) {
    const [weekStart, setWeekStart] = useState(convertToIsoTime(new Date().getDate() - new Date().getDay(), new Date().getMonth(), new Date().getFullYear()));
    const [weekEnd, setWeekEnd] = useState(convertToIsoTime(new Date().getDate() + (6 - new Date().getDay()), new Date().getMonth(), new Date().getFullYear()));
    const [currDay, setCurrDay] = useState(new Date().toISOString());

    // Load starting data for current day on mount
    useEffect(() => {
        loadData({ start: weekStart, end: weekEnd });
    }, [])

    return (<div className="w-[calc(100%-2rem)] m-4 h-[calc(100%-2rem)] bg-white dark:bg-neutral-850 border-2 border-blue-500 flex flex-col">
        <div className="info-display bg-gray-100 dark:bg-neutral-800 w-full py-2 flex justify-around align-middle">
            <button className="left-arrow bg-transparent w-5 text-center text-xl">&lt;</button>
            <div className="w-3/4">
                <div className="day-labels flex justify-between text-gray-700 dark:text-neutral-400 align-middle">
                    {Object.keys(Days).filter((val) => isNaN(Number(val))).map((val) => {
                        return <span className="block w-8 text-center" key={`label-${val}`}>{val.substring(0, 1).toUpperCase()}</span>
                    })}
                </div>
                <div className="day-buttons flex justify-between text-lg">
                    {getDaysInRange(weekStart, weekEnd).map((day: Day) => {
                        return (<button className={`w-8 aspect-square text-center rounded-full ${daysAreEqual(convertIsoToDay(currDay), day) ? "bg-blue-500 hover:bg-blue-400" : "hover:bg-blue-500 hover:bg-opacity-30"} transition-all duration-300 ease-in-out`} key={`${day.date}-${day.month}-${day.year}-daily-button`} onClick={() => {
                            console.log(day);
                            console.log(convertToIsoTime(day.date, day.month, day.year));
                            setCurrDay(convertToIsoTime(day.date, day.month, day.year));
                        }}>{day.date}</button>);
                    })}
                </div>
            </div>
            <button className="right-arrow bg-transparent w-5 text-center text-xl">&gt;</button>
        </div>
    </div>);
}