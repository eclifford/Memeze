(function() {

  App.Views.VideoView = Backbone.View.extend({
    className: 'video',
    displayComments: true,
    events: {
      'click input#btnAddComment': 'addComment',
      'click input#btnAddVote': 'addVote'
    },
    fillInBindings: {
      '.comments': 'comments'
    },
    initialize: function() {
      var _this = this;
      _.bindAll(this, "render", "addComment");
      this.model.bind('change', this.render);
      $(this.el).html(window.JST['video'](this.model.toJSON()));
      this.comments = new App.Collections.Comments();
      this.comments.url = '/comments/' + this.model.get('_id');
      this.comments.fetch({
        success: function() {
          var commentList;
          return commentList = new App.Views.CommentListView({
            el: $(_this.el).find('div.comments'),
            collection: _this.comments
          });
        }
      });
      return this.render();
    },
    render: function() {
      return this.$('.votes').html(this.model.get('votes').length);
    },
    addVote: function() {
      var _this = this;
      return $.ajax({
        type: "POST",
        url: '/videos/' + this.model.get('_id') + '/addVote',
        success: function(data) {
          console.log('success');
          return _this.model.set(data);
        },
        dataType: 'json'
      });
    },
    addComment: function() {
      var commentBody;
      commentBody = $('textarea#txtAddComment', this.el).val();
      return this.comments.create({
        comment: {
          body: commentBody
        }
      });
    }
  });

}).call(this);
