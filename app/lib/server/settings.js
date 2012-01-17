(function() {
  var oneYear;

  oneYear = 1000 * 60 * 60 * 24 * 365;

  exports.common = {
    cookieMaxAge: oneYear,
    publicDir: 'public',
    cookieSecret: 'memeze',
    viewEngine: 'jade'
  };

  exports.development = {
    db: 'mongodb://localhost/memeze',
    staticMaxAge: null,
    errorHandling: {
      dumpExceptions: true,
      showStack: true
    },
    port: '27017'
  };

  exports.production = {
    db: 'mongodb://eclifford:reich33@staff.mongohq.com:10096/thevideowar',
    staticMaxAge: oneYear,
    errorHandling: {},
    port: '3000'
  };

  exports.test = {};

}).call(this);
