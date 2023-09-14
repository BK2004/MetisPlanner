'use client'

import { CalendarSelector, Day, Days, EventSettings, Months, convertIsoToMsTime, convertToIsoTime, daysAreEqual } from "../../../../components/planners";
import { useState } from 'react';
import { DayPopup } from "../../../../components/planners/DayPopup";
import { CreateSidebar } from "../../../../components/planners";
import { FieldValues } from "react-hook-form";
import { Loading } from "../../../../components";
import { requestWrapper } from "../../../../lib/client";
import { convertMsToIsoTime } from "../../../../components/planners";

export default function Page() {
    const [date, setDate] = useState(undefined);
    const [creating, setCreating] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<{ events: { id: string, start: string, end: string, content: string }[], start: string, end: string }>({ events: [], start: "", end: "" });
    const [openEvent, setOpenEvent] = useState("");
    const [showSettings, setShowSettings] = useState(false);

    const createEvent = (request: FieldValues) => {
        if (creating) return;
        
        setCreating(true);

        requestWrapper.post('/api/events', { label: request.label, 'start-time': convertMsToIsoTime(Number(request.start)), 'end-time': convertMsToIsoTime(Number(request.end)) }).then((res) => {
            setCreating(false);

            loadData({ start: data.start, end: data.end });
        }).catch((e) => { setCreating(false); })
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

            if (daysAreEqual(day, { date: eventDate.getDate(), month: eventDate.getMonth(), weekday: eventDate.getDay(), year: eventDate.getFullYear() })) {
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

    return (<><div className="w-full flex flex-1 flex-row justify-between scroll-none">
        <div className={`absolute ${showSettings ? "" : "-translate-x-full lg:translate-x-0"} lg:relative left-bar w-[350px] h-full border-t-4 border-t-gray-200 dark:border-t-neutral-800 shadow-lg z-20 transition-all duration-300 ease-in-out`}>
            <CreateSidebar onSubmit={createEvent} />
            <button onClick={() => setShowSettings(!showSettings)} className="lg:hidden toggle-arrow absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 text-white bg-blue-500 dark:bg-blue-600 w-10 h-10 rounded-full a">
                {showSettings ? "<" : ">"}
            </button>
        </div>
        <div className="h-full py-3 flex-1 flex align-middle justify-center">
            <CalendarSelector data={data} openEvent={setOpenEvent} loadData={loadData} date={date} setDate={setDate} />
        </div>
    </div>
    {date !== undefined ? <DayPopup date={date} data={getEventsOnDay(date)} onClose={() => { setDate(undefined); }} openSettings={setOpenEvent} /> : ""}
    {openEvent !== "" && getEvent(openEvent) !== undefined ? <EventSettings data={getEvent(openEvent)} close={() => {setOpenEvent("")}} /> : ""}
    {creating || loading ? <>
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-30 z-50"></div>
        <div className="fixed top-0 left-0 w-full h-full bg-transparent z-60">
            <Loading />
        </div>
    </> : ""}
    </>)
}