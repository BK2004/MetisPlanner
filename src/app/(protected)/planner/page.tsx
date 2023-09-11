'use client'

import { CalendarSelector, Day, Days, Months } from "../../../../components/planners";
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

    const createEvent = (data: FieldValues) => {
        if (creating) return;
        
        setCreating(true);

        requestWrapper.post('/api/events', { label: data.label, 'start-time': convertMsToIsoTime(Number(data.start)), 'end-time': convertMsToIsoTime(Number(data.end)) }).then((res) => {
            setCreating(false);
        }).catch((e) => { setCreating(false); })
    }

    return (<><div className="w-full flex flex-1 flex-row justify-between">
        <div className="left-bar w-[350px] h-full border-t-4 border-gray-200 dark:border-neutral-800"><CreateSidebar onSubmit={createEvent} /></div>
        <div className="h-full py-3 flex-1 flex align-middle justify-center">
            <CalendarSelector onSelect={(date: Day) => {}} date={date} setDate={setDate} />
        </div>
    </div>
    {date !== undefined ? <DayPopup date={date} onClose={() => { setDate(undefined); }} /> : ""}
    {creating ? <>
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-30 z-50"></div>
        <div className="fixed top-0 left-0 w-full h-full bg-transparent z-60">
            <Loading />
        </div>
    </> : ""}
    </>)
}