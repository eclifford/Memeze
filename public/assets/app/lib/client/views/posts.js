(function() {

  App.Views.PostView = Backbone.View.extend({
    className: 'post',
    displayComments: false,
    events: {
      'click input#btnAddComment': 'addComment'
    },
    initialize: function() {
      return _.bindAll(this, "render", 'addComment');
    },
    render: function() {
      var model,
        _this = this;
      console.log('PostView render');
      model = {
        showComments: this.displayComments,
        data: this.model.toJSON()
      };
      $(this.el).html(window.JST['post'](model));
      console.log('displayingComments', this.displayComments);
      if (this.displayComments) {
        $('div#comments').html('');
        this.comments = new App.Collections.Comments();
        return this.comments.fetch({
          data: {
            id: this.model.get('_id'),
            success: function() {
              var commentList;
              console.log('comments fetch', _this.comments);
              return commentList = new App.Views.CommentListView({
                el: 'div#comments',
                collection: _this.comments
              });
            }
          }
        });
      }
    },
    addComment: function() {
      var commentBody;
      console.log('addComment fired');
      commentBody = $('textarea#txtComment', this.el).val();
      return this.comments.create({
        comment: {
          id: this.model.get('_id'),
          body: commentBody
        }
      });
    }
  });

  App.Views.PostNewView = Backbone.View.extend({
    model: new App.Models.Post,
    events: {
      'submit form': 'submit'
    },
    submit: function(e) {
      e.preventDefault();
      return this.model.save({
        post: {
          title: 'test',
          body: 'body'
        }
      }, {
        success: function() {
          return alert('great success');
        },
        error: function() {
          return alert('great failure');
        }
      });
    }
  });

  App.Views.PostListView = Backbone.View.extend({
    displayComments: false,
    initialize: function() {
      _.bindAll(this, 'render');
      this.collection.bind("add", this.render);
      this.collection.bind("reset", this.render);
      return $("div#comments").html('');
    },
    render: function() {
      this.addAll();
      return this;
    },
    addAll: function() {
      var _this = this;
      $(this.el).html('');
      $('div#comments').html('');
      return _.each(this.collection.models, function(post) {
        return _this.addOne(post);
      });
    },
    addOne: function(post) {
      var view;
      view = new App.Views.PostView({
        model: post
      });
      view.displayComments = this.displayComments;
      view.render();
      return $(this.el).append(view.el);
    }
  });

  App.Views.CommentListView = Backbone.View.extend({
    tagName: 'section',
    className: 'comments',
    initialize: function() {
      _.bindAll(this, 'render', 'addAll', 'addOne');
      this.collection.bind("add", this.addOne);
      return this.collection.bind("reset", this.render);
    },
    addAll: function() {
      var _this = this;
      console.log('addAll', this.collection.models);
      return _.each(this.collection.models, function(comment) {
        return _this.addOne(comment);
      });
    },
    addOne: function(comment) {
      var view;
      console.log('addOne', comment);
      view = new App.Views.CommentView({
        model: comment
      });
      console.log('el', this.el);
      return $(this.el).append(view.render().el);
    },
    render: function() {
      this.addAll();
      return this;
    }
  });

  App.Views.CommentView = Backbone.View.extend({
    className: 'comment',
    initialize: function() {
      return _.bindAll(this, "render");
    },
    render: function() {
      console.log('model', this.model);
      $(this.el).html(window.JST['comment'](this.model.toJSON()));
      return this;
    }
  });

}).call(this);
