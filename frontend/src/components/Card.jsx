import '../../css/Card.css';

function Card({item}){
    return(
        <div className="flex flex-col rounded-lg p-2 size-72 aspect-video">
                    <img id="image-recent" src="{item.image}" className=" rounded-lg mast-auto" alt="Product image"></img>
                    <div className="rounded-lg">
                        <a className="" href={item.link}>{ item.name }</a>
                        <p className="flex">{item.description }</p>
                        <p  className="">৳ {item.price }</p>
                    </div>
        </div>
    )
}

export default Card;