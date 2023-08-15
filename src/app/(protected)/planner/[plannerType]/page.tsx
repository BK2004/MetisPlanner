import { useEffect } from "react";
import { userManagement } from "../../../../../helpers/api";
import { redirect } from "next/navigation";

export default function plannerPage({ params }: { params: { plannerType: string }}) {
    return <h1>{params.plannerType}</h1>
}