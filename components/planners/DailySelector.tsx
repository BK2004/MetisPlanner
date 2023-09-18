import { Day, Days, EventBlock, Months, convertIsoToDay, convertIsoToMsTime, convertToEpochSeconds, convertToIsoTime, daysAreEqual, getDaysInWeek } from ".";
import { useEffect, useState } from "react";

export function DailySelector({ data, loadData, openSettings }: { data: {id: string, content: string, color: string, start: string, end: string}[],  loadData: (targetTimeline: { start: string, end: string }) => void, openSettings: (eventId: string) => void }) {
    const [weekStart, setWeekStart] = useState({ date: new Date().getDate() - new Date().getDay(), month: new Date().getMonth(), year: new Date().getFullYear(), weekday: 0 });
    const [weekEnd, setWeekEnd] = useState({date: new Date().getDate() + (6 - new Date().getDay()), month: new Date().getMonth(), year: new Date().getFullYear(), weekday: 6 });
    const [currDay, setCurrDay] = useState({ date: new Date().getDate(), month: new Date().getMonth(), year: new Date().getFullYear(), weekday: new Date().getDay() });

    // Load starting data for current day on mount
    useEffect(() => {
        loadData({ start: convertToIsoTime(weekStart.date, weekStart.month, weekStart.year), end: convertToIsoTime(weekEnd.date, weekEnd.month, weekEnd.year) });
    }, [])

    const getEventsOnCurrDay = () => {
        const res = [];
        for (const event of data) {
            if (convertIsoToMsTime(event.start) >= convertToEpochSeconds(currDay.date, currDay.month, currDay.year, 3600) * 1000 && convertIsoToMsTime(event.end) <= convertToEpochSeconds(currDay.date, currDay.month, currDay.year, 60 * 60 * 24) * 1000) {
                res.push(event);
            }
        }

        return res;
    }

    const incrementWeek = (inc: number) => {
        const startDate = new Date(weekStart.year, weekStart.month, weekStart.date + 7 * inc);
        const endDate = new Date(weekEnd.year, weekEnd.month, weekEnd.date + 7 * inc);

        const newStart = { date: startDate.getDate(), month: startDate.getMonth(), year: startDate.getFullYear() };
        const newEnd = { date: endDate.getDate(), month: endDate.getMonth(), year: endDate.getFullYear() };

        setCurrDay({ ...newStart, weekday: 0 });
        setWeekStart({ ...newStart, weekday: 0 });
        setWeekEnd({ ...newEnd, weekday: 6 });

        loadData({ start: convertToIsoTime(newStart.date, newStart.month, newStart.year), end: convertToIsoTime(newEnd.date, newEnd.month, newEnd.year) });
    }

    return (<div className="w-[calc(100%-2rem)] m-4 h-[700px] bg-white dark:bg-neutral-850 border-2 border-blue-500 flex flex-col">
        <div className="info-display bg-gray-100 dark:bg-neutral-800 w-full py-2 px-4 flex justify-between align-middle">
            <button onClick={() => incrementWeek(-1)} className="left-arrow bg-transparent w-5 text-left text-xl font-extrabold">&lt;</button>
            <div className="w-3/4">
                <div className="day-labels flex justify-between text-gray-700 dark:text-neutral-400 align-middle">
                    {Object.keys(Days).filter((val) => isNaN(Number(val))).map((val) => {
                        return <span className="block w-8 text-center" key={`label-${val}`}>{val.substring(0, 1).toUpperCase()}</span>
                    })}
                </div>
                <div className="day-buttons flex justify-between text-lg">
                    {getDaysInWeek(weekStart).map((day: Day) => {
                        return (<button className={`w-8 aspect-square text-center rounded-full ${daysAreEqual(currDay, day) ? "bg-blue-500 hover:bg-blue-400" : "hover:bg-blue-500 hover:bg-opacity-30"} transition-all duration-300 ease-in-out`} key={`${day.date}-${day.month}-${day.year}-daily-button`} onClick={() => {
                            setCurrDay(day);
                        }}>{day.date}</button>);
                    })}
                </div>
            </div>
            <button onClick={() => incrementWeek(1)} className="right-arrow bg-transparent w-5 text-right text-xl font-extrabold">&gt;</button>
        </div>
        <div className="date-display bg-gray-100 dark:bg-neutral-800 pb-2 px-4 w-full flex justify-between align-middle">
            <h2>{`${Months[currDay.month]} ${currDay.date < 10 ? "0" : ""}${currDay.date}, ${currDay.year}`}</h2>
            <button className="rounded-md bg-white dark:bg-neutral-850 px-2 border-[1px] border-gray-300 dark:border-neutral-750" onClick={() => {
                const newStart = { date: new Date().getDate() - new Date().getDay(), month: new Date().getMonth(), year: new Date().getFullYear(), weekday: 0 };
                const newEnd = { date: new Date().getDate() + (6 - new Date().getDay()), month: new Date().getMonth(), year: new Date().getFullYear(), weekday: 6 };

                setWeekStart(newStart);
                setWeekEnd(newEnd);
                setCurrDay({ date: new Date().getDate(), month: new Date().getMonth(), year: new Date().getFullYear(), weekday: new Date().getDay() });
                
                loadData({ start: convertToIsoTime(newStart.date, newStart.month, newStart.year), end: convertToIsoTime(newEnd.date, newEnd.month, newEnd.year) });
            }}>Today</button>
        </div>
        <div className="event-container flex-1 px-4 py-2 overflow-y-scroll scroll-none">
            {/* Populate data from day into container */}
            {getEventsOnCurrDay().sort((a, b) => convertIsoToMsTime(a.start) - convertIsoToMsTime(b.start)).map((val) => {
                return (<EventBlock key={`daily-block-${val.id}`} eventDetails={val} openSettings={openSettings} />);
            })}
        </div>
    </div>);
}