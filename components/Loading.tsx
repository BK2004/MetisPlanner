'use client'

import { useEffect } from "react"

export const Loading = ({ loadingKey="loading" }) => {
    function flipHeight(element: Element) {
        const isShown = element.classList.contains("h-8");
        element.classList.remove(`h-${isShown ? 8 : 0}`);
        element.classList.add(`h-${isShown ? 0 : 8}`);
    }

    useEffect(() => {
        const frame = document.querySelector(`#${loadingKey}.loading-indicator`)
        const bars = ["#bar-1", "#bar-2", "#bar-3"].map((id: string) => frame?.querySelector(id));
        
        // Call it shortly after first render in case of sub-750 ms response time
        setTimeout(() => {bars.forEach((bar) => {
            flipHeight(bar!);
        })}, 25);

        // Create interval that flips bar height every 750 seconds
        const interval = setInterval(() => {
            if (!frame || !frame.parentElement) clearInterval(interval);

            bars.forEach((bar) => {
                flipHeight(bar!);
            });
        }, 750)
    })

    return (
        <div id={loadingKey} className="loading-indicator w-fit h-full flex justify-between m-auto items-center">
            <div id="bar-1" className={"bg-blue-600 h-0 w-8 transition-all duration-150 ease-in-out"}></div>
            <div id="bar-2" className={"bg-blue-600 h-0 w-8 mx-3 transition-all duration-150 ease-in-out delay-150"}></div>
            <div id="bar-3" className={"bg-blue-600 h-0 w-8 transition-all duration-150 ease-in-out delay-300"}></div>
        </div>
    )
}