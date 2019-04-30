"use strict";

var express = require("express");
// var FollowController = require('../controllers/follow');

var api = express.Router();
// var md_auth = require('../middleware/authentication');
var Message = require("../model/message");

//==================================================================================

// Seguir a un usuario
function saveMessag(req, res) {
  // var params = req.body;
  var message = new Message({
    sender: req.body.sender,
    receiver: req.body.receiver,
    msg: req.body.msg,
    TimeNdate: req.body.TimeNdate
  });

  // follow.user = req.user.sub;
  // follow.followed = params.followed;

  message.save((err, followStored) => {
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
} //========================================================================
function getAllMessage(req, res) {
  Message.find((err, messages) => {
    if (err) return res.status(500).send(err);
    else {

      return res.send(messages);
    }
  });
}
api.post("/message", saveMessag);
api.get("/getMessages", getAllMessage);
module.exports = api;
