'use client'

import { Day, EventBlock, Months, getTimesForDay } from './';

export function DayPopup({ date, data, onClose }: { date: Day, data: { id: string, start: string, end: string, content: string}[], onClose: () => void }) {
    return (
        <div className="wrapper absolute z-20 w-full h-full flex justify-center align-middle">
            <div className="relative justify-start flex flex-col align-middle text-center w-[90%] max-w-[400px] h-4/5 min-h-[600px] bg-gray-100 dark:bg-neutral-850 p-2 px-5 mx-auto my-auto z-30">
                <h1 className="py-2">{`${Months[date.month]} ${date.date}, ${date.year}`}</h1>

                <div className="schedule-display w-full flex-1 overflow-y-auto scroll-none">
                    {data.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()).map((val) => {
                        return <EventBlock key={val.id} eventDetails={val} />;
                    })}
                </div>
            </div>
            <div onClick={onClose} className="opacity-60 bg-black w-full h-full fixed top-0"></div>
        </div>
    );
}