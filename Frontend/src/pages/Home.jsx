import React, { useEffect } from "react";
import { GrFavorite } from "react-icons/gr";
import { CiFaceSmile } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate=useNavigate()
  useEffect(()=>{
const token=localStorage.getItem("jwt")
if(!token){
navigate("./signup")
}
  },[])
  return (
    <div className="card">
      {/* card */}
      <div className="card-header">
        <div className="card-pic">
          <img
            src="https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
          />
         
        </div>
        <h5>Hasti paladiya</h5>
        </div>
        <div className="card-image">
          <img
            src="https://images.unsplash.com/photo-1668179456564-db429f9de8e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uZXxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
          />
        </div>
        <div className="card-content">
          <GrFavorite/>
          <p> 1 Like</p>
          <p>This is amazing</p>
        </div>
        <div className="add-comment">
        <CiFaceSmile/>
        <input type="text" placeholder="add a comment" />
        <button className="comment">post</button> </div>
        
        
      
    </div>
  );
};

export default Home;
