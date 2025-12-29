import React from "react";
import { assets } from "./../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { Search } from "lucide-react";
import { User } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Menu, ChevronRight } from "lucide-react";
import { useState , useContext} from "react";
import { ShopContext } from './../context/ShopContext';

function Navbar() {
  
  const [visible, setVisible] = useState(false);
 const {setShowSearch , getCartCount , navigate  , token  , setToken , setCartItems } = useContext(ShopContext);
 const logout=() =>{
  localStorage.removeItem('token')
  setToken('')
  setCartItems({})
  navigate('/login')
 }

  return (
    <div className="flex items-center justify-between py-5 font-medium">
     <Link to='/' >
      <img src={assets.logo} className="w-36" alt="img" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700  ">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p> Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p> Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p> About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p> Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <Search
        onClick={()=>setShowSearch(true)}
          className="w-5 h-5 text-gray-600"
          className="w-5 cursor-pointer"
        />
        <div className="group relative">
          
          <User
            className="w-7 h-7 text-gray-600 cursor-pointer"
            onClick={()=>token ? null : navigate('/login')}
          />
            {/*  DropDown menu */}
         
          {token && 
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex   flex-col gap w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black ">My profile</p>
              <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black ">Orders</p>
              <p onClick={logout} className="cursor-pointer hover:text-black ">Logout</p>
            </div>
          </div>
          }

        </div>
        <Link to="/cart" className="relative">
          <ShoppingCart
            className="w-6 h-6 text-gray-700 cursor-pointer"
            className="w- min-w-5"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-600 text-white aspect-square rounded-full text-[8px] ">
            {getCartCount()}
          </p>
        </Link>
        <Menu
          onClick={() => setVisible(true)}
          className="w-6 h-6 text-gray-700 cursor-pointer"
          className="w-6 h-6 text-gray-700 cursor-pointer sm:hidden"
        />
        {/* sidebar menu for small screens*/}

        <div
          className={`absolute top-0 right-0 bottom-0 z-50 overflow-hidden bg-white transition-all duration-300 ease-in-out ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-600 ">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3 cursor-pointer" >
              <ChevronRight className="h-6 text-gray-600 rotate-180" />
              <p>Back</p>
            </div>
            <NavLink onClick={() => setVisible(false)} to='/' className="py-2 pl-6 border">Home</NavLink>
            <NavLink onClick={() => setVisible(false)} to='/collection' className="py-2 pl-6 border">Collection</NavLink>
            <NavLink onClick={() => setVisible(false)} to='/about' className="py-2 pl-6 border">About</NavLink>
            <NavLink  onClick={() => setVisible(false)} to='/contact' className="py-2 pl-6 border">Contact</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
