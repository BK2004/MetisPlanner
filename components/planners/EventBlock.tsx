import { getTimeString } from ".";

export function EventBlock({ openSettings, eventDetails }: { openSettings: (eventId: string) => void, eventDetails: { id: string, start: string, end: string, content: string, color: string }}) {
    return <button onClick={() => openSettings(eventDetails.id)} className={`block w-full shadow-md border-l-4 rounded-r-md py-1 mb-2 last:mb-0 border-${eventDetails.color}-500 bg-white dark:bg-neutral-800 hover:bg-gray-200 hover:dark:bg-neutral-750 hover:border-${eventDetails.color}-400 transition-all duration-300 ease-in-out`}>
        <h1 className="event-block-title text-xl text-left px-2">{eventDetails.content}</h1>
        <p className="w-fit px-2">
            {getTimeString(eventDetails.start)} - {getTimeString(eventDetails.end)}
        </p>
    </button>;
}