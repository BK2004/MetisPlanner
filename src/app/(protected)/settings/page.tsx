import Settings from "../../../../components/users/Settings";
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

    return (<Settings email={String(userData.email)} />)
}