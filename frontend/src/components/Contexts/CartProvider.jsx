


import { useContext, useEffect, useState } from "react";
import { CartContext } from "./cartContext";
import { AuthContext } from "./AuthContext";


export const CartProvider = ({ children }) => {

    const { isLoggedIn } = useContext(AuthContext);
    const [cartItem, setCartItem] = useState(() => {
        const cartitem = localStorage.getItem('cartitems');
        return cartitem ? JSON.parse(cartitem) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartitems', JSON.stringify(cartItem));
    }, [cartItem]);


    async function addToCart(item) {
        console.log('adding to cart');
        console.log(item);


        if (isLoggedIn) {
            const productid = item.id;
            fetch('http://192.168.0.102:3000/addtocart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ productid })
            })
                .then((res) => res.json())
                .then((data) => { console.log(data); })
                .catch((err) => console.log(err));
        } else {
            try {

                setCartItem((prev, index) =>
                    [...prev, {
                        id: index,
                        name: item.name ,
                        price: item.price,
                        quantity: 1,
                        brand: item.brand,
                        image: item.ProductImages[0].name
                    }]);

                    
                console.log("added")
                console.log(cartItem);
            } catch (Err) {
                console.log(Err);
                console.log("Coult not add");
            }
        }
    }

    async function removeFromCart(item) {
        console.log('revmoing to cart');
        console.log(item);

        if (isLoggedIn) {
            const cartid = item.id;
            fetch('http://192.168.0.102:3000/removefromcart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ cartid })
            })
                .then((res) => res.json())
                .then((data) => { console.log(data); })
                .catch((err) => console.log(err));
        } else {
            try {

                setCartItem(prev => prev.filter(temp => temp != item));
                console.log("remove")
                console.log(cartItem);
            } catch (Err) {
                console.log(Err);
                console.log("Coult not add");
            }
        }
    }

    async function addQuantity(item) {
        if (isLoggedIn) {

            try {
                const cartid = item.id;
                fetch('http://localhost:3000/increasecart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ cartid })
                })
                    .then((res) => res.json())
                    .then((data) => console.log(data.quantity))
                    .catch((err) => console.log(err));
            } catch (err) {
                console.log(err);
            }

        } else {
            console.log("adding");
            setCartItem(prev =>
                prev.map(temp => (
                    temp === item ? { ...temp, quantity: temp.quantity + 1 } : temp
                ))
            )
        }
    }

    async function decreseQuantity(item) {

        if (isLoggedIn) {
            const cartid = item.id;
            try {
                fetch('http://localhost:3000/decreasecart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ cartid })
                })
                    .then((res) => res.json())
                    .then((data) => console.log(data))
                    .catch((err) => console.log(err));
            } catch (err) {
                console.log(err);
            }
        } else {
            setCartItem(prev =>
                prev.map(temp => (
                    temp === item ? { ...temp, quantity: temp.quantity > 1 ? temp.quantity - 1 : temp.quantity } : temp
                ))
            )
        }
    }






    return (
        <CartContext.Provider value={{ cartItem, setCartItem, addToCart, removeFromCart, addQuantity, decreseQuantity }}>
            {children}
        </CartContext.Provider>
    )
}