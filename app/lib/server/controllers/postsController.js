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
    app.get("/posts", function(req, res) {
      return res.render('posts/index', {
        title: 'Posts'
      });
    });
    app.get("/posts/new", function(req, res) {
      return res.render('posts/new', {
        title: 'New'
      });
    });
    return app.get("/posts/:id", function(req, res) {
      return res.render('posts/show', {
        title: 'Details'
      });
    });
  };

}).call(this);
