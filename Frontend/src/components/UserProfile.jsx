import React, { useEffect, useState } from "react";
import ProfilePic from "../components/ProfilePic";
import { useParams } from "react-router-dom";
import "./Profile.css";

const UserProfile = () => {
  const { userid } = useParams();
  // console.log(userid);

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [changepic, setChangepic] = useState(false);


  const followUser = (userId) => {
    fetch("http://localhost:5000/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsFollow(true);
      });
  };

  // to unfollow user
  const unfollowUser = (userId) => {
    fetch("http://localhost:5000/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data);
        setIsFollow(false);
      });
  };
  useEffect(() => {
    fetch(`http://localhost:5000/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
      
        setUser(result.user);
        setPosts(result.posts);
        if(
          result.user.followers.includes(
            JSON.parse(localStorage.getItem("user"))._id
          )
        ){
          setIsFollow
          (true)
        }
      });
  }, []);


  
  const changeprofile = () => setChangepic(!changepic);

  return (
    <div className="profile">
      <div className="profile-frame">
        <div className="profile-pic">
          <img
            // onClick={changeprofile}
            src="https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
          />
        </div>
        <div className="profile-data">
          <div  style={{display:"flex" ,alignItems:"center",justifyContent:"space-between"}}>
          <h1>{user.name}</h1>
          <button className="followBtn" onClick={()=>{followUser(user._id)}}>Follow</button>
          </div>
          
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{posts.length}Posts</p>
            <p>40 following</p>
            <p>40 followers</p>
          </div>
        </div>
      </div>
      <hr style={{ width: "90%", opacity: "0.8", margin: "25px auto" }} />
      <div className="gallery">
        {posts.map((pics) => (
          <img key={pics._id} src={pics.photo} className="items" alt="Post" />
        ))}
      </div>
      {changepic && <ProfilePic changeprofile={changeprofile} />}
    </div>
  );
};

export default UserProfile;
