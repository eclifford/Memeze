(function() {

  module.exports = function(app) {
    return app.get("/", function(req, res) {
      return res.render("index", {
        title: "Memeze"
      });
    });
  };

}).call(this);
