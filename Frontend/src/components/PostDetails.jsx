import React from "react";
import "./PostDetails.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const PostDetails = ({ item, toggleDetails }) => {
  const navigate=useNavigate()

    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);
  const removePost = (postId) => {
if(window.confirm("Do you really want to delete this post ?")){
  fetch(`http://localhost:5000/deletePost/${postId}`, {
    method: "delete",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      toggleDetails()
      navigate("/")
      notifyB(result.message)
    });

}
   
  };

  return (
    <div className="showComment">
      <div className="container">
        <div className="postPic">
          <img src={item.photo} alt="" />
        </div>
        <div className="details">
          {/* card header */}
          <div
            className="card-header"
            style={{ borderBottom: "1px solid #00000029" }}
          >
            <div className="card-pic">
              <img
                src="https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
              />
            </div>
            <h5>{item.postedBy.name}</h5>
            <div
              className="deletePost"
              onClick={() => {
                console.log("Attempting to delete post");
                removePost(item._id);
              }}
            >
              <span className="material-symbols-outlined">delete</span>
            </div>
          </div>

          {/* commentSection */}
          <div
            className="comment-section"
            style={{ borderBottom: "1px solid #00000029" }}
          >
            {item.comments.map((comment) => {
              return (
                <p className="comm">
                  <span className="commenter" style={{ fontWeight: "bolder" }}>
                    {comment.postedBy.name}{" "}
                  </span>
                  <span className="commentText">{comment.comment}</span>
                </p>
              );
            })}
          </div>

          {/* card content */}
          <div className="card-content">
            <p>{item.likes.length} Likes</p>
            <p>{item.body}</p>
          </div>

          {/* add Comment */}
          <div className="add-comment">
            <span className="material-symbols-outlined">mood</span>
            {/* <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                /> */}
            <button
              className="comment"
              onClick={() => {
                makeComment(comment, item._id);
                toggleComment();
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <div
        className="close-comment"
        onClick={() => {
          toggleDetails();
        }}
      >
        <span className="material-symbols-outlined material-symbols-outlined-comment">
          close
        </span>
      </div>
    </div>
  );
};
