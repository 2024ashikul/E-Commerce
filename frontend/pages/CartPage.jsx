
import CartItems from "../src/components/CartItems";


export default function CartPage(){


    return (
        <>
            <div className="mt-4">
                <p className="text-3xl text-indigo-400">Your Cart</p>
            </div>
            
            <div>
                <CartItems></CartItems>
            </div>
        </>
    )
}