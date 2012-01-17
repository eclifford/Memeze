App.Routes.Posts = Backbone.Router.extend(
	routes: 
		'tags/:tag':     "byTag",    #tags/tag
		'show/:id':      'show',
		'*path':         'defaultRoute'

	initialize: ->
		console.log 'routes init'

		@postList = new App.Collections.Posts()
		@postListView = new App.Views.PostListView(
			el: 'div#posts',
			collection: @postList
		)
		
	show: (id) ->
		console.log 'show fired', id
		@postListView.displayComments = true
		@postList.fetch data:
			id: id

	byTag: (tag) ->
		@postListView.displayComments = false
		@postList.fetch data: 
			tags: tag

	defaultRoute: ->
		postList = new App.Collections.Posts()
		postListView = new App.Views.PostListView(
			el: 'div#posts',
			collection: postList
		)
		postList.fetch()

		tagList = new App.Collections.Tags()
		userTagListiew = new App.Views.TagListView(
			el: 'ul#popularTags',
			collection: tagList
		)
		tagList.fetch()


		# myTags = new App.Collections.MyTags()
		# userTagListiew = new App.Views.MyTagListView(
		# 	el: 'ul#myTags',
		# 	collection: myTags
		# )
		# myTags.fetch()

)