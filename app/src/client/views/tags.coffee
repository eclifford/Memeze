App.Views.TagListView = Backbone.View.extend(
  tagName: 'ul'

  initialize: ->
    _.bindAll this, "render", "addOne"
    @collection.bind "add", @addOne
    @collection.bind "reset", @render

  addAll: ->
    _.each @collection.models, (tag) =>
      @addOne(tag)

  addOne: (tag) ->
    view = new App.Views.TagView
      model: tag
    $(@el).append view.render().el

  toggle: ->


  render: ->
    @addAll()
    @
)

App.Views.MyTagListView = Backbone.View.extend(
  tagName: 'ul'

  initialize: ->
    _.bindAll this, "render", "addOne"
    @collection.bind "add", @addOne
    @collection.bind "reset", @render

  addAll: ->
    _.each @collection.models, (tag) =>
      @addOne(tag)

  addOne: (tag) ->
    view = new App.Views.TagView
      model: tag
    $(@el).prepend view.render().el

  toggle: ->


  render: ->
    console.log 'mytaglistview render'
    @addAll()
    @
)

App.Views.TagView = Backbone.View.extend(
  tagName: 'li'

  events: ->
    "click":      'activate'

  activate: ->
    console.log 'active'
    $(@el).toggleClass('active')
    activeTabs = $('li.active')

    tags = []
    $('li.active').each (index) ->
      tags.push($(this).text())
    
    window.location.hash = 'tags/' + tags.join()
    

  initialize: ->
    _.bindAll this, "render"

  render: ->
    $(@el).html window.JST['tag'](@model.toJSON())
    this
)

