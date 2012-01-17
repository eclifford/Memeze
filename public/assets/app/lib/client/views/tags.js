(function() {

  App.Views.TagListView = Backbone.View.extend({
    tagName: 'ul',
    initialize: function() {
      _.bindAll(this, "render", "addOne");
      this.collection.bind("add", this.addOne);
      return this.collection.bind("reset", this.render);
    },
    addAll: function() {
      var _this = this;
      return _.each(this.collection.models, function(tag) {
        return _this.addOne(tag);
      });
    },
    addOne: function(tag) {
      var view;
      view = new App.Views.TagView({
        model: tag
      });
      return $(this.el).append(view.render().el);
    },
    toggle: function() {},
    render: function() {
      this.addAll();
      return this;
    }
  });

  App.Views.MyTagListView = Backbone.View.extend({
    tagName: 'ul',
    initialize: function() {
      _.bindAll(this, "render", "addOne");
      this.collection.bind("add", this.addOne);
      return this.collection.bind("reset", this.render);
    },
    addAll: function() {
      var _this = this;
      return _.each(this.collection.models, function(tag) {
        return _this.addOne(tag);
      });
    },
    addOne: function(tag) {
      var view;
      view = new App.Views.TagView({
        model: tag
      });
      return $(this.el).prepend(view.render().el);
    },
    toggle: function() {},
    render: function() {
      console.log('mytaglistview render');
      this.addAll();
      return this;
    }
  });

  App.Views.TagView = Backbone.View.extend({
    tagName: 'li',
    events: function() {
      return {
        "click": 'activate'
      };
    },
    activate: function() {
      var activeTabs, tags;
      console.log('active');
      $(this.el).toggleClass('active');
      activeTabs = $('li.active');
      tags = [];
      $('li.active').each(function(index) {
        return tags.push($(this).text());
      });
      return window.location.hash = 'tags/' + tags.join();
    },
    initialize: function() {
      return _.bindAll(this, "render");
    },
    render: function() {
      $(this.el).html(window.JST['tag'](this.model.toJSON()));
      return this;
    }
  });

}).call(this);
