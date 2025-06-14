
import { useContext } from "react";
import CartItems from "../src/components/CartItems"
import NavBar from "../src/components/NavBar/NavBar";
import PurchasedItems from "../src/components/PurchasedItems"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../src/components/Contexts/AuthContext";

export default function Profile(){
    const {setIsLoggedIn, setUserName} = useContext(AuthContext);
    console.log(localStorage.getItem("token")+'a');
    const navigate = useNavigate();
    if(!localStorage.getItem("token")){
        return navigate('/login');
    }
    function logOut(){
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUserName('');
    }
    


    return (
        <div>
            <h1 className="mb-8 pl-4 text-amber-200">Cart </h1>
            <CartItems> </CartItems>

            <h1 className=" mt-6 pl-4 text-amber-200 mb-8" >Purchase History </h1>
            <PurchasedItems> </PurchasedItems>
            <button onClick={logOut}>Log out</button>
        </div>
    )
}