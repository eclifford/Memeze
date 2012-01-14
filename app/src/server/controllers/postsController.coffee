PostManager = require '../modules/managers/PostManager'

module.exports = (app) ->
	postManager = PostManager.create()

	requiresLogin = (req, res, next) ->
    if req.user? 
      next()
    else
      res.redirect('/')
      #res.redirect('/login?redir=' + req.url)

	app.get "/posts.:format?", requiresLogin, (req, res) ->
		postManager.get req.user, (err, posts) ->	
			if(req.params.format == 'json')
				res.json posts
			else
				res.render 'posts/index'
					title: 'Title'
	
	app.get "/posts/new", (req, res) ->
		console.log req.user
		res.render 'posts/new'
			title: 'New'

	app.post "/posts/new", (req, res) ->
		user = req.user
		console.log req.body.post
		postManager.new req.body.post, req.user, (err, post) ->
			res.json({'response': {'message': 'post was created'}})

	app.get "/posts/update", (req, res) ->
		res.json({'response' : {'message': 'NOT IMPLEMENTED YET'}})
	
	app.post "/posts/update", (req, res) ->
		res.json({'response' : {'message': 'NOT IMPLEMENTED YET'}})




	



