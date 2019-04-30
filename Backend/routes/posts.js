
var express = require("express");
// var FollowController = require('../controllers/follow');

var api = express.Router();
var Post = require("../model/Post");

//==================================================================================

function savePost(req, res) {
  var post = new Post({
    postedBy: req.body.postedBy,
    post: req.body.post,
           
  });
  post.save((err, followStored) => {
    if (err){
      console.log(err)
      return res
        .status(500)
        .send({ message: "Error saving the post" });
    }
    if (!followStored)
      return res
        .status(404)
        .send({ message: "The post has not been saved." });

    return res.status(200).send({ follow: followStored });
  });
} //========================================================================
function getAllPosts(req, res) {
  Post.find((err, posts) => {
    if (err) return res.status(500).send(err);
    else {

      return res.send(posts);
    }
  });
}
//==========================================================================
function getPostById(req, res) {
    Post.findById(req.params.id,(err, post) => {
      if (err) return res.status(500).send(err);
      else {
  
        return res.send(post);
      }
    });
  }

  //==========================================================================
  function addComment(req, res) {
    Post.findOneAndUpdate({_id:req.params.id},req.body,(err, post) => {
      if (err) return res.status(500).send(err);
      else {
  
        return res.send("commented");
      }
    });
  }


api.post("/post", savePost);
api.get("/getposts", getAllPosts);
api.get("/postbyid/:id", getPostById);
api.put("/addcomment/:id", addComment);

module.exports = api;
