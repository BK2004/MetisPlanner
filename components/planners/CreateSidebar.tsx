import { FieldValues, useForm } from "react-hook-form";

const CREATE_INTERVAL = 15; // allow for 15 minute event time intervals

export function CreateSidebar({ onSubmit }: { onSubmit: (data: FieldValues) => void }) {
    const { register, handleSubmit } = useForm();

    return (<form className="h-full w-full bg-white dark:bg-neutral-850 flex flex-col align-middle justify-start" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center pt-4 text-3xl">Create event</h1>
        <hr className="border-0 h-1 my-2 bg-gray-200 dark:bg-neutral-750 w-5/6 mx-auto rounded-lg" />
        <div className="input-group mb-4 w-4/5 mx-auto">
            <label htmlFor="label">Event Name</label>
            <input id="label" className="outline-0 dark:bg-neutral-750 bg-gray-100 ring-gray-400 dark:ring-neutral-900 ring-1 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 ring-inset border-0 rounded-md px-3 py-2 w-full transition-all duration-100 ease-linear" type="text" {...register("label", { required: true })}></input>
        </div>
        <div className="input-group mb-4 w-4/5 mx-auto flex flex-row justify-between">
            <div className="dropdown-group w-2/5">
                <label htmlFor="start">Start Time</label>
                <select id="start" className="appearance-none outline-0 dark:bg-neutral-750 bg-gray-100 ring-gray-400 dark:ring-neutral-900 ring-1 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 ring-inset border-0 rounded-md px-3 py-2 w-full transition-all duration-100 ease-linear" {...register("start", { required: true })}></select>
            </div>
            <div className="dropdown-group w-2/5">
                <label htmlFor="end" className="block text-right">End Time</label>
                <select id="end" className="appearance-none outline-0 dark:bg-neutral-750 bg-gray-100 ring-gray-400 dark:ring-neutral-900 ring-1 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 ring-inset border-0 rounded-md px-3 py-2 w-full transition-all duration-100 ease-linear" {...register("end", { required: true })}></select>
            </div>
        </div>
    </form>)
}