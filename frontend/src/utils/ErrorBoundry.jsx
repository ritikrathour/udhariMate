import { useEffect, useState } from "react"
export const ErrorBoundary = ({ children }) => {
    const [error, setError] = useState(null); 
    useEffect(() => {
        const unHandledRejectionHandler = (event) => {
            setError(event.reason);
            console.log(event.reason);
            
        }
        window.addEventListener("unhandledrejection",unHandledRejectionHandler)
        return () => {
            window.removeEventListener("unhandledrejection", unHandledRejectionHandler)
        }
    }, [error]); 
    
    if (!error) {
        return children
    }
    return (
        <div>
            <h2>Something went wrong</h2>
            <p>{error.message}</p>
        </div>
    )
}