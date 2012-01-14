(function() {
  var PostManager;
  PostManager = require('../modules/managers/PostManager');
  module.exports = function(app) {
    var postManager, requiresLogin;
    postManager = PostManager.create();
    requiresLogin = function(req, res, next) {
      if (req.user != null) {
        return next();
      } else {
        return res.redirect('/');
      }
    };
    app.get("/posts.:format?", requiresLogin, function(req, res) {
      return postManager.get(req.user, function(err, posts) {
        if (req.params.format === 'json') {
          return res.json(posts);
        } else {
          return res.render('posts/index', {
            title: 'Title'
          });
        }
      });
    });
    app.get("/posts/new", function(req, res) {
      console.log(req.user);
      return res.render('posts/new', {
        title: 'New'
      });
    });
    app.post("/posts/new", function(req, res) {
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
    app.get("/posts/update", function(req, res) {
      return res.json({
        'response': {
          'message': 'NOT IMPLEMENTED YET'
        }
      });
    });
    return app.post("/posts/update", function(req, res) {
      return res.json({
        'response': {
          'message': 'NOT IMPLEMENTED YET'
        }
      });
    });
  };
}).call(this);
