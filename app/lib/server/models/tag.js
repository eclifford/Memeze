(function() {
  var Schema, TagSchema, mongoose;

  mongoose = require('mongoose');

  Schema = mongoose.Schema;

  TagSchema = new Schema({
    name: String,
    count: Number,
    dateCreated: {
      type: Date,
      "default": Date.now()
    },
    dateUpdated: {
      type: Date,
      "default": Date.now()
    }
  });

  exports.TagSchema = TagSchema;

}).call(this);
