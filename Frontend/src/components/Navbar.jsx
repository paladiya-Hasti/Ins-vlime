import React from "react";
import logo5 from "../img/logo5.jpeg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-white-800 text-gray py-4 px-6 flex items-center justify-between">
   
      <div className="flex items-center">
        <img src={logo5} alt="Logo" className="h-12 w-12 rounded-full mr-4" />
        <h1 className="text-xl font-bold">Instagram</h1>
      </div>
 
      <ul className="flex space-x-6">
        <Link to="/signup">        <li className="text-gray-900 hover:font-semibold cursor-pointer">Signup</li></Link>

        <Link to="/signin"><li className="text-gray-900 hover:font-semibold cursor-pointer">SignIn</li></Link>
        <Link to="/profile"><li className=" text-gray-900 hover:font-semibold cursor-pointer">Profile</li></Link>
      </ul>
    </div>
  );
};

export default Navbar;
