import { PathFailure } from "../../../../../components";
import { FinalizeResetForm } from "../../../../../components/users";
import { prisma } from "../../../../../helpers";

export default async function Page({ params }: { params: { resetId: string } }) {
    const resetId = params.resetId;
    let res;

    try {
        res = await prisma.passwordChanges.findUnique({ where: {
            id: resetId
        }});
    } catch(e) {}

    if (!res) {
        return <div className="wrapper rounded-lg col-start-2 col-span-3 md:col-start-3 xl:col-start-4 xl:col-span-2 row-start-2 row-span-2 flex flex-col justify-center text-3xl">
                    <PathFailure/>
                </div>;
    }

    return (<div className="wrapper rounded-lg col-start-2 col-span-3 md:col-start-3 xl:col-start-4 xl:col-span-2 row-start-2 row-span-2">
                <FinalizeResetForm email={res.email} resetId={resetId} />
            </div>)
}