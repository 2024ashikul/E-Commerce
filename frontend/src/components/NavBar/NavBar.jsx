import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ShoppingCartIcon , UserCircleIcon,MagnifyingGlassIcon ,FireIcon, ComputerDesktopIcon} from '@heroicons/react/24/outline';
import { AuthContext } from "../Contexts/AuthContext";

export default function NavBar(){

  
  const {isLoggedIn, username} = useContext(AuthContext);

  const [category , setCategory] = useState([]);
  const [search , setSearch] = useState('');
  const [searchOptions , setSearchOptions] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{
    fetch(`http://192.168.0.102:3000/categoryall`)
    .then((res) => res.json())
    .then((data)=> {setCategory(data);console.log(data);})
    .catch((err) => console.log(err))
  },[]);
  

    useEffect(()=>{
  
      console.log("searching here");
      fetch(`http://192.168.0.102:3000/searchpending/${search}`)
      .then((res)=> res.json())
      .then((data)=> {!data.products ? setSearchOptions(null) : setSearchOptions(data.products); console.log(data)})
      .catch((err) => console.log(err))
    },[search]);

    const handleSearchSubmit = (e) => {
      
      if(e.key == 'Enter'){
        document.getElementById("temp").value ='';
        e.preventDefault();
        navigate(`/search/${encodeURIComponent(search)}`);
        
      }
    }
    

  console.log(category);
  console.log("seach is " + search);
  console.log("seach option is " + searchOptions);

    return (
    <>
      <div className="flex flex-col bg-blue-50" >
        <div className="flex flex-row mx-1 px-2">
            <div className="flex mx-4 my-0 px-4 py-1 w-1/5 hover:bg-amber-300 rounded-3xl items-center">
                {/* <ComputerDesktopIcon className="h-6 w-6 m-0 mt-1  text-gray-500" /> */}
                
                <Link to={`/`} >
                  <div className="object-contain pb-1 m-0 shrink-0 items-center justify-center" >
  
                    <svg className="h-8 w-auto shrink-0"  viewBox="0 0 250 80" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="404Store Logo">
                      <g fill="#0070f3" stroke="#0070f3" strokeWidth="2">
                      <rect x="10" y="25" width="60" height="30" rx="5" ry="5" fill="none" />
                      <circle cx="23" cy="62" r="4" fill="" />
                      <circle cx="57" cy="62" r="4" fill="" />
                      <line x1="10" y1="25" x2="20" y2="15" stroke="#0070f3" strokeWidth="2" />
                      <line x1="20" y1="15" x2="50" y2="15" stroke="#0070f3" strokeWidth="2" />
                      </g>
                      <text x="85" y="55" fontFamily="Arial, sans-serif" fontSize="36" fill="#0070f3" fontWeight="bold">
                      404Store
                      </text>
                      <text x="24" y="47" fontFamily="Arial, sans-serif" fontSize="20" fill="green" fontWeight="">
                      404
                      </text>
                    </svg>
                  </div>
                

                </Link>
            </div>

            <div className="flex mx-4 my-0 px-4 py-1 w-1/5 hover:bg-amber-300 rounded-3xl">
              <FireIcon className="h-6 w-6 m-0 mt-1 text-gray-700 fill-red-600"  />
              <Link to={``} style={{textDecoration : 'none'}} className=" whitespace-nowrap m-0 p-1"><span className="m-0 p-1">HOT Deals</span></Link>
            </div>
            
            <div className="flex mx-4 my-0 px-4 py-1 w-1/5 hover:bg-amber-300 rounded-3xl">
              <UserCircleIcon className="h-6 w-6 m-0 mt-1 text-gray-700 fill-amber-400" />
              {isLoggedIn ? <Link to={`/profile`} className="m-0 p-1" style={{textDecoration : 'none', fontSize :'15x'}}><span className="m-0 p-1">{username}</span></Link> : 
              <Link to={`/login`} className="m-0 p-1" style={{textDecoration : 'none', fontSize :'15x'}}><span className="m-0 p-1">Log In</span></Link>}
            </div >
            <div className="flex mx-4 my-0 px-4 py-1 w-1/5 hover:bg-amber-300 rounded-3xl">
              
              <ShoppingCartIcon className="h-6 w-6 m-0 mt-1 text-gray-700 fill-amber-400"  />
              <Link to={`/cartpage`} className="m-0 p-1" style={{textDecoration : 'none'}}><span className="m-0 p-1">Cart</span></Link>
            </div>
            
            <div className="flex mx-4 my-0 px-4 py-1 ">
              <MagnifyingGlassIcon className="h-6 w-6 m-0 mt-1 text-gray-700"/>
              
              <input 
                
                type="text" 
                placeholder="Search for anything" 
                className="p-1 w-max h-max bg-white " id="temp" 
                style={{borderRadius : '10px'}} 
                onKeyDown={handleSearchSubmit}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearch(value);

                  if (value) {
                    document.getElementById('searchoptions').style.visibility = 'visible';
                  } else {
                    document.getElementById('searchoptions').style.visibility = 'hidden';
                  }
                }}>

                </input>
                <div className="z-10 absolute mt-4 p-1 w-60 " id="searchoptions" style={{visibility : 'hidden'}}> 
                  <ul className="flex-col  bg-green-500 ml-4 mb-0 p-1 rounded-2xl">
                    {searchOptions==null || document.getElementById('temp').value == "" ? '' : (searchOptions.map(item => (
                        <div className="pl-4  w-full px-2 py-1 align-middle " >
                            

                            <li key={item.id} className="hover:text-white-100" >
                                <Link to={`/product/${item.id}`} style={{textDecoration : 'none'}}>
                                
                                  {item.name}
                                </Link>
                                </li>

        
                        </div>

                    )))}
                  </ul>
              </div>
            </div>
            

        </div>
        
        <div className={`flex gap-2 flex-nowrap overflow-hidden justify-center-safe`}>
          {/* Dynamic bug to fix cols */}
          {category.map(item=>(
            <div key ={item} className="">
              <Link to = {`/c/${item}` } className="transition via-teal-900 no-underline hover:animate-bounce" style={{textDecoration :'none'}} >
                <p className="
                  px-4 py-1
                 text-indigo-400
                  uppercase  
                  hover:bg-red-400
                  transition-transform 
                  hover:rounded-1xl 
                  hover:text-white
                  rounded-3xl
                  hover:align-justify
                  text-center
                  whitespace-nowrap
                    " > 
                    {item}
                </p> 
                </Link>
          </div>
          ))}
        </div>
      </div>
    </>
    )
}