
const mongoose = require("mongoose");
const MsgSchema = new mongoose.Schema({
    sender: {
    type: String,
    required: true
  },
  receiver: {
    type: String,
    required: true
  },
  msg: {
    type: String,
    required: true
  },
  TimeNdate: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("msg", MsgSchema);