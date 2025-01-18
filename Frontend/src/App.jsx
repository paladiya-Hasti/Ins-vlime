import React,{createContext, useState} from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import "./App.css";
import CreatePost from "./components/CreatePost";
import { LoginContext } from "./context/LoginContext";
import Model from "./components/Model";


const App = () => {
  const [userLogin,setUserLogin]=useState(false)
  const [modalOpen,setModalOpen]=useState(false)
  return (
    <Router>
      <div>
        <LoginContext.Provider value={{setUserLogin,setModalOpen}}>
        <Navbar login={userLogin}/>
      <Routes>
    
      <Route path="/" element={  <Home/>}></Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createPost" element={  <CreatePost/>}></Route>
      </Routes>
      <ToastContainer theme="dark"/>
    
      {modalOpen && <Model setModalOpen={setModalOpen}></Model>}
        </LoginContext.Provider>
     
      </div>
    </Router>
  );
};

export default App;
