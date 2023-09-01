'use client'

import { LogoSvg } from "."
import ProfileIcon from "./ProfileIcon"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";

export default function Navbar() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['theme']);

    const toggleTheme = () => {
        const html = document.documentElement;
    
        if (html.classList.contains("dark")) {
            html.classList.remove("dark");
        } else {
            html.classList.add("dark");
        }

        setCookie("theme", html.classList.contains("dark") ? "Dark" : "Light", {
            path: "/",
            maxAge: 365 * 24 * 60 * 60, // 1 year
        });
    }

    return (<>
            <div className="z-10 w-full relative bg-white dark:bg-neutral-850 shadow-sm shadow-white dark:shadow-neutral-850 py-3 px-16 flex justify-between">
                <a className="brand flex" href="/">
                    <LogoSvg className="h-10 text-blue-600 dark:text-blue-500 my-auto" />
                    <h1 className="text-blue-600 dark:text-blue-500 my-auto font-bold ml-2 text-4xl">MetisPlanner</h1>
                </a>
                <button onClick={() => { setDropdownVisible(!dropdownVisible) }}>
                    <ProfileIcon className="h-14 w-14 text-blue-500 transition-all duration-300 ease-in-out hover:text-blue-400" />
                </button>
            </div>
            <div className={"text-center rounded-bl-md text-lg overflow-hidden transition-all duration-300 ease-in-out absolute right-0 top-[5rem] bg-white dark:bg-neutral-850 w-[11.5rem] h-auto " + (!dropdownVisible ? "-translate-y-full" : "")}>
                <a className="py-2 text-slate-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-900 block transition-all duration-300 ease-in-out" href="/settings">Settings</a>
                <button onClick={ toggleTheme } className="py-2 text-slate-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-900 block transition-all duration-300 ease-in-out w-full">Toggle Theme</button>
                <hr className="mx-5 bg-neutral-200 dark:bg-neutral-700 border-0 h-[4px] rounded-lg"/>
                <a className="py-2 text-red-500 hover:bg-gray-100 font-semibold dark:hover:bg-neutral-900 block transition-all duration-300 ease-in-out" href="/api/logout">Sign out</a>
            </div>
        </>
    )
}