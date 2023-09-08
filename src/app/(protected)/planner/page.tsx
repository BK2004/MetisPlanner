'use client'

import { CalendarSelector, Day, Days, Months } from "../../../../components/planners";
import { useState } from 'react';
import { DayPopup } from "../../../../components/planners/DayPopup";

export default function Page() {
    const [date, setDate] = useState(undefined);

    return (<>
        <CalendarSelector onSelect={(date: Day) => {}} date={date} setDate={setDate} />
        {date !== undefined ? <DayPopup date={date} onClose={() => { setDate(undefined); }} /> : ""}
    </>)
}