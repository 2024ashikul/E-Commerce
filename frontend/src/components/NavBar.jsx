import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function NavBar(){

  //const category = ['Laptops', 'Phones' , 'TABLETS', 'accessories'];

  const [category , setCategory] = useState([]);
  useEffect(()=>{
    fetch(`http://localhost:3000/categoryall`)
    .then((res) => res.json())
    .then((data)=> {setCategory(data);console.log(data);})
    .catch((err) => console.log(err))
  },[]);
  console.log(category);

    return (
      <div className="flex flex-row bg-amber-600" >
        <div className="flex max-w-2xl align-center">
          
          {category.map(item=>(
            <div key ={item}>
            <Link to = {`/c/${item}` } className=" via-teal-900 " ><p className="text-amber-400 pl-4 pr-4 backdrop-blur-3xl uppercase" > {item}</p> </Link>
          
          </div>
          ))}
          
        </div>
      </div>

    )
}