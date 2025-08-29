import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCartIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  
} from "@heroicons/react/24/solid";

import {FireIcon} from "@heroicons/react/24/solid";
import { AuthContext } from "../Contexts/AuthContext/AuthContext";

export default function UpperNav() {
  const { isLoggedIn, username } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [searchOptions, setSearchOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!search) {
      setSearchOptions([]);
      return;
    }
    fetch(`http://localhost:3000/searchpending/${search}`)
      .then((res) => res.json())
      .then((data) =>
        !data.products ? setSearchOptions([]) : setSearchOptions(data.products)
      )
      .catch((err) => console.log(err));
  }, [search]);

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate(`/search/${encodeURIComponent(search)}`);
      setSearch("");
    }
  };

  return (
    <div className="w-full bg-white border-b border-r-red-100 shadow-sm">
      <div className="flex items-center justify-between px-6 py-1">
        {/* Logo */}
        <div
          onClick={()=> navigate("/")}
          className="flex items-center gap-2 hover:scale-110 transition"
        >
          <svg
            className="h-8 w-auto"
            viewBox="0 0 250 80"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="404Store Logo"
          >
            <g fill="#2563eb" stroke="#2563eb" strokeWidth="2">
              <rect x="10" y="25" width="60" height="30" rx="5" ry="5" fill="none" />
              <circle cx="23" cy="62" r="4" />
              <circle cx="57" cy="62" r="4" />
              <line x1="10" y1="25" x2="20" y2="15" />
              <line x1="20" y1="15" x2="50" y2="15" />
            </g>
            <text
              x="85"
              y="55"
              fontFamily="Arial, sans-serif"
              fontSize="28"
              fill="#2563eb"
              fontWeight="bold"
            >
              404Store
            </text>
          </svg>
        </div>

        {/* Hot Deals */}
        <div
          onClick={()=> navigate("/deals")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full  
          hover:bg-gray-500 hover:text-white transition hover:scale-110 "
        >
          <FireIcon className="h-5 w-5 text-red-500 "  />
          <span className="text-sm font-medium ">Hot Deals</span>
        </div>

        {/* Profile */}
        <div
          onClick={()=> navigate(isLoggedIn ? "/profile" : "/login")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full 
          hover:bg-gray-500 hover:text-white transition hover:scale-110 "
        >
          <UserCircleIcon className="h-5 w-5  hover:text-white" />
          <span className="text-sm font-medium ">
            {isLoggedIn ? "Profile" :  "Log In"}
          </span>
        </div>

        {/* Cart */}
        <div
          onClick={()=> navigate("/cartpage")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full 
          hover:bg-gray-500 hover:text-white transition hover:scale-110 "
        >
          <ShoppingCartIcon className="h-5 w-5 " />
          <span className="text-sm font-medium ">Cart</span>
        </div>

        {/* Search */}
        <div className="relative w-1/3 max-w-sm">
          <div className="flex items-center bg-gray-50 rounded-full border px-3 py-1 focus-within:ring-2 focus-within:ring-blue-400">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={search}
              placeholder="Search..."
              className="ml-2 flex-1 bg-transparent focus:outline-none text-sm text-gray-700"
              onKeyDown={handleSearchSubmit}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {searchOptions.length > 0 && (
            <ul className="absolute mt-2 w-full bg-white border rounded-lg shadow-md z-20 max-h-56 overflow-y-auto">
              {searchOptions.map((item) => (
                <li
                  key={item.id}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition"
                >
                  <div onClick={()=> navigate(`/product/${item.id}`)} className="block">
                    {item.name}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
