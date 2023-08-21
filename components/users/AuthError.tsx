export const AuthError = ({ errorMessage }: { errorMessage: string }) => {
    return (<p className="text-red-950 bg-red-500 p-1 rounded-md text-center mb-3">{errorMessage}</p>);
}