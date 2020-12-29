const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = mongoose.model("Post");

const requireLogin = require("../middleware/requireLogin");

router.get("/allposts", requireLogin, (req, res) => {
  Post.find()
    .populate("postedBy", "_id,name")
    .then((posts) => {
      res.json({ posts }).catch((error) => {
        console.log(error);
      });
    });
});

router.post("/createpost", requireLogin, (req, res) => {
  const { title, body, pic } = req.body;
  if (!title || !body || !pic) {
    return res.status(422).json({ error: " title or body is missing" });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    photo: pic,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/mypost", requireLogin, (req, res) => {
  Post.find({ posterBy: req.user._id })
    .populate("PostedBy", "_id name")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
