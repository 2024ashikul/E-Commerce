import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function LowerNav() {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/categoryall`)
            .then((res) => res.json())
            .then((data) => {
                setCategory(data);
                console.log(data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="w-full flex justify-center bg-white border-b border-green-200 shadow-sm">
            <div className="flex  gap-3 overflow-x-auto px-4 py-2 scrollbar-hide">
                {category.map((item) => (
                    <Link
                        key={item}
                        to={`/c/${item}`}
                        className="group"
                        style={{ textDecoration: "none" }}
                    >
                        <span
                            className="
                px-3 py-1
    text-gray-700
    text-sm
    rounded-full
    bg-gray-100
    shadow-sm
    transition
    whitespace-nowrap
    hover:bg-blue-500
    hover:text-white
    
              "
                        >
                            {item.toUpperCase()}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
