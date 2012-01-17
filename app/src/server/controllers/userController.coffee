UserManager = require '../models/UserManager'

module.exports = (app) ->
	userManager = UserManager.create()

	app.get "/users/me/tags", (req, res) ->
		console.log 'user', req.user
		userManager.getUserTags req.user, (err, tags) ->
			res.json tags
