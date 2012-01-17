PostManager = require '../modules/managers/PostManager'
TagManager = require '../modules/managers/TagManager'

module.exports = (app) ->
	postManager = PostManager.create()
	tagManager = TagManager.create()

	requiresLogin = (req, res, next) ->
    if req.user? 
      next()
    else
      res.redirect('/')

	app.get "/api/v1/posts", (req, res) ->
		if req.query.tags?
			postManager.getByTag req.query.tags, (err, posts) ->
				throw err if err
				res.json posts 
		else if req.query.id?
			postManager.get req.query.id, (err, posts) ->
				throw err if err
				res.json posts	  	
		else
			postManager.all (err, posts) ->
				res.json posts

	app.post "/api/v1/posts", (req, res) ->
		user = req.user
		console.log req.body.post
		postManager.new req.body.post, req.user, (err, post) ->
			res.json({'response': {'message': 'post was created'}})

	app.put "/api/v1/posts", (req, res) ->
		res.json({'response' : {'message': 'NOT IMPLEMENTED YET'}})
	
	app.delete "/api/v1/posts", (req, res) ->
		res.json({'response' : {'message': 'NOT IMPLEMENTED YET'}})

	#
	# COMMENTS
	##
	#

	app.get "/api/v1/comments", (req, res) ->
		postManager.getComments req.query.id, (err, comments) ->
			res.json comments

	app.post "/api/v1/comments", (req, res) ->
		postManager.addComment req.body.comment.id, req.user, req.body.comment.body, (err, comment) ->
			res.json comment

	app.put "/api/v1/comments", (req, res) ->
		postManager.getComments req.query.id, (err, comments) ->
			res.json({'response' : {'message': 'NOT IMPLEMENTED YET'}})

	app.delete "/api/v1/comments", (req, res) ->
		postManager.addComment req.body.comment.id, req.user, req.body.comment.body, (err, comment) ->
			res.json({'response' : {'message': 'NOT IMPLEMENTED YET'}})	

	#
	# TAGS
	##
	#
	
	app.get "/api/v1/tags", (req, res) ->
		tagManager.get (err, tags) ->	
			throw err if err
			res.json tags
