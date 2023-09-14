'use client'

import { useMemo, useState } from "react";
import { getTimeString, getTimesForDay, convertIsoToDay, convertIsoToMsTime, convertMsToIsoTime, Day, convertToEpochSeconds } from ".";
import { DaySelector } from ".";

export function EventSettings({ data, close }: { data: any, close: () => void }) {
    const [changes, setChanges] = useState({ content: data.content, start: data.start, end: data.end});
    const [day, setDay] = useState(convertIsoToDay(data.start));

    const startTime = useMemo(() => convertIsoToMsTime(changes.start), [changes]);
    const endTime = useMemo(() => convertIsoToMsTime(changes.end), [changes]);

    const changesMade = () => {
        return !(changes.content === data.content && changes.start === data.start && changes.end === data.end);
    }

    const setDate = (date: Day) => {
        const oldDay = convertIsoToDay(changes.start);
        const newStart = convertToEpochSeconds(date.date, date.month, date.year, (Math.floor(convertIsoToMsTime(changes.start)/1000) - convertToEpochSeconds(oldDay.date, oldDay.month, oldDay.year))) * 1000;
        const newEnd = convertToEpochSeconds(date.date, date.month, date.year, (Math.floor(convertIsoToMsTime(changes.end)/1000) - convertToEpochSeconds(oldDay.date, oldDay.month, oldDay.year))) * 1000;

        console.log("new start: " + newStart);

        setChanges({ content: changes.content, start: convertMsToIsoTime(newStart), end: convertMsToIsoTime(newEnd)});
        setDay(date);
    }
    
    return (<>
        <div className="settings-wrapper absolute flex justify-center align-middle w-full h-full z-30 overflow-hidden">
            <div className="relative mx-auto my-auto settings-frame p-5 bg-white dark:bg-neutral-850 w-[90%] max-w-[750px] h-1/2 min-h-[400px] z-10">
                <h1 className="text-2xl mb-3">Event Settings</h1>
                {/* Input elements for making changes to the event */}
                <textarea value={changes.content} onKeyDown={(e) => {if (e.key === "Enter") e.preventDefault() }} onChange={(e) => { setChanges({ content: e.target.value, start: changes.start, end: changes.end }) }} className="outline-0 mb-1 bg-inherit h-11 overflow-y-auto scroll-none border-b-2 border-gray-100 dark:border-neutral-750  focus:bg-gray-100 focus:dark:bg-neutral-800 focus:border-b-4 focus:border-blue-500 focus:dark:border-blue-600 ring-blue-500 dark:ring-blue-600 focus:shadow-md text-lg border-0 px-3 py-2 w-full transition-all duration-75 ease-in-out resize-none"></textarea>
                <div className="col-wrap flex flex-row justify-around">
                    <div className="w-[250px] left">
                    <p className="w-full text-center text-lg text-neutral-600 dark:text-neutral-400">Date</p>
                        <DaySelector selected={day} selectDate={setDate} />
                    </div>
                    <div className="right w-[250px] flex flex-col items-center">
                        <p className="w-full text-center text-lg text-neutral-600 dark:text-neutral-400">Time</p>
                        <div className="time-wrap w-fit">
                            <select onChange={(e) => setChanges({ content: changes.content, start: convertMsToIsoTime(Number(e.target.value)), end: changes.end })} value={startTime} className="text-lg hover:cursor-pointer transition-all duration-150 ease-in-out appearance-none outline-0 ring-0 bg-white dark:bg-neutral-850 scroll-none w-fit pr-2 pl-1 rounded-md focus:shadow-md focus:bg-gray-100 border-b-2 border-gray-100 dark:border-neutral-750 focus:border-b-0 focus:dark:bg-neutral-700 focus:ring-1 focus:ring-blue-500 focus:dark:ring-blue-600">
                                {getTimesForDay(new Date(changes.start).getDate(), new Date(changes.start).getMonth(), new Date(changes.start).getFullYear()).map((val) => {
                                    return (<option className="bg-gray-100 dark:bg-neutral-700" key={`start-option-${val.value}`} value={val.value}>{val.label}</option>);
                                })}
                            </select>
                            <span className="mx-1">&mdash;</span>
                            <select onChange={(e) => setChanges({ content: changes.content, start: changes.start, end: convertMsToIsoTime(Number(e.target.value)) })} value={endTime} className="text-lg hover:cursor-pointer px-4 pr-2 transition-all duration-150 ease-in-out appearance-none outline-0 ring-0 bg-white dark:bg-neutral-850 scroll-none w-fit rounded-md focus:shadow-md focus:bg-gray-100 border-b-2 border-gray-100 dark:border-neutral-750 focus:border-b-0 focus:dark:bg-neutral-700 focus:ring-1 focus:ring-blue-500 focus:dark:ring-blue-600">
                                {getTimesForDay(new Date(changes.start).getDate(), new Date(changes.start).getMonth(), new Date(changes.start).getFullYear()).map((val) => {
                                    return <option className="bg-gray-100 dark:bg-neutral-700" key={`start-option-${val.value}`} value={val.value}>{val.label}</option>;
                                })}
                            </select>
                        </div>
                    </div>  
                </div>
            </div>
            <div onClick={close} className="opacity-60 bg-black w-full h-full fixed top-0"></div>
            <div className={`${changesMade() ? "bottom-4" : "bottom-0 translate-y-full"} flex justify-between align-middle transition-all duration-500 ease-in-out submit-popup fixed w-[80%] max-w-[670px] rounded-lg h-16 p-2 px-4 bg-white dark:bg-neutral-850 shadow-md`}>
                <p className="w-fit self-center text-lg font-bold">Changes Detected!</p>
                <div className="buttons h-full flex align-middle"> 
                    <button className="save-changes transition-colors duration-300 ease-in-out shadow-md text-white hover:bg-blue-400 hover:dark:bg-blue-500 bg-blue-500 dark:bg-blue-600 rounded-lg px-4 text-xl font-bold mr-4">SAVE</button>
                    <button onClick={close} className="discard-changes transition-colors duration-300 ease-in-out shadow-md text-white hover:bg-blue-400 hover:dark:bg-blue-500 bg-blue-500 dark:bg-blue-600 rounded-lg px-8 text-xl font-bold">DISCARD</button>
                </div>
            </div>
        </div>
    </>);
}