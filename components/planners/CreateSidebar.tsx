'use client'

import { DaySelector, Day, getTimesForDay, ColorPicker, Days } from ".";
import { useState, useRef, useEffect } from "react";
import { convertToEpochSeconds } from ".";

const useFocus = () => {
    const htmlElRef: any = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

    return [ htmlElRef, setFocus ] 
}

export function CreateSidebar({ onSubmit }: { onSubmit: (data: { label: string, start: string, end: string, color: string }) => void }) {
    const [selectedDate, setSelectedDate] = useState<Day>({date: 1, weekday: new Date().getDay(), month: new Date().getMonth(), year: new Date().getFullYear()});
    const [fields, setFields] = useState<{ label: string, start: string, end: string }>({ label: "", start: "", end: "" });
    const [selectedColor, setSelectedColor] = useState("blue");
    const [labelRef, setLabelFocus] = useFocus();
    const [startRef, setStartFocus] = useFocus();
    const [endRef, setEndFocus] = useFocus();

    // set selected date to today on client
    useEffect(() => {
        setSelectedDate({date: new Date().getDate(), weekday: new Date().getDay() as Days, month: new Date().getMonth(), year: new Date().getFullYear() })
    }, [])

    const validateForm = () => {
        if (fields['label'] === '') {
            // Label input not filled out
            setLabelFocus();

            return;
        }
        if (fields['start'] === '') {
            // No start specified
            setStartFocus();

            return;
        }
        if (fields['end'] === '') {
            // No end specified
            setEndFocus();

            return;
        }

        onSubmit({...fields, color: selectedColor});

        setFields({ label: "", start: "", end: "" });
        setSelectedColor("blue");
    }

    const selectDate = (val: Day) => {
        const newStart = fields.start === "" ? "" : convertToEpochSeconds(val.date, val.month, val.year, Math.floor(Number(fields.start)/1000) - convertToEpochSeconds(selectedDate?.date || new Date().getDate(), selectedDate?.month || new Date().getMonth(), selectedDate?.year || new Date().getFullYear())) * 1000;
        const newEnd = fields.end === "" ? "" : convertToEpochSeconds(val.date, val.month, val.year, Math.floor(Number(fields.end)/1000) - convertToEpochSeconds(selectedDate?.date || new Date().getDate(), selectedDate?.month || new Date().getMonth(), selectedDate?.year || new Date().getFullYear())) * 1000;

        setSelectedDate(val);
        setFields({ label: fields.label, start: String(newStart), end: String(newEnd) });
    }

    const chooseTime = (start: string, end: string) => {
        let startNum = Number(start);
        let endNum = Number(end);
        if (isNaN(startNum) || isNaN(endNum)) {
            setFields({ label: fields.label, start: start, end: end });

            return;
        }
        // End num is less than start num, set end to start
        if (endNum < startNum) endNum = startNum;

        setFields({ label: fields.label, start: String(startNum), end: String(endNum) });
    }

    return (<div className="flex flex-col justify-start align-middle h-full w-full bg-white dark:bg-neutral-850 border-r-2 border-r-blue-500 dark:border-r-blue-600">
        <h1 className="text-center pt-4 text-3xl">Create event</h1>
        <hr className="border-0 h-1 my-2 bg-gray-200 dark:bg-neutral-750 w-5/6 mx-auto rounded-lg" />
        <div className="flex flex-1 flex-col align-middle justify-start">
            <div className="w-4/5 mx-auto mb-2">
                <DaySelector selected={selectedDate} selectDate={selectDate} />
            </div>
            <div className="input-group mb-4 w-4/5 mx-auto">
                <label htmlFor="label">Event Name</label>
                <input value={fields.label} ref={labelRef} onChange={(e) => { setFields({ label: e.target.value, start: fields.start, end: fields.end }) }} required name="label" id="label" className="outline-0 dark:bg-neutral-750 bg-gray-100 ring-gray-400 dark:ring-neutral-900 ring-1 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 ring-inset border-0 rounded-md px-3 py-2 w-full transition-all duration-100 ease-linear" type="text"></input>
            </div>
            <div className="input-group mb-4 w-4/5 mx-auto flex flex-row justify-between">
                <div className="dropdown-group w-2/5">
                    <label htmlFor="start">Start Time</label>
                    <select ref={startRef} required onChange={ (e) => {
                        chooseTime(e.target.value, fields.end );
                    }} value={fields.start} name="start" id="start" className="scroll-none appearance-none scroll-p-0 scroll-m-0 outline-0 dark:bg-neutral-750 bg-gray-100 ring-gray-400 dark:ring-neutral-900 ring-1 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 ring-inset border-0 rounded-md px-3 py-2 w-full transition-all duration-100 ease-linear">
                        <option value=""></option>
                        {getTimesForDay(selectedDate?.date || new Date().getDate(), selectedDate?.month || new Date().getMonth(), selectedDate?.year || new Date().getFullYear()).map(({ value, label }) => {
                            return (<option key={`start-${value}`} value={value}>{label}</option>);
                        })}
                    </select>
                </div>
                <div className="dropdown-group w-2/5">
                    <label htmlFor="end" className="block text-right">End Time</label>
                    <select ref={endRef} required onChange={ (e) => {
                        chooseTime(fields.start, e.target.value);
                    }} value={fields.end} name="end" id="end" className="scroll-none appearance-none scroll-p-0 scroll-m-0 outline-0 dark:bg-neutral-750 bg-gray-100 ring-gray-400 dark:ring-neutral-900 ring-1 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 ring-inset border-0 rounded-md px-3 py-2 w-full transition-all duration-100 ease-linear">
                        <option value=""></option>
                        {getTimesForDay(selectedDate?.date || new Date().getDate(), selectedDate?.month || new Date().getMonth(), selectedDate?.year || new Date().getFullYear()).map(({ value, label }) => {
                            return (<option key={`end-${value}`} value={value}>{label}</option>);
                        })}
                    </select>
                </div>
            </div>
            <div className="color-picker w-4/5 mx-auto mb-4">
                <ColorPicker selected={selectedColor} setColor={setSelectedColor} />
            </div>
            <input className="bot-wrap w-4/5 mx-auto text-2xl rounded-xl p-3 px-5 text-white bg-blue-600 hover:cursor-pointer hover:opacity-90 transition-all duration-150" type="submit" value="CREATE" onClick={(e) => {
                e.preventDefault();

                validateForm();
            }} />
        </div>
    </div>)
}