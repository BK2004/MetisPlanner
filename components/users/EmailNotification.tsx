export const EmailNotification = ({ message, title, email }: { message: string, title: string, email: string }) => {
    return (
        <div className="flex justify-evenly flex-col w-full h-full p-6">
            <div>
                <h1 className="text-center mb-5 font-bold text-slate-800 dark:text-white text-2xl">{title}</h1>
                <p className="text-center text-slate-700 dark:text-white">We sent an email to <span className="font-semibold text-slate-800 dark:text-white">{email}</span>. {message}</p>
            </div>
            <p className="text-center text-slate-700 dark:text-white">If you don't see it, <span className="font-bold">check your spam.</span></p>
        </div>
    )
}