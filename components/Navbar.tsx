'use client'

import { LogoSvg } from "."
import ProfileIcon from "./ProfileIcon"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { requestWrapper } from "../lib/client";
import { redirect } from "next/navigation";

export default function Navbar() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['theme']);
    const [redirected, setRedirected] = useState(false);

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

    const onSignOut = () => {
        requestWrapper.post('/api/logout').then((res) => {
            if (res.status == 200) {
                setRedirected(true);
            }
        });
    }

    // Redirect on logout
    useEffect(() => {
        if (redirected) {
            redirect('/login');
        }
    })

    return (<>
            <div className="z-30 w-full relative bg-white dark:bg-neutral-850 shadow-sm shadow-white dark:shadow-neutral-850 py-3 px-16 flex justify-between">
                <a className="brand flex" href="/">
                    <LogoSvg className="h-14 text-blue-600 dark:text-blue-500 my-auto" />
                </a>
                <button onClick={() => { setDropdownVisible(!dropdownVisible) }}>
                    <ProfileIcon className="h-14 w-14 text-blue-500 transition-all duration-300 ease-in-out hover:text-blue-400" />
                </button>
            </div>
            <div className={"text-center rounded-bl-md text-lg z-20 overflow-hidden transition-all duration-300 ease-in-out absolute right-0 top-[5rem] bg-white dark:bg-neutral-850 w-[11.5rem] h-auto " + (!dropdownVisible ? "-translate-y-full" : "")}>
                <a className="py-2 text-slate-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-900 block transition-all duration-300 ease-in-out" href="/settings">Settings</a>
                <button onClick={ toggleTheme } className="py-2 text-slate-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-900 block transition-all duration-300 ease-in-out w-full">Toggle Theme</button>
                <hr className="mx-5 bg-neutral-200 dark:bg-neutral-700 border-0 h-[4px] rounded-lg"/>
                <button className="w-full py-2 text-red-500 hover:bg-gray-100 font-semibold dark:hover:bg-neutral-900 block transition-all duration-300 ease-in-out" onClick={onSignOut}>Sign out</button>
            </div>
        </>
    )
}