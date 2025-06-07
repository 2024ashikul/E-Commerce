import { useEffect ,useState} from "react";
import { useParams } from "react-router-dom";

export default function ProductPage(){
    const {id} = useParams();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    
    
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/product/${id}`)
        .then((res) => res.json())
        .then((data) => {setProduct(data.productinfo);setLoading(false);})
        .catch((err) => console.log(err))
    },[id]);
    
    console.log(product);

    if(loading){
        return <p >loading</p>
    }
    
    if(!product){
        return <p className="text-lg text-amber-300">No product found</p>
    }
    const filename = 'http://localhost:3000/uploads/'+product.ProductImages[0].name;
    console.log(product);
    return (    
        <div>
            {product.id}
            {product.name}  
            <img src={filename}></img>
        </div>
    )
}