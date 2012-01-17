(function() {

  App.Routes.Posts = Backbone.Router.extend({
    routes: {
      'tags/:tag': "byTag",
      'show/:id': 'show',
      '*path': 'defaultRoute'
    },
    initialize: function() {
      console.log('routes init');
      this.postList = new App.Collections.Posts();
      return this.postListView = new App.Views.PostListView({
        el: 'div#posts',
        collection: this.postList
      });
    },
    show: function(id) {
      console.log('show fired', id);
      this.postListView.displayComments = true;
      return this.postList.fetch({
        data: {
          id: id
        }
      });
    },
    byTag: function(tag) {
      this.postListView.displayComments = false;
      return this.postList.fetch({
        data: {
          tags: tag
        }
      });
    },
    defaultRoute: function() {
      var postList, postListView, tagList, userTagListiew;
      postList = new App.Collections.Posts();
      postListView = new App.Views.PostListView({
        el: 'div#posts',
        collection: postList
      });
      postList.fetch();
      tagList = new App.Collections.Tags();
      userTagListiew = new App.Views.TagListView({
        el: 'ul#popularTags',
        collection: tagList
      });
      return tagList.fetch();
    }
  });

}).call(this);
