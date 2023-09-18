import React from "react";
import Navbar from "../../../components/Navbar";

export default function Layout({ children }: { children: React.ReactNode}) {
    return (<div className="container w-screen h-screen min-h-[800px] max-w-full flex flex-col items-center">
                <Navbar loggedIn={true} />
                {children}
            </div>);
}