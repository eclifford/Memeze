PostManager = require '../modules/managers/PostManager'

module.exports = (app) ->
	postManager = PostManager.create()

	requiresLogin = (req, res, next) ->
    if req.user? 
      next()
    else
      res.redirect('/')
      #res.redirect('/login?redir=' + req.url)

	app.get "/posts", (req, res) ->
		res.render 'posts/index'
			title: 'Posts'

	app.get "/posts/new", (req, res) ->
		res.render 'posts/new'
			title: 'New'

	app.get "/posts/:id", (req, res) ->
		res.render 'posts/show'
			title: 'Details'





	



