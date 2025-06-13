import { useEffect, useState } from "react"
import CartItem from "./CartItem";
export default function CartItems(){

    const [cartItems, setCartItems ] = useState([]); 
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
        .then((data) => {setCartItems(data);setLoading(false);})
        .catch((err) => console.log("something error",err));
    },[]);

    function handleRemove(id){
        setCartItems(prev => prev.filter(cartitem => cartitem.id != id));
    }

    
    if(loading){
        return <p >loading</p>
    }
    
    if(cartItems.length == 0){
        return <p className="text-lg text-amber-300">No cart items found</p>
    }

    return (
        <div className="flex-col ">
            { cartItems.map( item => (
                <div key={item.id} className="my-1">
                    <CartItem item = {item} onRemove = {handleRemove}/>
                </div>
            ) )}
        </div>
    );
}