TagManager = require("../../modules/managers/tagManager")
assert = require("assert")
require "should"

module.exports =
	"is able to create tag": ->
			tagManager = TagManager.create()
			
			tagManager.new('testTag', (err, tag) ->
				return true
			)
	#   userManager = UserManager.create()
	#   userManager.newUser('eclifford', 'ericgclifford@gmail.com')

