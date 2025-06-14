import { useParams } from "react-router-dom"
import {  useEffect, useState } from "react";
import Card from "../src/components/Card";

export default function SearchResults(){
    const [products, setProducts] = useState([]);
    const { value } = useParams();

    useEffect(()=>{
        fetch(`http://localhost:3000/search/${value}`)
        .then((res) => res.json())
        .then((data) => {setProducts(data.products);console.log(data.products);})
        .catch((err) => console.log(err))
    },[value]);

    return(
        <div className="flex flex-col">
            <p className="text-3xl mt-4">Search Results for {value}</p>
            <p className="text-lg"> {products.length} items found</p>

            <div className="grid grid-cols-4 ">
                { products.map(item => (
                    <div key={item.id}>
                        <Card item={item}  />
                    </div>
                ))}
            </div>
        </div>
    )
}