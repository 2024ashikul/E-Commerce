import { useContext, useEffect, useState } from "react"
import CartItem from "./CartItem";
import { CartContext } from "../Contexts/CartContext/CartContext";
export default function CartItems(){

    const {cartItem, setCartItem} = useContext(CartContext);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        setLoading(true);
        console.log(localStorage.getItem("token"));
        console.log(localStorage.getItem("username"));
        fetch('http://localhost:3000/cartitems',{
                method : 'POST',
                headers :{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}` 
                }
            })
        .then((res => res.json()))
        .then((data) => {setCartItem(data);setLoading(false);})
        .catch((err) => console.log("something error",err));
    },[setCartItem]);

    

    
    if(loading){
        return <p >loading</p>
    }
    
    if(cartItem.length == 0){
        return <p className="text-lg text-amber-300">No cart items found</p>
    }

    return (
        <div className="flex-col ">
            { !cartItem ? "You have no cart Items"
            :
            cartItem.map( item => (
                <div key={item.id} className="">
                    <CartItem item = {item} />
                </div>
            ) )}
        </div>
    );
}