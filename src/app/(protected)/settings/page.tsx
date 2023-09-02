import { getUser } from "../../../../lib/api"

async function getData() {
    let data
    try {
        data = await getUser();
    } catch(e) {}

    return data;
}

export default async function Page() {
    const userData = await getData();
    if (userData === undefined) {
        return (<div className="mx-auto flex-1 w-fit h-fit p-4 bg-white dark:bg-neutral-850">
            <h1>Error loading data</h1>
        </div>)
    }

    const { email } = userData;

    return (<>
        <div className="wrap w-fit h-fit mx-auto max-h-full shadow-sm shadow-white dark:shadow-neutral-850 dark:bg-neutral-850 my-8 px-8 py-4 rounded-md">
            <div className="wrapper mx-auto w-fit mb-3">
                <h1 className="text-center h-fit px-5">Settings</h1>
            </div>
            <div className="settings-frame text-left">
                <div className="setting-group my-2">
                    <p className="setting-label">Email</p>
                    <p className="input-mimic text-gray-500 dark:text-neutral-500 bg-gray-200 dark:bg-neutral-750 px-2 py-[0.1rem] rounded-sm border-[1px] border-gray-300 dark:border-gray-800">{email as string}</p>
                </div>
                <hr className="border-0 bg-gray-300 my-3 mb-2 dark:bg-neutral-700 h-[0.15rem]"></hr>
                <div className="setting-group my-2">
                    <p className="setting-label">Sign out</p>
                    <button className="mt-[0.1rem] text-center bg-red-500 dark:bg-red-600 rounded-md w-full text-white font-extrabold py-1">SIGN OUT</button>
                </div>
                <hr className="border-0 bg-gray-300 my-3 mb-2 dark:bg-neutral-700 h-[0.1rem]"></hr>
                <div className="setting-group my-2">
                    <p className="setting-label">Delete Account</p>
                    <button className="mt-[0.1rem] text-center bg-red-500 dark:bg-red-600 rounded-md w-full text-white font-extrabold py-1">DELETE ACCOUNT</button>
                </div>
            </div>
        </div>
    </>)
}