import React from "react";
import { AbsoluteLogo } from "../../../components";

export default function Layout({ children }: { children: React.ReactNode}) {
    return (<div className="grid grid-cols-5 md:grid-cols-7 xl:grid-cols-8 grid-rows-4 gap-4 container w-screen h-screen min-h-[750px] max-w-full">
                <AbsoluteLogo />
                {children}
            </div>)
}