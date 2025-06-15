import { useContext } from "react"
import { AlertContext } from "./Contexts/AlertContext/AlertContext"


export default function Alert() {
    const { message } = useContext(AlertContext);
    return (
        <div className="relative">
            {message ? 
            <div className=" absolute top-10 right-0 h-10 w-96 bg-green-300 rounded-2xl overflow-visible shadow-lg">
                <div className=" justify-center items-center p-2">
                    <p>{message}</p>
                </div>
            </div>
           : '' }
        </div>
    )
}