import React, { useState } from "react";

export const CreatePost = () => {
  const [body, setBody] = useState(" ");
  const [image, setImage] = useState("");


  const postDetails = () => {

    console.log(body, image)
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "insta-clone")
    data.append("cloud_name", "cantacloud2")
    fetch("https://api.cloudinary.com/v1_1/cantacloud2/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json())
      .then(data => setUrl(data.url))
      .catch(err => console.log(err))
    console.log(url)

  }




  
  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src);
    };
  };
  return (
    <div className="createpost">
      <div className="post-header">
        <h4>Create New Post</h4>
        <button id="post-btn" onClick={()=>{postDetails()}}>Share</button>
      </div>
      <div className="main-div">
        <img
          id="output"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFPAU8rBkD5OxnL5Zmi-mbhJrvyvb09n4Wfw&s"
        />
        <input
          type="file"
          accept="image/"
          onChange={(event) =>{
            loadfile(event);
            setImage(event.target.files);
          }
          }
      
        />
      </div>
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img
              src="https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
          </div>
          <h5>hasti paladiya</h5>
        </div>
        <textarea
          type="text"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          placeholder="caption..."
          name=""
          id=""
        ></textarea>
      </div>
    </div>
  );
};

export default CreatePost;
