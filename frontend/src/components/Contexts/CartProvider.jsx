


import { useState } from "react";
import { CartContext } from "./cartContext";


export const CartProvider = ({children}) => {
    const [cartItem, setCartItem] = useState(null);



    return (
        <CartContext.Provider value={{cartItem, setCartItem}}>
            {children}
        </CartContext.Provider>
    )
}