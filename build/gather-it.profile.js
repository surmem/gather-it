var profile = (function() {
  return {
    basePath: "../src/js",
    releaseDir: "../../build-output",
    releaseName: "gather-it",
    action: "release",
    layerOptimize: "closure",
    optimize: "closure",
    cssOptimize: "comments",
    mini: true,
    stripConsole: "warn",
    selectorEngine: "acme",
    useSourceMaps: false,
    noref: true,

    defaultConfig: {
      hasCache:{
        "config-selectorEngine": "acme",
        "dojo-has-api": 1,
        "dojo-undef-api": 0
      },
      async: 1
    },

    // Dojo loader will have "has" api, but other loaders such as RequireJS do not. So, let's not mark it static.
    // This will allow RequireJS loader to fetch our modules. -1 indicates feature is not known at build time.
    staticHasFeatures: {
      "dojo-has-api": -1,
      "dojo-undef-api": -1
    },

    packages: [{
      name: "dojo",
      location: "dojo/dojo"
    }, {
      name: "dijit",
      location: "dojo/dijit"
    }, {
      name: "cards",
      location: "cards"
    }],

    layers: {
      "../lib/gather-it.js": {
        include: [
          "cards/mtg/GatherIt"
        ],
        dependencies: [
          "dojo/dom",
          "dojo/ready",
          "dojo/_base/declare",
          "dojo/_base/array",
          "dojo/on",
          "dojo/dom-construct",
          "dojo/dom-style",
          "dojo/mouse",
          "dijit/Tooltip"
        ]
      }
    }
  }
})();