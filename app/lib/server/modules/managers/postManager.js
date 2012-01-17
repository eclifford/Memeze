(function() {
  var CommentSchema, PostManager, PostSchema, Settings, TagManager, TagSchema, UserSchema, mongoose, path, settings, tagMap, tagReduce, _;

  mongoose = require('mongoose');

  PostSchema = require('../../models/post').PostSchema;

  UserSchema = require('../../models/user').UserSchema;

  CommentSchema = require('../../models/comment').CommentSchema;

  TagSchema = require('../../models/tag').TagSchema;

  _ = require('underscore');

  Settings = require('settings');

  path = require('path');

  settings = new Settings(path.join(__dirname, '../../settings')).getEnvironment();

  TagManager = require('../../modules/managers/tagManager');

  PostManager = (function() {

    function PostManager() {
      mongoose.connect(settings.db);
      this.Post = mongoose.model('Post', PostSchema);
      this.User = mongoose.model('User', UserSchema);
      this.Comment = mongoose.model('Comment', CommentSchema);
      this.Tag = mongoose.model('Tag', TagSchema);
    }

    PostManager.prototype.all = function(callback) {
      return this.Post.find({}).populate('user').populate('tags').sort('dateCreated', 1).limit(10).run(function(err, posts) {
        if (err) throw err;
        return callback(null, posts);
      });
    };

    PostManager.prototype.get = function(id, callback) {
      if (id != null) {
        return this.getById(id, callback);
      } else {
        return this.Post.find({}).populate('user').populate('tags').sort('dateCreated', 1).limit(10).run(function(err, posts) {
          if (err) throw err;
          return callback(null, posts);
        });
      }
    };

    PostManager.prototype.getById = function(id, callback) {
      return this.Post.findById(id, function(err, posts) {
        if (err) throw err;
        return callback(null, posts);
      }).populate('user').populate('tags');
    };

    PostManager.prototype.getByTag = function(tag, callback) {
      var _tags,
        _this = this;
      _tags = tag.split(',');
      console.log(this.Tag);
      return this.Tag.find({
        'name': {
          $in: _tags
        }
      }).run(function(err, tags) {
        return _this.Post.find({
          'tags': {
            $in: tags
          }
        }).populate('user').populate('tags').sort('dateCreated', -1).limit(10).run(function(err, posts) {
          if (err) throw err;
          return callback(null, posts);
        });
      });
    };

    PostManager.prototype.addComment = function(id, user, body, callback) {
      return this.Post.findById(id, function(err, post) {
        var comment;
        if (err) throw err;
        comment = {
          user: user,
          body: body,
          dateCreated: Date.now(),
          dateUpdated: Date.now()
        };
        post.comments.push(comment);
        return post.save(function(err) {
          if (err) throw err;
          return callback(null, comment);
        });
      }).populate('comments.user');
    };

    PostManager.prototype.getComments = function(id, callback) {
      return this.Post.findById(id, function(err, post) {
        if (err) throw err;
        return callback(null, post.comments);
      }).populate('comments.user');
    };

    PostManager.prototype["new"] = function(post, user, callback) {
      var i, tagManager, tags, _post;
      _post = new this.Post();
      _post.title = post.title;
      _post.body = post.body;
      _post.dateCreated = new Date();
      _post.dateUpdated = new Date();
      tags = post.tags.split(',');
      i = 0;
      tagManager = TagManager.create();
      return _.each(tags, function(tag) {
        return tagManager.newOrUpdate(tag, function(err, t) {
          var _this = this;
          _post.tags.push(t._id);
          i++;
          if (i === tags.length) {
            _post.user = user;
            return _post.save(function(err) {
              if (err) throw err;
              return callback(err, _post);
            });
          }
        });
      });
    };

    PostManager.prototype.populateTagCloud = function() {
      var post;
      post = this.Post;
      return this.Post.collection.mapReduce(tagMap.toString(), tagReduce.toString(), {
        out: "tags"
      }, function(err, val) {
        if (err) throw err;
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
