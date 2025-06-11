import { useEffect ,useState} from "react";
import { useParams } from "react-router-dom";
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';


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
                <div className="flex mt-4">
                        <h3 className="pt-2 pr-8">Submit your Ratings</h3>
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
                        <h3>
                            {submitRating ? <div className=" pl-4 pr-4 pt-2 pb-2 ml-6 hover:bg-amber-400 " id="feedback"> <button onClick={submitRatingFunction}> Submit Rating</button></div> : ""}
                        </h3>
                    
                    
                </div>
                <div className="flex flex-col mt-4">
                    <h3>Comments</h3>
                    <textarea className=" border-1" id="comment" onChange={handleCommentChange}>

                    </textarea>
                    <button onClick={sumbitComment} >Submit</button>
                    <div>
                        {comment.length} comments found
                        {comment.map(item => (
                            <div key={item.id} className="flex flex-col border-s-fuchsia-10 p-1 m-1">
                                <div className="flex m-1 p-1">
                                    <p className=" m-0" style={{fontSize : '16px'}}>Username lastname</p>
                                    <p className=" p-1 pl-4 m-0" style={{fontSize : '10px'}}> {item.createdAt}</p>
                                </div>
                                <p className=" m-0 pl-8"> {item.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            
            </div>
            
        </div>
    )
}