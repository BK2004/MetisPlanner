import React from "react";
import Navbar from "../../../components/Navbar";

export default function Layout({ children }: { children: React.ReactNode}) {
    return (<div className="container w-screen h-screen min-h-[750px] max-w-full flex flex-col">
                <Navbar />
                {children}
            </div>);
}