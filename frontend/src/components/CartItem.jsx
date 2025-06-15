import { useContext, useState } from "react";
import { CartContext } from "./Contexts/cartContext";


export default function CartItem({ item }) {
  console.log(item.quantity);

  const [localquantity, setLocalQuantity] = useState(item.quantity);
  const { removeFromCart, addQuantity, decreseQuantity } = useContext(CartContext);
  

  // function buy(cartitemid){
  //     try{
  //         fetch('http://localhost:3000/purchase',{
  //             method : 'POST',
  //             headers : {
  //                 'Content-Type' : 'application/json',
  //                 'Authorization' : `Bearer ${localStorage.getItem("token")}` 
  //             },
  //         body : JSON.stringify({cartitemid})
  //         })
  //         .then((res) => res.json())
  //         onRemove(cartitemid);
  //     }catch(err){
  //         console.log(err);
  //     }
  // }



  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md w-full">
      <img
        src={'http://localhost:3000/uploads/' + item.image}
        alt={item.name}
        className="w-32 h-24 object-cover rounded-lg"
      />


      <div className="flex-1">
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <p className="text-gray-500 text-sm mb-1">{item.brand}</p>
        <p className="text-green-700 font-bold">৳ {item.price}</p>


        <div className="flex items-center mt-2 gap-2">
          <button
            onClick={() => { decreseQuantity(item); setLocalQuantity(() => localquantity > 1 ? localquantity - 1 : localquantity) }}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span className="px-3">{localquantity}</span>
          <button
            onClick={() => { addQuantity(item); setLocalQuantity(() => localquantity + 1) }}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>


      <button
        onClick={() => removeFromCart(item)}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Remove
      </button>
      <button
        // onClick={() => buy(item.id)}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Buy Now
      </button>
    </div>

  )
}

