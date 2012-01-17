(function() {
  var UserManager;

  UserManager = require('../models/UserManager');

  module.exports = function(app) {
    var userManager;
    userManager = UserManager.create();
    return app.get("/users/me/tags", function(req, res) {
      console.log('user', req.user);
      return userManager.getUserTags(req.user, function(err, tags) {
        return res.json(tags);
      });
    });
  };

}).call(this);
