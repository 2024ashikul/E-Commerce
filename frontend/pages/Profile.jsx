
import { useContext, useEffect } from "react";
import CartItems from "../src/components/Profile/CartItems"
import NavBar from "../src/components/NavBar/NavBar";
import PurchasedItems from "../src/components/PurchasedItems"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../src/components/Contexts/AuthContext";

export default function Profile(){
    const {isLoggedIn, setIsLoggedIn, setUserName} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!isLoggedIn){
        return navigate('/login');
    }
    },[isLoggedIn,navigate]);
    

    function logOut(){
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUserName('');
    }
    


    return (
        <div>
            <p className="pt-4 pb-1 pl-4 text-4xl border-b-2">Cart </p>
            <CartItems> </CartItems>

            <p className="py-4 pl-4 text-4xl">Purchased Items </p>

            <PurchasedItems> </PurchasedItems>
            <button onClick={logOut}>Log out</button>
        </div>
    )
}