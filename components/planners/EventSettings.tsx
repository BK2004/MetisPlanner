'use client'

import { useState } from "react";
import { getTimeString, getTimesForDay, convertIsoToDay, convertIsoToMsTime, convertMsToIsoTime } from ".";

export function EventSettings({ data, close }: { data: any, close: () => void }) {
    const [changes, setChanges] = useState({ content: data.content, start: data.start, end: data.end});

    const changesMade = () => {
        console.log(changes.content, "==", data.content);
        console.log(changes.start, "==", data.start);
        console.log(changes.end, "==", data.end);
        return !(changes.content === data.content && changes.start === data.start && changes.end === data.end);
    }
    
    return (<>
        <div className="settings-wrapper absolute flex justify-center align-middle w-full h-full z-30 overflow-hidden">
            <div className="relative mx-auto my-auto settings-frame p-5 bg-white dark:bg-neutral-850 w-[90%] max-w-[750px] h-2/5 h-min-[300px] z-10">
                <h1 className="text-2xl mb-3">Event Settings</h1>
                {/* Input elements for making changes to the event */}
                <textarea value={changes.content} onKeyDown={(e) => {if (e.key === "Enter") e.preventDefault() }} onChange={(e) => { setChanges({ content: e.target.value, start: changes.start, end: changes.end }) }} className="outline-0 mb-1 bg-inherit h-11 overflow-y-auto scroll-none focus:bg-gray-100 focus:dark:bg-neutral-800 focus:border-b-2 border-blue-500 dark:border-blue-600 ring-blue-500 dark:ring-blue-600 focus:shadow-md text-lg border-0 px-3 py-2 w-full transition-all duration-75 ease-in-out resize-none"></textarea>
                <p className="w-fit text-lg text-neutral-600 dark:text-neutral-400">Times</p>
                <div className="time-container flex align-middle">
                    <select onChange={(e) => setChanges({ content: changes.content, start: convertMsToIsoTime(Number(e.target.value)), end: changes.end })} value={convertIsoToMsTime(changes.start)} className="hover:cursor-pointer transition-all duration-150 ease-in-out appearance-none outline-0 ring-0 bg-white dark:bg-neutral-850 scroll-none w-fit pr-2 pl-1 rounded-md focus:shadow-md focus:bg-gray-100 focus:dark:bg-neutral-700 focus:ring-1 ring-blue-500 dark:ring-blue-600">
                        {getTimesForDay(new Date(data.start).getDate(), new Date(data.start).getMonth(), new Date(data.start).getFullYear()).map((val) => {
                            return <option className="bg-gray-100 dark:bg-neutral-700" key={`start-option-${val.value}`} value={val.value}>{val.label}</option>;
                        })}
                    </select>
                    <span className="mx-1">&mdash;</span>
                    <select onChange={(e) => setChanges({ content: changes.content, start: changes.start, end: convertMsToIsoTime(Number(e.target.value)) })} value={convertIsoToMsTime(changes.end)} className="hover:cursor-pointer px-4 pr-2 transition-all duration-150 ease-in-out appearance-none outline-0 ring-0 bg-white dark:bg-neutral-850 scroll-none w-fit rounded-md focus:shadow-md focus:bg-gray-100 focus:dark:bg-neutral-700 focus:ring-1 ring-blue-500 dark:ring-blue-600">
                        {getTimesForDay(new Date(data.start).getDate(), new Date(data.start).getMonth(), new Date(data.start).getFullYear()).map((val) => {
                            return <option className="bg-gray-100 dark:bg-neutral-700" key={`start-option-${val.value}`} value={val.value}>{val.label}</option>;
                        })}
                    </select>
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