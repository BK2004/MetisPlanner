import { LogoSvg } from "."
import ProfileIcon from "./ProfileIcon"

export default function Navbar() {
    return (
        <div className="w-full bg-white dark:bg-neutral-850 shadow-sm shadow-white dark:shadow-neutral-850 py-3 px-16 flex justify-between">
            <div className="brand flex">
                <LogoSvg className="h-10 text-blue-600 dark:text-blue-500 my-auto" />
                <h1 className="text-blue-600 dark:text-blue-500 my-auto font-bold ml-2 text-4xl">MetisPlanner</h1>
            </div>
            <ProfileIcon className="h-[3.5rem] text-blue-500 hover:cursor-pointer transition-all duration-300 ease-in-out hover:text-blue-400" />
        </div>
    )
}