// import React from "react";
// import logo5 from "../img/logo5.jpeg";
// import { Link } from "react-router-dom";
// import './Navbar.css'
// const Navbar = (login) => {
//   const loginStatus = () => {
//     const token = localStorage.getItem("jwt");
//     if (login || token) {
//       return [
//         <>
//           <Link to="/profile">
//             <li className=" text-gray-900 hover:font-semibold cursor-pointer">
//               Profile
//             </li>
//           </Link>
//           <Link to="/createPost">CreatePost</Link>
//           <Link to={""}>
//           <button className="primaryBtn">Log Out</button></Link>

//         </>,
//       ];
//     }
//     else{

//       return [
//         <>
//           <Link to="/signup">
//           {" "}
//           <li className="text-gray-900 hover:font-semibold cursor-pointer">
//             Signup
//           </li>
//         </Link>

//         <Link to="/signin">
//           <li className="text-gray-900 hover:font-semibold cursor-pointer">
//             SignIn
//           </li>
//         </Link>
//         </>
//       ]

//     }
//   };
//   // loginStatus();
//   return (
//     <div className="bg-gray-100  text-gray py-4 px-6 flex items-center justify-between">
//       <div className="flex items-center">
//         <img src={logo5} alt="Logo" className="h-12 w-12 rounded-full mr-4" />
//         <h1 className="text-xl font-bold">Instagram</h1>
//       </div>

//       <ul className="flex space-x-6">
//       {loginStatus()}
//       </ul>
//     </div>
//   );
// };

// export default Navbar;

import React, { useContext } from "react";
import logo5 from "../img/logo5.jpeg";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

export default function Navbar({ login }) {
  const { setModalOpen } = useContext(LoginContext);
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/createPost">Create Post</Link>
          {/* <Link style={{ marginLeft: "20px" }} to="/followingpost">
            My Following
          </Link> */}
          <Link to={""}>
            <button className="primaryBtn" onClick={()=>setModalOpen(true)} >
              Log Out
            </button>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/signup">
            <li>SignUp</li>
          </Link>
          <Link to="/signin">
            <li>SignIn</li>
          </Link>
        </>,
      ];
    }
  };

  return (
    <div className="navbar">
      <img src={logo5} className="logo" />
      {/* <h1 >Instagram</h1> */}
      <ul className="nav-menu">{loginStatus()}</ul>
    </div>
  );
}
