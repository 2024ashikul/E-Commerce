export default function PurchaseItem({item}){
    return (
        <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-ml w-full border-r-amber-900">
            <img className="w-32 h-24 object-cover rounded-lg" src={'http://192.168.0.102:3000/uploads/'+ item.Product.ProductImages[0].name}></img>
            <div className="flex flex-col "> 
                <p className="text-blue-700  p-1 m-0 text-2xl"> {item.Product.name} </p>
                <p className="text-green-500 p-1 m-0">Price           : $ {item.Product.price}</p>
                <p className="text-green-500 p-1 m-0">Quantity        : {item.quantity}</p>
                <p className="text-green-500 p-1 m-0">Total Price     : $ {item.totalPrice}</p>
                <p className="text-green-500 p-1 m-0">Purchase Date   : {item.createdAt.slice(0,10)}</p>
            </div>

        </div>
    )
}