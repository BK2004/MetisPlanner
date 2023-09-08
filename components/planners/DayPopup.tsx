'use client'

import { Day, Months } from './';

export function DayPopup({ date, onClose }: { date: Day, onClose: () => void }) {
    return (
        <div className="wrapper absolute z-20 w-full h-full flex justify-center align-middle">
            <div className="relative text-center w-[90%] max-w-[400px] h-4/5 min-h-[600px] bg-white dark:bg-neutral-850 mx-auto my-auto z-30">
                <h1>{`${Months[date.month]} ${date.date}, ${date.year}`}</h1>
            </div>
            <div onClick={onClose} className="opacity-60 bg-black w-full h-full fixed top-0"></div>
        </div>
    );
}