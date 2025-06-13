import { useEffect ,useState} from "react";
import { useParams } from "react-router-dom";
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import Comments from "../src/components/ProductPage/Comments";


export default function ProductPage(){
    const {id} = useParams();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const [image , setImage] = useState(0);
    const [starover, setStarOver] = useState(null);
    const [starRating, setStarRating] = useState(0);
    const [submitRating , setSubmitRating] = useState(false);
    const [comment, setComment] = useState([]);
    const [selfComment, setSelfComment] = useState("");


    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/product/${id}`)
        .then((res) => res.json())
        .then((data) => {setProduct(data.productinfo);setLoading(false);setComment(data.comments);})
        .catch((err) => console.log(err))
    },[id]);
    useEffect(() => {
        console.log("Updated star rating:", starRating);
    }, [starRating]);

    
    console.log(product);

    if(loading){
        return <p >loading</p>
    }

    

    function changeSlide(){
        setImage( prev =>{
                if(!product?.ProductImages || product.ProductImages.length ==0 ){
                    return 0;
                }
                return (prev+1) % product.ProductImages.length;
                
            });
    }
    const productid = product.id;
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
        .then((data) => {console.log(data);document.getElementById("feedback").innerHTML = "Thanks for your rating";})
        .catch((err)=> console.log(err))
    }
    
    function handleCommentChange(e) {
        setSelfComment(e.target.value);
    }

    if(!product){
        return <p className="text-lg text-amber-300">No product found</p>
    }

    function starClick(star){
        if(starRating == star+1){
            setStarRating(0);
            setSubmitRating(false);
        }else{
            setStarRating(star+1);
            setSubmitRating(true);
        }
    }
    
    function sumbitComment(){
        console.log(selfComment);
        fetch(`http://localhost:3000/submitcomment`,{
            method : 'POST',
            headers : {
                'Content-Type' :'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            },
            body : JSON.stringify({selfComment, productid})
        })
        .then((res) => res.json())
        .then((data) => {console.log(data);setComment(prev => [...prev,data.comment]);console.log(2);console.log(comment);})
        .catch((err)=> console.log(err))
    }

    const stars = [0,1,2,3,4];
    console.log(product);
    return (    
        <div>
            <div className="flex-col">
            
                <div className="flex">
                    <div className="flex w-180 h-120 mt-3">
                        <img src={`http://localhost:3000/uploads/${product.ProductImages[image].name}`}></img>
                    </div>
                    <div className="pl-4 flex flex-col p-4 ">
                        
                        <p className="text-4xl  text-blue-500 line-clamp-2 "> {product.name} adfas asdfasd afsd</p>
                        <p className="text-green-400 "> {product.brand}</p>
                        <p className="text-2xl justify-end line-clamp-4 "> ${product.price}</p>
                        <p className="" >{product.description}</p>
                        <p className="">{product.availability}</p>
                        <div>
                            <button className="pt-2 pb-2 pl-4 pr-4 border-r-amber-500 bg-amber-300 hover:bg-green-500 transition"> Add to Cart</button>
                            <button className="pt-2 pb-2 pl-4 pr-4 border-r-amber-500 bg-amber-300 hover:bg-green-500 transition"> Buy Now</button>
                        </div>
                        
                        <button onClick={changeSlide}> next </button>
                    </div>
                    
                </div>
                <div className="flex mt-4 ">
                        <p className="pt-2 pr-8 text-2xl text-indigo-400">Submit your Ratings</p>
                        <div className="flex">
                            {stars.map((star,index) => (
                                <div
                                    key={star}
                                    onMouseEnter={() => setStarOver(star)}
                                    onMouseLeave={() => setStarOver(null)}
                                    onClick={() => starClick(index)}>
                                    {starover !== null && star <= starover || starRating>=star+1 ? (
                                    <StarIcon className="h-12 w-12 text-yellow-400 transition-transform duration-200 scale-125" />
                                    ) : (
                                    <StarOutline className="h-12 w-12 text-gray-400 transition-transform duration-200" />
                                    )}
                                </div>
                            ))}
                        </div>
                        <p className="pt-1 pr-8 text-2xl text-indigo-400">
                            {submitRating ? <div className=" pl-4 pr-4 pt-2 pb-2 ml-6 hover:bg-amber-400 hover:rounded-3xl" id="feedback"> <button onClick={submitRatingFunction}> Submit Rating</button></div> : ""}
                        </p>
                    
                    
                </div>
                <div className="flex flex-col mt-6 w-full max-w-4xl mx-auto px-4">
                    <p className="pt-2 pr-8 text-2xl text-indigo-400">Comments</p>
                    <textarea className="border-1 rounded-2xl px-4 py-2 focus:outline-none focus:ring-blue-400 resize-none" id="comment" onChange={handleCommentChange}>

                    </textarea>
                    <button onClick={sumbitComment} >Submit</button>
                    <div className="">
                        {comment.length} comments found
                        {comment.map(item => (
                            <div key={item.id} className="flex flex-col border-s-fuchsia-10 p-3 mt-3 rounded-2xl shadow-md">
                                <div className="flex m-1 p-1 items-center justify-between">
                                    <p className=" m-0 text-1xl font-medium">{ item.User.name}</p>
                                    <p className=" p-1 pl-4 m-0 text-sm"> {item.createdAt.slice(2,10)}</p>
                                </div>
                                <p className="text-sm m-0 pl-8 p"> {item.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <Comments item = {productid} />

                    
                </div>
            
            </div>
            
        </div>
    )
}