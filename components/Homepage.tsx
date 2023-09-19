'use client'

import { useState, useMemo, useEffect } from 'react';
import DarkDesktop from '@/public/img/Dark Desktop.png';
import DarkMobile from '@/public/img/Dark Mobile.png';
import LightDesktop from '@/public/img/Light Desktop.png';
import LightMobile from '@/public/img/Light Mobile.png';
import Image from 'next/image';
import { LogoSvg } from '.';

export function Homepage({ loggedIn }: { loggedIn: boolean }) {
    const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);

    const isSmallScreen = useMemo(() => screenWidth! <= 600, [screenWidth]);

    // Subscribe to window resize event on mount
    useEffect(() => {
        setScreenWidth(window.innerWidth);

        window.addEventListener("resize", (e: UIEvent) => {
            setScreenWidth(window.innerWidth);
        })
    }, []);

    return (<div className="homepage w-full flex flex-col">
        <div className="w-full h-fit max-h-[40vh] overflow-hidden bg-black relative">
            <Image className="opacity-30 w-full" src={isSmallScreen ? DarkMobile : DarkDesktop} alt="planner screenshot" />
            <div className="content absolute top-0 h-full py-4 w-full z-10 flex flex-col justify-between items-center">
                <div className="top-block w-fit">
                    <h1 className="w-content text-white text-center text-2xl">Welcome to <span className="font-extrabold text-blue-500">MetisPlanner</span>.</h1>
                    <hr className="border-none bg-white h-1 my-2 mx-auto w-1/2 rounded-lg" />
                    <p className="text-white text-center text-lg">Fulfills all of your planning needs.</p>
                </div>
                { loggedIn ? 
                <a href="/planner" className="bg-blue-500 dark:bg-blue-600 w-content px-8 py-2 font-bold text-white ring-0 hover:ring-2 ring-blue-500 dark:ring-blue-600 rounded-md transition-all duration-100 ease-in-out">Go to Planner</a> 
                :
                <div className="button-wrap">
                    <a className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-400 dark:hover:bg-blue-500 text-white transition-all duration-300 ease-in-out rounded-lg text-lg font-extrabold text-center py-2 w-36 h-full inline-block" href="/login">LOGIN</a>
                    <a className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-400 dark:hover:bg-blue-500 text-white transition-all duration-300 ease-in-out rounded-lg text-lg font-extrabold text-center py-2 w-36 h-full inline-block ml-4" href="/register">REGISTER</a>
                </div>
                }
            </div>
        </div>
        <div className="text-content w-full flex-1 flex flex-col justify-start items-center py-6 px-10 text-center">
            <LogoSvg className="mb-4 w-[200px] text-blue-500 dark:text-blue-600" />
            <h1 className="text-3xl font-extrabold text-blue-500 mb-4">About MetisPlanner</h1>
            <p className="text-lg mb-2">
                <span className="text-blue-500 font-bold">Purpose: </span>MetisPlanner was made by a college undergraduate as an online alternative 
                to the inconvenience of having to carry your planner with you everywhere
                lest you forget that important project deadline or the doctor's appointment 
                that you've had to reschedule twice already. 
            </p>
            <p className="text-lg mb-2">
                <span className="text-blue-500 font-bold">Ease of Use: </span>MetisPlanner was designed 
                with ease of use and responsiveness in mind, so every change that you make to your planner
                will be effortless.
            </p>
            <p className="text-lg mb-2">
                <span className="text-blue-500 font-bold">Accessibility: </span>MetisPlanner can be
                accessed ANYWHERE, on ANY device, whether on a car ride, in a business meeting, in your bed, or watching TV.
            </p>
            <p className="text-lg mb-2">
                <span className="text-blue-500 font-bold">Free of Charge: </span>MetisPlanner is available
                for use with no payment necessary and no usage limits.
            </p>
            <p className="text-lg">
                <span className="text-blue-500 font-bold">Data Safety: </span>MetisPlanner encrypts and stores 
                your account details safely, and minimal cookies are used.
            </p>
        </div>
    </div>);
}