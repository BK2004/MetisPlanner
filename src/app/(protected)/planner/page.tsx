'use client'

import { CalendarSelector, DailySelector, Day, Days, EventSettings, Month, Months, convertIsoToMsTime, convertToEpochSeconds, convertToIsoTime, daysAreEqual, getTimeString } from "../../../../components/planners";
import { useState, useMemo, useEffect } from 'react';
import { DayPopup } from "../../../../components/planners/DayPopup";
import { CreateSidebar } from "../../../../components/planners";
import { FieldValues } from "react-hook-form";
import { Loading } from "../../../../components";
import { requestWrapper } from "../../../../lib/client";
import { convertMsToIsoTime } from "../../../../components/planners";

export default function Page() {
    const [date, setDate] = useState(undefined);
    const [creating, setCreating] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<{ events: { id: string, start: string, end: string, content: string, color: string }[], start: string, end: string }>({ events: [], start: "", end: "" });
    const [openEvent, setOpenEvent] = useState("");
    const [showSettings, setShowSettings] = useState(false);
    const [currMonth, setCurrMonth] = useState<Month>({ month: (new Date(Date.now()).getMonth() as Months), year: (new Date(Date.now()).getFullYear()) })
    const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);

    const isSmallScreen = useMemo(() => screenWidth! <= 600, [screenWidth]);

    // Subscribe to window resize event on mount
    useEffect(() => {
        setScreenWidth(window.innerWidth);

        window.addEventListener("resize", (e: UIEvent) => {
            setScreenWidth(window.innerWidth)
        })
    }, [])

    const createEvent = (request: FieldValues) => {
        if (creating) return;
        
        setCreating(true);

        requestWrapper.post('/api/events', { label: request.label, 'start-time': convertMsToIsoTime(Number(request.start)), 'end-time': convertMsToIsoTime(Number(request.end)), 'color': request.color }).then((res) => {
            setCreating(false);

            loadData({ start: data.start, end: data.end });
        }).catch((e) => { setCreating(false); })
    }

    const deleteEvent = (id: string) => {
        if (deleting) return;

        setDeleting(true);

        requestWrapper.delete("/api/events", { id }).then((res) => {
            setDeleting(false);

            loadData(data);
        }).catch((e) => { setDeleting(false); })
    }

    const loadData = (targetTimeline: { start: string, end: string}) => {
        // Get data and wait for it to load
        setLoading(true);

        const data = requestWrapper.get("/api/events", {'start-time': targetTimeline.start, 'end-time': targetTimeline.end });
        data.then((res) => {
            res.json().then((dat) => {
                setLoading(false);

                dat.start = targetTimeline.start;
                dat.end = targetTimeline.end;

                setData(dat);
            });
        });
    }

    const getEventsOnDay = (day: Day) => {
        const dayEvents = [];

        for (let event of data.events) {
            const eventDate = new Date(event.start);
            const latestTime = convertToEpochSeconds(day.date, day.month, day.year) * 1000 + 60*60*24*1000;

            if (eventDate.getTime() <= latestTime && eventDate.getTime() >= convertToEpochSeconds(day.date, day.month, day.year, 3600) * 1000) {
                dayEvents.push(event);
            }
        }

        return dayEvents;
    }

    const getEvent = (eventId: string) => {
        for (const event of data.events) {
            if (event.id === eventId) {
                return event;
            }
        }

        return undefined;
    }

    const updateEvent = (changes: { id: string, start: string, end: string, content: string, color: string }) => {
        setLoading(true);

        requestWrapper.patch("/api/events", changes).then((res) => {
            if (res.status !== 200) {
                setLoading(false);
                
                return; 
            }

            loadData({ start: convertToIsoTime(1, currMonth.month, currMonth.year, 3600), end: convertToIsoTime(1, currMonth.month + 1, currMonth.year) })
        })
    }

    return (<><div className="relative w-full flex flex-1 flex-row justify-between scroll-none">
        <div className={`absolute ${showSettings ? "" : "-translate-x-full lg:translate-x-0"} lg:relative left-bar w-[350px] h-full border-t-4 border-t-gray-200 dark:border-t-neutral-800 shadow-lg z-20 transition-all duration-300 ease-in-out`}>
            <CreateSidebar onSubmit={createEvent} />
        </div>
        <button onClick={() => setShowSettings(!showSettings)} className={`lg:hidden ${!showSettings ? "left-0" : "left-[350px]"} z-30 transition-all duration-300 ease-in-out toggle-arrow fixed top-1/2 -translate-y-1/2  -translate-x-1/2 text-white bg-blue-500 dark:bg-blue-600 w-10 h-10 rounded-full`}>
            {showSettings ? "<" : ">"}
        </button>
        { !isSmallScreen ? 
            <div className={`h-full py-3 flex-1 flex align-middle justify-center`}>
                <CalendarSelector data={data} openEvent={setOpenEvent} loadData={loadData} setDate={setDate} currMonth={currMonth} setCurrMonth={setCurrMonth} />
            </div> 
            :
            <div className="h-full w-full">
                <DailySelector openSettings={setOpenEvent} data={data.events} loadData={loadData} />
            </div>
        }
    </div>
    {date !== undefined ? <DayPopup date={date} data={getEventsOnDay(date)} onClose={() => { setDate(undefined); }} openSettings={setOpenEvent} /> : ""}
    {openEvent !== "" && getEvent(openEvent) !== undefined ? <EventSettings deleteEvent={deleteEvent} update={updateEvent} data={getEvent(openEvent)} close={() => {setOpenEvent("")}} /> : ""}
    {creating || loading || deleting ? <>
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-30 z-[150]"></div>
        <div className="fixed top-0 left-0 w-full h-full bg-transparent z-[160]">
            <Loading />
        </div>
    </> : ""}
    </>)
}