import { useEffect, useState } from "react";
import { AlertContext } from "./AlertContext";

export const AlertProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    // const [fade,setFade] = useState(false);
    useEffect(() => {
        

        if (message) {
            const timer = setTimeout(() => {
                
                setMessage(null);
            }, 4000);

    
            return () => {clearTimeout(timer);};
        }
        console.log('done');
        
    },[message]);

    return (
        <AlertContext.Provider value={{ message, setMessage }}>
            {children}
            
            {message && 

            ( <div className={`text-2xl items-center
             justify-center absolute top-20 right-0 h-12 
             w-96 bg-blue-300 overflow-visible 
             shadow-lg transition duration-500 
            
             `}>
                <div className=" justify-center items-center px-4 py-2">
                    <p>{message}</p>
                </div>
            </div>)
           }
        

        </AlertContext.Provider>
    );
}