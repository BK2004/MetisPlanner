export const Verify = ({ email }: { email: string }) => {
    return (
        <div className="flex justify-evenly flex-col w-full h-full p-6">
            <div>
                <h1 className="text-center mb-5 font-bold text-slate-800 dark:text-white text-2xl">Please verify your email.</h1>
                <p className="text-center text-slate-700 dark:text-white">We sent an email to <span className="font-semibold text-slate-800 dark:text-white">{email}</span>. Click the link in the next 15 minutes to complete your registration!</p>
            </div>
            <p className="text-center text-slate-700 dark:text-white">If you don't see it, <span className="font-bold">check your spam.</span></p>
        </div>
    )
}