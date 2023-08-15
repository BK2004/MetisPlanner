import { userManagement } from "../../../helpers/api";
import { Redirect } from "../../../components";
import { cookies } from "next/headers";

export async function getServerSideProps() {
    const loggedIn = await userManagement.validateUser();
    return { props: { loggedIn } }
}

export default function Layout({ loggedIn, children }: { loggedIn: boolean, children: React.ReactNode}) {
    if (!loggedIn) {
        return (<></>);
    } else {
        return (<>{children}</>);
    }
}