import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    //console.log(title);
    console.log(url + "2");
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            M.toast({ html: data.error, classes: "#d32f2f red darken-2" });
            return;
          } else {
            M.toast({
              html: "successfully posted",
              classes: "#43a047 green darken-1",
            });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Instakilogram");
    data.append("cloud_name", "brofistaman");
    fetch("https://api.cloudinary.com/v1_1/brofistaman/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(url);
        console.log(data.url);
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="card input-filed"
      style={{
        textAlign: "center",
        maxWidth: "600px",
        margin: "50px auto",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <span class="card-title">
        <h2>New Post</h2>
      </span>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn waves-effect waves-light #ff8a80 red accent-1 ">
          <span>Upload</span>
          <input
            type="file"
            multiple
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="file-path-wrapper">
          <input
            className="file-path validate"
            type="text"
            placeholder="Upload one or more files"
          />
          <button
            className="btn waves-effect waves-light #ec407a pink lighten-1 "
            onClick={() => postDetails()}
          >
            Submit Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
