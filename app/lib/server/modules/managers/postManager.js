(function() {
  var CommentSchema, PostManager, PostSchema, Settings, UserSchema, mongoose, path, settings, tagMap, tagReduce, _;
  mongoose = require('mongoose');
  PostSchema = require('../../models/post').PostSchema;
  UserSchema = require('../../models/user').UserSchema;
  CommentSchema = require('../../models/comment').CommentSchema;
  _ = require('underscore');
  Settings = require('settings');
  path = require('path');
  settings = new Settings(path.join(__dirname, '../../settings')).getEnvironment();
  PostManager = (function() {
    function PostManager() {
      mongoose.connect(settings.db);
      this.Post = mongoose.model('Post', PostSchema);
      this.User = mongoose.model('User', UserSchema);
      this.Comment = mongoose.model('Comment', CommentSchema);
    }
    PostManager.prototype.get = function(user, callback) {
      var tags;
      tags = user.tags;
      console.log('user in postManager', user);
      return this.Post.find({
        'tags': {
          $in: tags
        }
      }).populate('user').sort('dateCreated', -1).limit(10).run(function(err, posts) {
        if (err) {
          throw err;
        }
        return callback(null, posts);
      });
    };
    PostManager.prototype["new"] = function(post, user, callback) {
      var _post, _tags;
      _post = new this.Post();
      _post.title = post.title;
      _post.body = post.body;
      _tags = post.tags.split(',');
      _.each(_tags, function(tag) {
        return _post.tags.push(tag);
      });
      _post.user = user;
      return _post.save(function(err) {
        if (err) {
          throw err;
        }
        return callback(err, _post);
      });
    };
    PostManager.prototype.populateTagCloud = function() {
      var post;
      post = this.Post;
      return this.Post.collection.mapReduce(tagMap.toString(), tagReduce.toString(), {
        out: "tags"
      }, function(err, val) {
        if (err) {
          throw err;
        }
      });
    };
    return PostManager;
  })();
  tagMap = function() {
    var index, _results;
    _results = [];
    for (index in this.tags) {
      _results.push(emit(this.tags[index], 1));
    }
    return _results;
  };
  tagReduce = function(previous, current) {
    var count, index;
    count = 0;
    for (index in current) {
      count += current[index];
    }
    return count;
  };
  exports.create = function() {
    return new PostManager();
  };
}).call(this);
