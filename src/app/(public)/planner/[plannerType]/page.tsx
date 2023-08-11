export default function plannerPage({ params }: { params: { plannerType: string }}) {
    return <h1>{params.plannerType}</h1>
}