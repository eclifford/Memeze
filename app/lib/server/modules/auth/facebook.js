(function() {
  var Promise, UserManager, everyauth;
  everyauth = require('everyauth');
  Promise = everyauth.Promise;
  UserManager = require('../../models/userManager');
  everyauth.facebook.redirectPath('/').appId('114943125293916').appSecret('1c1818ea07f5b2384bde1c957d6a80fb').findOrCreateUser(function(session, accessToken, accessTokExtra, fbUserMetadata) {
    var promise, userManager;
    promise = new Promise();
    userManager = UserManager.create();
    userManager.findOrCreateUserByFacebookData(fbUserMetadata, function(err, user) {
      return promise.fulfill(user);
    });
    return promise;
  });
  everyauth.everymodule.findUserById(function(userId, callback) {
    var userManager;
    userManager = UserManager.create();
    return userManager.getById(userId, callback);
  });
}).call(this);
