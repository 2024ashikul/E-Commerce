import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Card from "../src/components/Card";

export default function CategoryPage(){
    console.log('here');
    const [products , setProducts] = useState();
    const [loading , setLoading ] = useState(true);
    const {category} = useParams();
    console.log(category);
    useEffect(()=>{
        fetch(`http://localhost:3000/c/${category}`)
        .then((res) => res.json())
        .then((data) => {setProducts(data.products);setLoading(false);})
        .catch((err) => console.log(err))
    },[category])

    if(loading){
        return <p>loading</p>
    }

    console.log(products);
    if(!products){
        return <p> NO products found</p>
    }

    return (
        <div className="flex flex-col">
            <div className="">
                <p className="p-2 m-2 text-4xl uppercase">{category}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(item=>(
                <div key={item.id} >
                    <Card item={item} />
                </div>
            ))}
            </div>
        </div>
    )
}