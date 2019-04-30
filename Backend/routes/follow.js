'use strict'

var express = require('express');
// var FollowController = require('../controllers/follow');

var api = express.Router();
// var md_auth = require('../middleware/authentication');
var Follow = require("../model/follow");

//==================================================================================

// Seguir a un usuario
function saveFollow(req, res) {
  // var params = req.body;
  var follow = new Follow({
    reqSentBy:req.body.reqSentBy,
    reqSentTo:req.body.reqSentTo

  });
  

  // follow.user = req.user.sub;
  // follow.followed = params.followed;

  follow.save((err, followStored) => {
    if (err)
      return res
        .status(500)
        .send({ message: "Error guardando el seguimiento." });

    if (!followStored)
      return res
        .status(404)
        .send({ message: "El seguimiento no se ha guardado." });

    return res.status(200).send({ follow: followStored });
  });
}//========================================================================
function getAllFollows(req, res) {

  Follow.find((err, followStored) => {
    if (err)
      return res
        .status(500)
        .send(err);
    else{
   return res.send(followStored);

    }
   
  });
}
//=============================================================================
function deleteFollow(req, res) {
  Follow.remove({_id:req.params.id},(err, followStored) => {
    if (err)
      return res
        .status(500)
        .send(err);
    else{
   return res.send("removed");

    }
   
  });
}
//============================================================================

//====================================================================================
api.post('/follow',  saveFollow);
api.get('/getfollow',  getAllFollows);
api.delete('/deleteFollow/:id',  deleteFollow);


module.exports = api;
