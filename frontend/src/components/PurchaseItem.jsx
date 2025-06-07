export default function PurchaseItem({item}){
    return (
        <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-ml w-full border-r-amber-900">
            <img className="w-32 h-24 object-cover rounded-lg"></img>
            <div className="flex-1 items-center"> 
                <p className="text-blue-700 "> {item.Product.name} </p>
                <p className="text-green-500">Price           : $ {item.Product.price}</p>
                <p className="text-green-500 ">Quantity        : {item.quantity}</p>
                <p className="text-green-500">Total Price     : $ {item.totalPrice}</p>
                <p className="text-green-500 ">Purchase Date   : {item.createdAt}</p>
            </div>

        </div>
    )
}