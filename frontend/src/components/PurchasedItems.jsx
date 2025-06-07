import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import PurchaseItem from "./PurchaseItem";

export default function PurchasedItems(){
    const [purchaseItems , setPurchaseItems] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3000/purchaseitems',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res) => res.json())
        .then ((data) => {setPurchaseItems(data.purchases);console.log(data);})
        .catch((err)=> console.log(err));
    },[]);

    if(purchaseItems.length ==0){
        return <p>You have done no purchases</p>
    }

    return (
        <div >
            { purchaseItems.map( item => (
                <div key={item.id}>
                    <PurchaseItem item = {item} />
                </div>
            ) )}
        </div>
    );
}