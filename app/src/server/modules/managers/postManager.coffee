mongoose  			= require 'mongoose'
PostSchema 			= require('../../models/post').PostSchema
UserSchema 			= require('../../models/user').UserSchema
CommentSchema 	= require('../../models/comment').CommentSchema
_ 				      = require('underscore')
Settings        = require 'settings'
path						= require 'path'
settings        = new Settings(path.join(__dirname, '../../settings')).getEnvironment()

class PostManager 
	constructor: ->
		mongoose.connect settings.db
		@Post = mongoose.model 'Post', PostSchema
		@User = mongoose.model 'User', UserSchema
		@Comment = mongoose.model 'Comment', CommentSchema

	get: (user, callback) ->
		tags = user.tags
		console.log 'user in postManager', user

		@Post
		.find({'tags':{ $in: tags }})
		.populate('user')
		.sort('dateCreated', -1)
		.limit(10)
		.run (err, posts) ->
			throw err if err
			callback null, posts 

	new: (post, user, callback) ->
		_post = new @Post()
		_post.title = post.title
		_post.body = post.body
		_tags = post.tags.split(',')
		_.each _tags, (tag) ->
			_post.tags.push tag
		_post.user = user
		_post.save (err) ->
			throw err if err
			#@populateTagCloud()
			callback err, _post

	populateTagCloud: ->
		post = @Post
		@Post.collection.mapReduce tagMap.toString(), tagReduce.toString(), { out : "tags" }, (err, val) -> 
			throw err if err

tagMap = ->
	for index of @tags
		emit @tags[index], 1

tagReduce = (previous, current) ->
	count = 0
	for index of current
		count += current[index]
	count
	
exports.create = ->
	return new PostManager()

