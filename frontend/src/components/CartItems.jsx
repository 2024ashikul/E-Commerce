import { useEffect, useState } from "react"
import CartItem from "./CartItem";
export default function CartItems(){

    const [cartItems, setCartItems ] = useState([]); 

    useEffect(()=>{
        fetch('http://localhost:3000/cartitems',{
                method : 'POST',
                headers :{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}` 
                }
            })
        .then((res => res.json()))
        .then((data) => setCartItems(data))
        .catch((err) => console.log("something error",err));
    },[]);

    function handleRemove(id){
        setCartItems(prev => prev.filter(cartitem => cartitem.id != id));
    }

    if(cartItems.length == 0){
        return <p>No cart items found</p>
    }

    return (
        <div>
            { cartItems.map( item => (
                <div key={item.id}>
                    <CartItem item = {item} onRemove = {handleRemove}/>
                </div>
            ) )}
        </div>
    );
}