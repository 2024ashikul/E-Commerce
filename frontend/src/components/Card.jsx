import '../../css/Card.css';
import { Link } from 'react-router-dom';
function addToCart(productid){
        const temp = localStorage.getItem("token");
        console.log(temp);
        try{
            fetch('http://localhost:3000/addtocart',{
                method : 'POST',
                headers :{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}` 
                },
                body: JSON.stringify({ productid })
            })
            
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err)=> console.log(err));
        }catch (err) {
        console.log(err);
    }
}
    


function Card({item}){
    
    const filename = 'http://localhost:3000/uploads/'+item.ProductImages[0].name;
    console.log(filename);
    return(
        <div className="flex rounded-lg p-2 size-72 aspect-video">
                    <img id="image-recent" src={filename} className=" rounded-lg mast-auto aspect-video" alt="Product image"></img>
                    <div className=" flexrounded-lg">
                        
                        <Link to={`/product/${item.id}`}>View Product</Link>
                        <p className="text-2xl">{item.description }</p>
                        <p  className="text-2xl">৳ {item.price }</p>
                        <button className='align-center' onClick={()=>addToCart(item.id)}>Add to Cart</button>
                    </div>
        </div>
    )
}

export default Card;