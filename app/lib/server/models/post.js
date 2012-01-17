(function() {
  var CommentSchema, PostSchema, Schema, VoteSchema, mongoose;

  mongoose = require('mongoose');

  Schema = mongoose.Schema;

  CommentSchema = require('./comment').CommentSchema;

  VoteSchema = require('./vote').VoteSchema;

  PostSchema = new Schema({
    title: String,
    body: String,
    comments: [CommentSchema],
    votes: [VoteSchema],
    tags: [
      {
        type: Schema.ObjectId,
        ref: 'Tag'
      }
    ],
    dateCreated: {
      type: Date,
      "default": Date.now()
    },
    dateUpdated: {
      type: Date,
      "default": Date.now()
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  });

  exports.PostSchema = PostSchema;

}).call(this);
