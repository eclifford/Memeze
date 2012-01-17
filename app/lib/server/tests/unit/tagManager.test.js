(function() {
  var TagManager, assert;

  TagManager = require("../../modules/managers/tagManager");

  assert = require("assert");

  require("should");

  module.exports = {
    "is able to create tag": function() {
      var tagManager;
      tagManager = TagManager.create();
      return tagManager["new"]('testTag', function(err, tag) {
        return true;
      });
    }
  };

}).call(this);
