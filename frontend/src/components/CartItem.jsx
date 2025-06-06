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

    return(
        <div className="flex flex-col rounded-lg p-2 size-72 aspect-video">
                    <img id="image-recent" src="{item.image}" className=" rounded-lg mast-auto" alt="Product image"></img>
                    <div className="rounded-lg">
                        <a className="" href={''}>{product.name}</a>
                        <p className="flex">{}</p>
                        <p  className="">৳ { product.price}</p>
                        
                        <button className='btn flex' onClick={()=>addQuantity(item.id)}>+</button>
                        <p className='flex' >{quantity}</p>
                        <button className='btn flex' onClick={()=>decreseQuantity(item.id)}>-</button>
                        <button className='btn flex' onClick={()=>removeFromCart(item.id)}>Remove from Cart</button>

                    </div>
        </div>
    )
}

export default CartItem;