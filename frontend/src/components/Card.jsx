import { useContext } from 'react';
import '../../css/Card.css';
import { Link } from 'react-router-dom';
import { CartContext } from './Contexts/CartContext/CartContext';
// function addToCart(productid){
//         const temp = localStorage.getItem("token");
//         console.log(temp);
//         try{
//             fetch('http://localhost:3000/addtocart',{
//                 method : 'POST',
//                 headers :{
//                     'Content-Type':'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem("token")}` 
//                 },
//                 body: JSON.stringify({ productid })
//             })

//             .then((res) => res.json())
//             .then((data) => console.log(data))
//             .catch((err)=> console.log(err));
//         }catch (err) {
//         console.log(err);
//     }
// }



function Card({ item }) {

  const { addToCart } = useContext(CartContext);

  const filename = 'http://localhost:3000/uploads/' + item.ProductImages[0].name;
  console.log(filename);
  return (
    <div className="bg-white shadow-md rounded-2xl justify-between flex flex-col overflow-hidden w-60 aspect-[4/6] hover:scale-105 transition-transform duration-300 m-3">
      <div className="w-full  overflow-hidden">
        <img
          src={filename}
          alt="Product"
          className="w-full h-[180px]  object-cover"
        />
      </div>

      <div className="p-3 flex flex-col gap-1">
        <span className="text-2xl font-medium truncate">{item.name}</span>
        <span className="text-sm text-gray-600 line-clamp-2">{item.description}</span>
        <span className="text-lg font-bold text-amber-600">৳ {item.price}</span>

        <div className="flex justify-between items-center mt-1">
          <div className="bg-amber-500 text-white px-4 py-2 rounded-2xl text-sm hover:bg-amber-600 transition">
            <Link
              to={`/product/${item.id}`}
              className=""
            >
              View 
            </Link>
          </div>
          <div className="bg-amber-500 text-white px-3 py-2 rounded-2xl text-sm hover:bg-amber-600 transition">
            <button
              onClick={() => addToCart(item)}
              >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;