(function() {
  var PostManager, TagManager;

  PostManager = require('../modules/managers/PostManager');

  TagManager = require('../modules/managers/TagManager');

  module.exports = function(app) {
    var postManager, requiresLogin, tagManager;
    postManager = PostManager.create();
    tagManager = TagManager.create();
    requiresLogin = function(req, res, next) {
      if (req.user != null) {
        return next();
      } else {
        return res.redirect('/');
      }
    };
    app.get("/api/v1/posts", function(req, res) {
      if (req.query.tags != null) {
        return postManager.getByTag(req.query.tags, function(err, posts) {
          if (err) throw err;
          return res.json(posts);
        });
      } else if (req.query.id != null) {
        return postManager.get(req.query.id, function(err, posts) {
          if (err) throw err;
          return res.json(posts);
        });
      } else {
        return postManager.all(function(err, posts) {
          return res.json(posts);
        });
      }
    });
    app.post("/api/v1/posts", function(req, res) {
      var user;
      user = req.user;
      console.log(req.body.post);
      return postManager["new"](req.body.post, req.user, function(err, post) {
        return res.json({
          'response': {
            'message': 'post was created'
          }
        });
      });
    });
    app.put("/api/v1/posts", function(req, res) {
      return res.json({
        'response': {
          'message': 'NOT IMPLEMENTED YET'
        }
      });
    });
    app["delete"]("/api/v1/posts", function(req, res) {
      return res.json({
        'response': {
          'message': 'NOT IMPLEMENTED YET'
        }
      });
    });
    app.get("/api/v1/comments", function(req, res) {
      return postManager.getComments(req.query.id, function(err, comments) {
        return res.json(comments);
      });
    });
    app.post("/api/v1/comments", function(req, res) {
      return postManager.addComment(req.body.comment.id, req.user, req.body.comment.body, function(err, comment) {
        return res.json(comment);
      });
    });
    app.put("/api/v1/comments", function(req, res) {
      return postManager.getComments(req.query.id, function(err, comments) {
        return res.json({
          'response': {
            'message': 'NOT IMPLEMENTED YET'
          }
        });
      });
    });
    app["delete"]("/api/v1/comments", function(req, res) {
      return postManager.addComment(req.body.comment.id, req.user, req.body.comment.body, function(err, comment) {
        return res.json({
          'response': {
            'message': 'NOT IMPLEMENTED YET'
          }
        });
      });
    });
    return app.get("/api/v1/tags", function(req, res) {
      return tagManager.get(function(err, tags) {
        if (err) throw err;
        return res.json(tags);
      });
    });
  };

}).call(this);
