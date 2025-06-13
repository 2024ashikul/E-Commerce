
import { useParams } from "react-router-dom";

import Comments from "../src/components/ProductPage/Comments";
import StarRating from "../src/components/ProductPage/StarRating";
import BasicInfo from "../src/components/ProductPage/BasicInfo";


export default function ProductPage(){
    const {id} = useParams();
    
    const productid =id;
    
    return (    
        <div>
            <div className="flex-col">
            
                <div>
                    <BasicInfo productid={productid}></BasicInfo>
                </div>
                
                <div>
                    <StarRating productid={productid}></StarRating>
                </div>
                <div>
                    <Comments productid = {productid} />

                    
                </div>
            
            </div>
            
        </div>
    )
}