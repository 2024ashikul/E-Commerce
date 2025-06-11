import { useParams } from "react-router-dom"
import {  useEffect, useState } from "react";
import Card from "../src/components/Card";

export default function SearchResults(){
    const [products, setProducts] = useState([]);
    const { value } = useParams();
//     try{
//         console.log("ssea");
//     fetch(`http://localhost:3000/search/${value}`)
//     .then((res) => res.json())
//     .then((data) => {setProducts(data.products);console.log(data.products);})
//     .catch((err) => console.log(err))
// }catch(err){
//     console.log(err)
// }
    useEffect(()=>{
        fetch(`http://localhost:3000/search/${value}`)
        .then((res) => res.json())
        .then((data) => {setProducts(data.products);console.log(data.products);})
        .catch((err) => console.log(err))
    },[value]);

    return(
        <div className="flex flex-col">
            <p>{products.length} items found</p>

            <div className="flex ">
                {products.map(item => (
                    <div key={item.id}>
                        <Card item={item}  />
                    </div>
                ))}
            </div>
        </div>
    )
}