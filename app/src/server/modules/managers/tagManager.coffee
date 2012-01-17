mongoose 		= require 'mongoose'
TagSchema 	= require('../../models/tag').TagSchema
Settings    = require 'settings'
path				= require 'path'
settings    = new Settings(path.join(__dirname, '../../settings')).getEnvironment()

class TagManager
	constructor: ->
		mongoose.connect 'mongodb://localhost/memeze'
		@Tag = mongoose.model 'Tag', TagSchema

	get: (callback) ->
		@Tag.find({})
		.sort('count', -1)
		.limit(40)
		.run (err, tags) ->
			callback null, tags
	
	new: (name, callback) ->
		_tag = new @Tag()
		_tag.name = name
		_tag.count = 1
		_tag.save (err) =>
			throw err if err
			mongoose.disconnect()
			callback err, _tag

	newOrUpdate: (tagname, callback) ->
		@Tag.findOne({name: tagname}, (err, tag) =>
			throw err if err
			# Create a new Tag
			if tag is null
				console.log 'new tag'
				_tag = new @Tag()
				_tag.name = tagname
				_tag.count = 1
				_tag.save (err) ->
					callback err, _tag	
			# Update an existing Tag
			else
				console.log 'update tag'
				tag.count++
				tag.save (err) ->
					callback err, tag				
		)





exports.create = ->
	return new TagManager()
