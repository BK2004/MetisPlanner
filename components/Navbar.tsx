'use client'

import { LogoSvg } from "."
import ProfileIcon from "./ProfileIcon"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { requestWrapper } from "../lib/client";
import { redirect } from "next/navigation";

export default function Navbar({ loggedIn }: { loggedIn: boolean }) {
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
            <div className="z-30 w-full relative bg-white dark:bg-neutral-850 shadow-sm shadow-white dark:shadow-neutral-850 py-3 px-16 flex justify-between items-center">
                <div className="h-fit flex left-wrap items-center">
                    <a className="brand mr-5 sm:mr-10" href="/">
                        <LogoSvg className="h-14 aspect-square text-blue-500 dark:text-blue-600 my-auto" />
                    </a>
                    {loggedIn ? 
                        <a className="text-blue-500 hover:underline hover:underline-offset-4 transition-all duration-300 ease-in-out text-4xl font-bold" href="/planner">PLANNER</a>
                    : ""}
                </div>
                {!loggedIn ?
                <div className="button-wrap h-full flex flex-row">
                    <a className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-400 dark:hover:bg-blue-500 text-white transition-all duration-300 ease-in-out rounded-lg text-lg font-extrabold flex-1 text-center py-2 px-2 sm:px-6 h-full inline-block" href="/login">LOGIN</a>
                    <a className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-400 dark:hover:bg-blue-500 text-white transition-all duration-300 ease-in-out rounded-lg text-lg font-extrabold flex-1 text-center py-2 px-2 sm:px-6 h-full inline-block ml-2" href="/register">REGISTER</a>
                </div>
                :
                <button onClick={() => { setDropdownVisible(!dropdownVisible) }}>
                    <ProfileIcon className="h-14 w-14 text-blue-500 transition-all duration-300 ease-in-out hover:text-blue-400" />
                </button>
                }
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