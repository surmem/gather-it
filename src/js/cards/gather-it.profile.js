var profile = (function() {
  var testResourceRe = /^cards\/tests\//, // check if mid is in collect/tests directory
    copyOnly = function(filename, mid) {
      var list = {
        "cards/gather-it.profile": true,
        "cards/package.json": true
      };
      return (mid in list) ||
        (/^app\/resources\//.test(mid) && !/\.css$/.test(filename)) ||
        /(png|jpg|jpeg|gif|tiff)$/.test(filename);
      // Check if it is one of the special files, if it is in
      // app/resource (but not CSS) or is an image
    };

  return {
    resourceTags: {
      test: function(filename, mid) {
        return testResourceRe.test(mid) || mid == "cards/tests";
      },
      copyOnly: function(filename, mid) {
        return copyOnly(filename, mid);
      },
      amd: function(filename, mid) {
        return !testResourceRe.test(mid) &&
          !copyOnly(filename, mid) &&
          /\.js$/.test(filename);
      }
    }
  };
})();