var fs = require( 'fs' );

module.exports = function ( config ) {

  // Use ENV vars on Travis and sauce.json locally to get credentials
  if ( process.env.CI && ! process.env.SAUCE_USERNAME ) {
    if ( ! fs.existsSync( './app/util/sauce.json' ) ) {
      console.log( 'Create a sauce.json with your credentials based on the sauce-sample.json file.' );
      process.exit( 1 );
    } else {
      process.env.SAUCE_USERNAME = require( './sauce.json' ).username;
      process.env.SAUCE_ACCESS_KEY = require( './sauce.json' ).accessKey;
    }
  }

  // Browsers to run on Sauce Labs
  var customLaunchers = {
    'SL_Chrome': {
      base: 'SauceLabs',
      browserName: 'chrome'
    },
    'SL_Firefox': {
      base: 'SauceLabs',
      browserName: 'firefox'
    },
    'SL_IE10': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '10'
    },
    'SL_IE11': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '11'
    }
  };

  var conf = {
    basePath: '../',
    frameworks: [ 'mocha', 'chai' ],

    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-babel-preprocessor',
      'karma-chai',
      'karma-sauce-launcher'
    ],

    'babelPreprocesosor': {
      options: {
        sourceMap: 'inline'
      },
      filename: function(file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function(file) {
        return file.originalPath;
      }
    },
    
    preprocessors: {
      '**/*.spec.js': [ 'babel' ],
      'util/test-helpers.js': [ 'babel' ]
    },

    reporters: [ 'mocha' ],

    port: 9876,
    colors: true,

    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,

    browsers: [ 'PhantomJS' ],
    captureTimeout: 120000,
    singleRun: true
  };

  if ( process.env.CI ) {
    conf.sauceLabs = {
      testName: 'iFeis App CI'
    };

    conf.customLaunchers = customLaunchers;
    conf.browsers = Object.keys( customLaunchers );
    conf.reporters.push( 'saucelabs' );
  }

  config.set( conf );
};
