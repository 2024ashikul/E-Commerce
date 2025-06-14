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
    
    const filename = 'http://localhost:3000/uploads/'+ item.ProductImages[0].name;
    console.log(filename);
    return(
<div className="bg-white shadow-md rounded-2xl overflow-hidden w-72 hover:scale-105 transition-transform duration-300 m-3">
      <div className="w-full h-48 overflow-hidden">
        <img
          src={filename}
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col gap-1">
        <h2 className="text-lg font-semibold truncate">{item.name}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
        <p className="text-xl font-bold text-amber-600">৳ {item.price}</p>

        <div className="flex justify-between items-center mt-2">
          <Link
            to={`/product/${item.id}`}
            className="text-blue-600 underline text-sm hover:text-blue-800 bg-amber-400"
          >
            View Product
          </Link>

          <button
            onClick={() => addToCart(item.id)}
            className="bg-amber-500 text-white px-4 py-1 rounded-full text-sm hover:bg-amber-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    )
}

export default Card;