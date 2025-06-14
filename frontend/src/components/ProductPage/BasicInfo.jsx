import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState , useEffect } from "react";

export default function BasicInfo({productid}){

    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const [image , setImage] = useState(0);
    const [fade, setFade] = useState(true);
    
    
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/product/${productid}`)
        .then((res) => res.json())
        .then((data) => {setProduct(data.productinfo);setLoading(false);})
        .catch((err) => console.log(err))
    },[productid]);

    useEffect(()=> {
        const timer = setInterval(() => {
            changeSlideNext();
        },5000);
        return () => clearInterval(timer);
    });


    if(loading){
        return <p >loading</p>
    }
    

    function changeSlideNext(){
        setFade(false);
        setTimeout(()=> {
            setImage( prev =>{
                if(!product?.ProductImages || product.ProductImages.length == 0 ){
                    return 0;
                }
                return (prev+1) % product.ProductImages.length; 
            });
            setFade(true);
        },300)
        
    
        
    }

    function changeSlidePrev(){
        setFade(false);
        setTimeout(()=> {
            setImage( prev =>{
                if(!product?.ProductImages || prev-1 < 0 ){
                    return product.ProductImages.length-1;
                }
                return (prev-1) % product.ProductImages.length; 
            });
            setFade(true);
        },300)
        
    }
    if(!product){
        return <p className="text-lg text-amber-300">No product found</p>
    }

    return(
        <>
            <div className="grid grid-cols-10">
                    <div className=" col-span-4 relative flex  mt-3 overflow-hidden rounded-2xl  items-center justify-between bg-fuchsia-100">
                        <div className="w-[600px] h-[450px]"> 
                            <img
                            className={`w-full h-full object-contain transition-all duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}
                            src={`http://localhost:3000/uploads/${product.ProductImages[image].name}`}>
                                
                            </img>
                         </div>
                         <div className=" flex justify-center items-center">
                            <button onClick={changeSlidePrev} className="absolute left-2 "><ChevronLeftIcon className="h-12 w-8 ml-2"/></button>
                            <button onClick ={changeSlideNext} className="absolute right-2"> <ChevronRightIcon className="h-12 w-8" /></button>
                         </div>

                    </div>
                    <div className="pl-8 p-8 col-span-6 grid grid-rows-7">
                        
                        <p className="text-4xl text-blue-500 line-clamp-2 "> {product.name} </p>
                        <p className="text-green-400 "> {product.brand}</p>
                        <p className="text-2xl justify-end line-clamp-4 "> ${product.price}</p>
                        <p className="row-span-2" >{product.description}</p>
                    
                        <p className="">{product.availability}</p>
                        <div className="flex gap-4">
                            <button className="pt-2 pb-2 pl-4 pr-4 border-r-amber-500 bg-amber-300 hover:bg-green-500 transition"> Add to Cart</button>
                            <button className="pt-2 pb-2 pl-4 pr-4 border-r-amber-500 bg-amber-300 hover:bg-green-500 transition"> Buy Now</button>
                        </div>
                        

                    </div>
                    
                </div>
        </>
    )
}