App.Models.Tag = Backbone.Model.extend()

App.Collections.Tags = Backbone.Collection.extend(
  model: App.Models.Tag
  url: "/api/v1/tags"
)