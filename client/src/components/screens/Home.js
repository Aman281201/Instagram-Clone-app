import React, { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/allpost", {
      headers: {
        Authorization: "Bearer" + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json)
      .then((result) => setData(result.posts));
  });
  return (
    <div className="home">
      return (
      <div className=" card home-card">
        <h5>Catherine</h5>
        <div className="card-image">
          <img src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"></img>
        </div>
        <div className="card-content">
          <i className="material-icons" style={{ color: "red" }}>
            favorite
          </i>
          <h6>title</h6>
          <p>I love beaches</p>
          <input type="text" placeholder="add a comment" />
        </div>
      </div>
      ); })
    </div>
  );
};

export default Home;
