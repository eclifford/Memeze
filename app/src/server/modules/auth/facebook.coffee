everyauth    = require 'everyauth'
Promise      = everyauth.Promise
UserManager  = require '../../models/userManager'

everyauth.facebook
  .redirectPath('/')
  .appId('114943125293916')
  .appSecret('1c1818ea07f5b2384bde1c957d6a80fb')
  .findOrCreateUser (session, accessToken, accessTokExtra, fbUserMetadata) ->
    promise = new Promise();
    userManager = UserManager.create()
    userManager.findOrCreateUserByFacebookData(fbUserMetadata, (err, user) ->
      promise.fulfill(user)
    )
    return promise



everyauth.everymodule.findUserById (userId, callback) ->
  userManager = UserManager.create()
  userManager.getById userId, callback
