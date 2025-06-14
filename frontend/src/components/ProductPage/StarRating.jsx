import { useState,useEffect } from "react";
import { StarIcon } from '@heroicons/react/24/solid';
import { RadioIcon, StarIcon as StarOutline } from '@heroicons/react/24/outline';


export default function StarRating({productid}){

    const [starover, setStarOver] = useState(null);
    const [starRating, setStarRating] = useState(0);
    const [submitRating , setSubmitRating] = useState(false);
    const [rating , setRating] = useState(null);
    const stars = [0,1,2,3,4];

     useEffect(() => {
            console.log("Updated star rating:", starRating);
        }, [starRating]);

        useEffect(()=>{
        getRating(productid);
    },[productid]);
    
    function submitRatingFunction(){
        fetch(`http://localhost:3000/submitrating`,{
            method : 'POST',
            headers : {
                'Content-Type' :'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            },
            body : JSON.stringify({starRating, productid})
        })
        .then((res) => res.json())
        .then((data) => {console.log(data);document.getElementById("feedback").innerHTML = "Thanks for your rating"; getRating(productid)})
        .catch((err)=> console.log(err))
    }

    async function getRating(productid){
        try{
            const res = await fetch(`http://localhost:3000/getratings`,{
            method : 'POST',
            headers :{
                'Content-Type' :'application/json'
            },
            body : JSON.stringify({productid})
        });
        const data = await res.json();
        setRating(data.ans);
        }catch(err){
            console.log(err);
        }
        
    };
    console.log(rating);

    

    function starClick(star){
        if(starRating == star+1){
            setStarRating(0);
            setSubmitRating(false);
        }else{
            setStarRating(star+1);
            setSubmitRating(true);
        }
    }

    return (
        <>
            <div className="flex mt-4 ">
                        {/* <p>{rating}</p> */}
                        <p className="pt-2 pr-8 text-2xl text-indigo-400">Submit your Ratings</p>
                        <div className="flex">
                            {stars.map((star,index) => (
                                <div
                                    key={star}
                                    onMouseEnter={() => setStarOver(star)}
                                    onMouseLeave={() => setStarOver(null)}
                                    onClick={() => starClick(index)}>
                                    {starover !== null && star <= starover || starRating>=star+1 ? (
                                    <StarIcon className="h-12 w-12 text-yellow-400 transition-transform duration-2000" />
                                    ) : (
                                    <StarOutline className="h-12 w-12 text-gray-400 transition-transform duration-2000" />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="pt-1 pr-8 text-2xl text-indigo-400">
                            {submitRating ? <p className=" pl-4 pr-4 pt-2 pb-2 ml-6 hover:bg-amber-400 hover:rounded-3xl" id="feedback"> <button onClick={submitRatingFunction}> Submit Rating</button></p> : ""}
                        </div>
                </div>
        </>
    )
}