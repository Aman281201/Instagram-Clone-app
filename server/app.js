const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
//aman
const { MONGOURI } = require("./keys");

mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});

require("./models/user");
require("./models/post");

app.use(express.json());

app.use(require("./routes/auth"));
app.use(require("./routes/post"));

const customMiddleware = (req, res, next) => {
  console.log("middleware executed! !");
  next();
};

app.use(customMiddleware);

app.get("/", (req, res) => {
  console.log("home");
  res.send("helloworld");
});

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
