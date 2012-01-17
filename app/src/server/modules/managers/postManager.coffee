mongoose  			= require 'mongoose'
PostSchema 			= require('../../models/post').PostSchema
UserSchema 			= require('../../models/user').UserSchema
CommentSchema 	= require('../../models/comment').CommentSchema
TagSchema 			= require('../../models/tag').TagSchema
_ 				      = require('underscore')
Settings        = require 'settings'
path						= require 'path'
settings        = new Settings(path.join(__dirname, '../../settings')).getEnvironment()
TagManager      = require '../../modules/managers/tagManager'

class PostManager 
	constructor: ->
		mongoose.connect settings.db
		@Post = mongoose.model 'Post', PostSchema
		@User = mongoose.model 'User', UserSchema
		@Comment = mongoose.model 'Comment', CommentSchema
		@Tag = mongoose.model 'Tag', TagSchema

	all: (callback) ->
		@Post
		.find({})
		.populate('user').populate('tags')
			.sort('dateCreated', 1)
			.limit(10)
			.run (err, posts) ->
				throw err if err
				callback null, posts 

	get: (id, callback) ->
		#tags = user.tags

		if id?
			@getById(id, callback)
		else
			@Post	
			.find({})
			.populate('user').populate('tags')
			.sort('dateCreated', 1)
			.limit(10)
			.run (err, posts) ->
				throw err if err
				callback null, posts 

	getById: (id, callback) ->
		@Post	
		.findById(id, (err, posts) ->
			throw err if err
			callback null, posts 			
		).populate('user').populate('tags')
	
	getByTag: (tag, callback) ->
		_tags = tag.split(',')
		console.log @Tag
		@Tag
		.find({'name': {$in: _tags}})
		.run (err, tags) =>
			@Post
			.find({'tags':{$in: tags}})
			.populate('user').populate('tags')
			.sort('dateCreated', -1)
			.limit(10)
			.run (err, posts) ->
				throw err if err
				callback null, posts

	addComment: (id, user, body, callback) ->
		@Post.findById(id, (err, post) ->
			throw err if err
			comment = 
				user: user
				body: body
				dateCreated: Date.now()
				dateUpdated: Date.now()
			post.comments.push comment
			post.save (err) ->
				throw err if err
				callback null, comment
		).populate('comments.user') 
	
	getComments: (id, callback) ->
		@Post.findById(id, (err, post) ->
			throw err if err
			callback null, post.comments
		).populate('comments.user')

	new: (post, user, callback) ->
		_post = new @Post()
		_post.title = post.title
		_post.body = post.body
		_post.dateCreated = new Date()
		_post.dateUpdated = new Date()

		tags = post.tags.split(',')
		i = 0
		
		tagManager = TagManager.create()
		_.each tags, (tag) ->
			tagManager.newOrUpdate tag, (err, t) ->
				_post.tags.push(t._id)
				i++
				if(i is tags.length)		
					_post.user = user
					_post.save (err) =>
						throw err if err
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

