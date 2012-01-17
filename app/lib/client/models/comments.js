(function() {

  App.Models.Comment = Backbone.Model.extend();

  App.Collections.Comments = Backbone.Collection.extend({
    model: App.Models.Comment,
    url: "/api/v1/comments"
  });

}).call(this);
