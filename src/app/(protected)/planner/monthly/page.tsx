'use client'

import { CalendarSelector, Day } from "../../../../../components/planners";

export default function Page() {
    return (<><CalendarSelector onSelect={(date: Day) => {console.log(date)}} /></>)
}