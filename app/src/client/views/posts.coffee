App.Views.PostView = Backbone.View.extend(
  className: 'post'
  displayComments: false

  events: 
    'click input#btnAddComment': 'addComment'

  initialize: ->
    _.bindAll this, "render", 'addComment'
  
  render: ->
    console.log 'PostView render'

    model = 
      showComments: @displayComments
      data: @model.toJSON()

    $(@el).html window.JST['post'](model)

    console.log 'displayingComments', @displayComments
    if @displayComments
      $('div#comments').html('')
      @comments = new App.Collections.Comments()
      @comments.fetch data:
        id: @model.get('_id')
        success: =>
          console.log 'comments fetch', @comments
          commentList = new App.Views.CommentListView(
            el: 'div#comments'
            collection: @comments
          )

  addComment: ->
    console.log 'addComment fired'
    commentBody = $('textarea#txtComment', @el).val()
    @comments.create(
      comment:
        id: @model.get('_id')
        body: commentBody
    )
)

App.Views.PostNewView = Backbone.View.extend(
  model: new App.Models.Post
  events: 
    'submit form': 'submit'
    
  submit: (e) ->
    e.preventDefault();
    #attrs = $(@el).find('form').serialize()
    #console.log 'attrs', attrs

    @model.save
      post:
       title: 'test'
       body: 'body'
    ,
    success: ->
      alert('great success')  
    error: ->
      alert('great failure')   
)

App.Views.PostListView = Backbone.View.extend(
  displayComments: false

  initialize: -> 
    _.bindAll this, 'render'   
    @collection.bind "add", @render
    @collection.bind "reset", @render
    $("div#comments").html('')

  render: ->
    @addAll()
    @

  addAll: ->
    $(@el).html('')
    $('div#comments').html('')
    _.each @collection.models, (post) =>
      @addOne(post)

  addOne: (post) ->
    view = new App.Views.PostView
      model: post
    view.displayComments = @displayComments
    view.render()
    $(@el).append(view.el) 
)

App.Views.CommentListView = Backbone.View.extend(
  tagName: 'section'
  className: 'comments'

  initialize: ->
    _.bindAll this, 'render', 'addAll', 'addOne'
    @collection.bind "add", @addOne
    @collection.bind "reset", @render

  addAll: ->
    console.log 'addAll', @collection.models
    _.each @collection.models, (comment) =>
      @addOne(comment)

  addOne: (comment) ->
    console.log 'addOne', comment
    view = new App.Views.CommentView
      model: comment
    console.log 'el', @el
    $(@el).append view.render().el

  render: ->
    @addAll()
    @

)

App.Views.CommentView = Backbone.View.extend(
  className: 'comment'
  
  initialize: ->
    _.bindAll this, "render"
  
  render: ->
    console.log 'model', @model
    $(@el).html window.JST['comment'](@model.toJSON())
    @    
)