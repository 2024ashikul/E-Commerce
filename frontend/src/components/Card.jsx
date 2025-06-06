import '../../css/Card.css';

function addToCart(productid){
        const temp = localStorage.getItem("token");
        console.log(temp);
        try{
            fetch('http://localhost:3000/addtocart',{
                method : 'POST',
                headers :{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}` 
                },
                body: JSON.stringify({ productid })
            })
            
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err)=> console.log(err));
        }catch (err) {
        console.log(err);
    }
}
    

function Card({item}){
    
    return(
        <div className="flex flex-col rounded-lg p-2 size-72 aspect-video">
                    <img id="image-recent" src="{item.image}" className=" rounded-lg mast-auto" alt="Product image"></img>
                    <div className="rounded-lg">
                        <a className="" href={item.link}>{ item.name }</a>
                        <p className="flex">{item.description }</p>
                        <p  className="">৳ {item.price }</p>
                        <button className='btn' onClick={()=>addToCart(item.id)}>Add to Cart</button>
                    </div>
        </div>
    )
}

export default Card;