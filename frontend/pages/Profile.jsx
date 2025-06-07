
import CartItems from "../src/components/CartItems"
import NavBar from "../src/components/NavBar";
import PurchasedItems from "../src/components/PurchasedItems"
import { useNavigate } from 'react-router-dom';

export default function Profile(){
    console.log(localStorage.getItem("token")+'a');
    const navigate = useNavigate();
    if(!localStorage.getItem("token")){
        return navigate('/login');
    }
    // try{
    //     fetch('http://localhost:3000/profile',{
    //         method : 'POST',
    //             headers :{
    //                 'Content-Type':'application/json',
    //                 'Authorization': `Bearer ${localStorage.getItem("token")}` 
    //             }
    //     })
    //     .then((res) => res.json())
    //     .catch((err)=> console.log(err));
    // }catch(err){
    //     console.log(err)
    // }


    return (
        <div>
            <h1 className="mb-8 pl-4 text-amber-200">Cart </h1>
            <CartItems> </CartItems>

            <h1 className=" mt-6 pl-4 text-amber-200 mb-8" >Purchase History </h1>
            <PurchasedItems> </PurchasedItems>
        </div>
    )
}