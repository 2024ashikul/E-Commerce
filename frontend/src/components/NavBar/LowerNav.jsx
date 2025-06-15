import { useState, useEffect } from "react";
import { Link } from "react-router-dom";




export default function LowerNav() {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        fetch(`http://192.168.0.102:3000/categoryall`)
            .then((res) => res.json())
            .then((data) => { setCategory(data); console.log(data); })
            .catch((err) => console.log(err))
    }, []);

    return (
        <div className={`flex gap-2 flex-nowrap overflow-hidden items-center justify-center bg-amber-300`}>
            {/* Dynamic bug to fix cols */}
            {category.map(item => (
                <div key={item} className="">
                    <Link to={`/c/${item}`} className="transition via-teal-900 no-underline hover:animate-bounce mb-0" style={{ textDecoration: 'none' }} >
                        <p className="
                        my-1
                  px-4 py-1
                 text-indigo-400
                  uppercase  
                  hover:bg-red-400
                  transition-transform 
                  hover:rounded-1xl 
                  hover:text-white
                  rounded-3xl
                  hover:align-justify
                  text-center
                  whitespace-nowrap
                    " >
                            {item}
                        </p>
                    </Link>
                </div>
            ))}
        </div>
    )
}