'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FollowSchema = Schema({
  reqSentBy: { type: Schema.ObjectId, ref: 'user' },
  reqSentTo: { type: Schema.ObjectId, ref: 'user' }
});

module.exports = mongoose.model('Follow', FollowSchema);
