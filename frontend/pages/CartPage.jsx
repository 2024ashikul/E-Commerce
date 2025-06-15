
import { useContext } from "react";
import CartItems from "../src/components/Profile/CartItems";
import { CartContext } from "../src/components/Contexts/CartContext/CartContext";
import CartItem from "../src/components/Profile/CartItem";


export default function CartPage(){
    const {cartItem} = useContext(CartContext);
    console.log(cartItem);
   
    return (
        <>
            <div className="mt-4">
                <p className="text-3xl text-indigo-400">Your Cart</p>
            </div>
            
            <div>
                {cartItem.map(item =>
                    <CartItem item={item}/>
                )}
                
            </div>
        </>
    )
}