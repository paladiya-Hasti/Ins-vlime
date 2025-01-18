import React, { useEffect, useState } from 'react'

const Profile = () => {
  const [pic,setPic]=useState([])
  useEffect(()=>{
fetch("http://localhost:5000/myposts",{
  headers:{
    Authorization:"Bearer " + localStorage.getItem("jwt")
  }
}).then(res=>res.json())
.then((result)=>{setPic(result)})


  },[])
  return (
    <div className='profile'>
       <div className="profile-frame">
        <div className="profile-pic">
          <img src="https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
        </div>
        <div className="profile-data">
          <h1>canta coder</h1>
<div className="profile-info" style={{display:"flex"}}>
          <p>40 posts</p>
          <p>40following</p>
          <p>40 followers</p>
</div>
        </div>
       
        
       </div>
       <hr style={{width:"90%",opacity:"0.8" ,margin:"25px auto"}}/>
       <div className="gallery" >
       {pic.map((pics)=>{
        return <img  key={pics._id} src={pics.photo} className='items'></img>
       })}
       </div>
    </div>
  )
}

export default Profile