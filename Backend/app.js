const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
const users = require("./routes/users");
const follow = require("./routes/follow");
const message = require("./routes/message");
const post = require("./routes/posts");

const userProfile = require("./routes/userProfile");
const orgs = require("./routes/orgs");
const orgProfile = require("./routes/orgProfile");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/myDb", { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Welcome to Home Page !"));

//Use Routes
app.use("/api/users", users);
app.use("/api/useProfile", userProfile);
app.use("/api/orgs", orgs);
app.use("/api/orgProfile", orgProfile);
app.use("/api/useProfile", follow);
app.use("/api/useProfile", message);
app.use("/api", post);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
