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
        <div>
            {products.map(item=>(
                <div key={item.id}>
                    <Card item={item} />
                </div>
            ))}
        </div>
    )
}