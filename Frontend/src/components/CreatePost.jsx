import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Navigate, useNavigate } from "react-router-dom";
export const CreatePost = () => {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const navigate=useNavigate()

    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    if (url) {
      fetch("http://localhost:5000/createpost",{
        method:"post",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer " + localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          body,
          pic:url
        })
      })
        .then(res=>res.json())
      .then(data=>{
        if (data.error) {
          notifyA(data.error);
        }
        else{
          notifyB("Successfully Posted")
          navigate("/")
        }
      })
      .catch(err=>console.log(err))
  //       .catch((err) => console.error("Error in creating post:", err));
    }
  }, [url]);
  

  const postDetails = () => {
    console.log(body, image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "hasticloud");
    fetch("https://api.cloudinary.com/v1_1/hasticloud/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then(data => setUrl(data.url))
      .catch((err) => console.log(err));
    

     
  };

  
  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src);
    };
    setImage(event.target.files[0]);
  };

  return (
    <div className="createpost">
      <div className="post-header">
        <h4>Create New Post</h4>
        <button id="post-btn" onClick={postDetails}>
          Share
        </button>
      </div>
      <div className="main-div">
        <img
          id="output"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFPAU8rBkD5OxnL5Zmi-mbhJrvyvb09n4Wfw&s"
        />
        <input type="file" accept="image/*" onChange={loadfile} />
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
          onChange={(e) => setBody(e.target.value)}
          placeholder="caption..."
        ></textarea>
      </div>
    </div>
  );
};

export default CreatePost;

// import React, { useEffect, useState } from "react";

// export const CreatePost = () => {
//   const [body, setBody] = useState("");
//   const [image, setImage] = useState("");
//   const [url, setUrl] = useState("");

//   useEffect(() => {
//     if (url) {
//       const token = localStorage.getItem("jwt");

//       if (!token) {
//         console.error("Token not found. Please log in again.");
//         alert("आपको दोबारा लॉगिन करना होगा।");
//         return;
//       }
//       console.log(token);
      

//       // fetch("http://localhost:5000/createpost", {
//       //   method: "POST",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //     Authorization: "Bearer " + localStorage.getItem("jwt"),
//       //   },
//       //   body: JSON.stringify({
//       //     body,
//       //     pic: url,
//       //   }),
//       // })
//       //   .then((res) => {
//       //     if (!res.ok) {
//       //       return res.json().then((err) => {
//       //         throw new Error(err.error || "Unknown error");
//       //       });
//       //     }
//       //     return res.json();
//       //   })
//       //   .then((data) => {
//       //     console.log("Post created:", data);
//       //     alert("पोस्ट सफलतापूर्वक बनाई गई!");
//       //   })
//       //   .catch((err) => {
//       //     console.error("Error in creating post:", err.message);
//       //     alert("त्रुटि: " + err.message);
//       //   });
//     }
//   }, [url]);

//   const postDetails = () => {
//     console.log(body, image);
//     const data = new FormData();
//     data.append("file", image);
//     data.append("upload_preset", "insta-clone");
//     data.append("cloud_name", "hasticloud");

//     fetch("https://api.cloudinary.com/v1_1/hasticloud/image/upload", {
//       method: "POST",
//       body: data,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setUrl(data.url);
//         console.log("Uploaded Image URL:", data.url);
//       })
//       .catch((err) => {
//         console.error("Error uploading image:", err);
//         alert("छवि अपलोड करने में त्रुटि हुई।");
//       });
//   };

//   const loadfile = (event) => {
//     const output = document.getElementById("output");
//     output.src = URL.createObjectURL(event.target.files[0]);
//     output.onload = () => {
//       URL.revokeObjectURL(output.src);
//     };
//     setImage(event.target.files[0]);
//   };

//   return (
//     <div className="createpost">
//       <div className="post-header">
//         <h4>Create New Post</h4>
//         <button id="post-btn" onClick={postDetails}>
//           Share
//         </button>
//       </div>
//       <div className="main-div">
//         <img
//           id="output"
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFPAU8rBkD5OxnL5Zmi-mbhJrvyvb09n4Wfw&s"
//           alt="Preview"
//         />
//         <input type="file" accept="image/*" onChange={loadfile} />
//       </div>
//       <div className="details">
//         <div className="card-header">
//           <div className="card-pic">
//             <img
//               src="https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
//               alt="Profile"
//             />
//           </div>
//           <h5>hasti paladiya</h5>
//         </div>
//         <textarea
//           type="text"
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//           placeholder="Caption..."
//         ></textarea>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;

