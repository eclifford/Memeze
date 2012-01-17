(function() {
  var Settings, TagManager, TagSchema, mongoose, path, settings;

  mongoose = require('mongoose');

  TagSchema = require('../../models/tag').TagSchema;

  Settings = require('settings');

  path = require('path');

  settings = new Settings(path.join(__dirname, '../../settings')).getEnvironment();

  TagManager = (function() {

    function TagManager() {
      mongoose.connect('mongodb://localhost/memeze');
      this.Tag = mongoose.model('Tag', TagSchema);
    }

    TagManager.prototype.get = function(callback) {
      return this.Tag.find({}).sort('count', -1).limit(40).run(function(err, tags) {
        return callback(null, tags);
      });
    };

    TagManager.prototype["new"] = function(name, callback) {
      var _tag,
        _this = this;
      _tag = new this.Tag();
      _tag.name = name;
      _tag.count = 1;
      return _tag.save(function(err) {
        if (err) throw err;
        mongoose.disconnect();
        return callback(err, _tag);
      });
    };

    TagManager.prototype.newOrUpdate = function(tagname, callback) {
      var _this = this;
      return this.Tag.findOne({
        name: tagname
      }, function(err, tag) {
        var _tag;
        if (err) throw err;
        if (tag === null) {
          console.log('new tag');
          _tag = new _this.Tag();
          _tag.name = tagname;
          _tag.count = 1;
          return _tag.save(function(err) {
            return callback(err, _tag);
          });
        } else {
          console.log('update tag');
          tag.count++;
          return tag.save(function(err) {
            return callback(err, tag);
          });
        }
      });
    };

    return TagManager;

  })();

  exports.create = function() {
    return new TagManager();
  };

}).call(this);
