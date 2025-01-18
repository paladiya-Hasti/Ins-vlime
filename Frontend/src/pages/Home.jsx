import React, { useEffect, useState } from "react";
import { GrFavorite } from "react-icons/gr";
import { CiFaceSmile } from "react-icons/ci";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      navigate("/login"); // Redirect to login page if no token
    }

    fetch("http://localhost:5000/allPosts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="home">
      {data.map((posts) => (
        <div className="card" key={posts._id}>
          <div className="card-header">
            <div className="card-pic">
              <img
                src="https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
              />
            </div>
            <h5>{posts.postedBy.name}</h5>
          </div>
          <div className="card-image">
            <img src={posts.photo} alt="" />
          </div>
          <div className="card-content">
           
            <span class="material-symbols-outlined">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="m479-60-87-79q-108-98-178-168.5T104-434q-40-56-55.5-103.5T33-637q0-113 76-189.5T298-903q50 0 96.5 17.5T479-836q38-32 84.5-49.5T660-903q113 0 190 76.5T927-637q0 51-15.5 98.5t-55.5 103Q816-380 746-309T566-139l-87 79Z"/></svg>
            </span>
            <span class="material-symbols-outlined">
              <GrFavorite />
            </span>

            <p>1 like</p>
            <p>{posts.body}</p>
          </div>

          {/* add Comment */}
          <div className="add-comment">
            <span className="material-symbols-outlined">mood</span>
            <input type="text" placeholder="Add a comment" />
            <button className="comment">Post</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
