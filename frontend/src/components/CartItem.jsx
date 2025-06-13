import { useState } from "react";


function CartItem({item , onRemove}){
    const [quantity , setQuantity] = useState(item.quantity);
    const product = item.Product;
    function addQuantity(cartitemid){
        try{
            fetch('http://localhost:3000/increasecart',{
                method : 'POST',
                headers :{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}` 
                },
                body: JSON.stringify({ cartitemid })
            })
            .then((res) => res.json())
            .then((data)=> setQuantity(data.quantity))
            .catch((err)=> console.log(err));
        }catch(err){
            console.log(err);
        }
    }

    function decreseQuantity(cartitemid){
        try{
            fetch('http://localhost:3000/decreasecart',{
                method : 'POST',
                headers :{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}` 
                },
                body: JSON.stringify({ cartitemid })
            })
            .then((res) => res.json())
            .then((data)=> setQuantity(data.quantity))
            .catch((err)=> console.log(err));
        }catch(err){
            console.log(err);
        }
    }

    function removeFromCart(cartitemid){
        try{
            fetch('http://localhost:3000/removefromcart',{
                method:'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                },
                body : JSON.stringify({cartitemid})
            })
            .then((res) => res.json())
            onRemove(item.id);
        }catch(err){
            console.log(err);
        }
    }

    function buy(cartitemid){
        try{
            fetch('http://localhost:3000/purchase',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem("token")}` 
                },
            body : JSON.stringify({cartitemid})
            })
            .then((res) => res.json())
            onRemove(cartitemid);
        }catch(err){
            console.log(err);
        }
    }

    // return(
    //     <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md w-full max-w-2xl">
    //                 <img id="image-recent" src="{item.image}" className="w-24 h-24 object-cover rounded-lg" alt="Product image"></img>
    //                 <div className="flex-1">
    //                     <h2 className="text-lg font-semibold" href={''}>{product.name}</h2>
    //                     <p  className="text-gray-500 text-sm mb-1"> { product.brand}</p>
    //                     <p  className="text-green-700 font-bold">৳ { product.price}</p>
    //                     <div className="flex items-center mt-2 gap-2">
    //                         <button className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300' onClick={()=>addQuantity(item.id)}>+</button>
                        
    //                         <button className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300' onClick={()=>decreseQuantity(item.id)}>-</button>
    //                     </div>
    //                 </div>
    //                     <button className='text-red-500 hover:text-red-700 text-sm' onClick={()=>removeFromCart(item.id)}>Remove from Cart</button>

                    
    //     </div>
    // )

    return(
        <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md w-full">
      <img
        src={'http://localhost:3000/uploads/'+ item.Product.ProductImages[0].name}
        alt={product.name}
        className="w-32 h-24 object-cover rounded-lg"
      />


      <div className="flex-1">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-500 text-sm mb-1">{product.brand}</p>
        <p className="text-green-700 font-bold">৳ {product.price}</p>

        
        <div className="flex items-center mt-2 gap-2">
          <button
            onClick={()=> decreseQuantity(item.id)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span className="px-3">{quantity}</span>
          <button
            onClick={()=> addQuantity(item.id)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>

      
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Remove
      </button>
            <button
        onClick={() => buy(item.id)}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Buy Now
      </button>
    </div>

    )
}

export default CartItem;