var fs = require( 'fs' );

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    '../src/**/*.scenario.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};

