import React, { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/allposts", {
      headers: {
        Authorization: "Bearer" + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.posts);
        setData(result.posts);
        // setData([
        //   {
        //     _id: "61ecfcadd004b729005cd747",
        //     title: "aa",
        //     body: "aa",
        //     photo:
        //       "http://res.cloudinary.com/brofistaman/image/upload/v1642921133/thane4qqwmys43cnruad.png",
        //     postedBy: [Object],
        //     __v: 0,
        //   },
        //   {
        //     _id: "61ed0597f9ab294828b862a9",
        //     title: "b",
        //     body: "b",
        //     photo:
        //       "http://res.cloudinary.com/brofistaman/image/upload/v1642923414/s7428wymicdtmgaaoexw.png",
        //     postedBy: [Object],
        //     __v: 0,
        //   },
        // ]);
      });
    //.then((result) => setData(result.posts));
    //console.log(data + "ff");
  }, []);
  return (
    <div className="home">
      {data?.map((item) => {
        return (
          <div className=" card home-card">
            <h5>{item.postedBy.name}</h5>
            <div className="card-image">
              <img src={item.photo}></img>
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <input type="text" placeholder="add a comment" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
