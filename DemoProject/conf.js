// An example configuration file
exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    browserName: 'chrome'
  },

  onPrepare: function () {

    // Requiring jasmine reporters module
    var jasmineReporters = require('jasmine-reporters');
    var junitReporter = new jasmineReporters.JUnitXmlReporter({
      savePath: __dirname + '//test-results/Logs',
      consolidateAll: true,
    });
    jasmine.getEnv().addReporter(junitReporter);

    // Add module to give more verbose output
    var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
    jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: true }));

    var VideoReporter = require('protractor-video-reporter');

    var path = require('path');

    jasmine.getEnv().addReporter(new VideoReporter({
      baseDirectory: path.join(__dirname, 'test-results/Videos/'),
      createSubtitles: true,
          singleVideo: true,
          ffmpegCmd: path.normalize('./node_modules/ffmpeg-binaries/bin/ffmpeg.exe'),
          ffmpegArgs: [
              '-f', 'gdigrab',
              '-framerate', '24',
              '-video_size', 'wsxga',
              '-i', 'desktop',
              '-q:v','10',
          ]
    })); 

    // Maximizing browser instance
    browser.manage().window().maximize();

  },

  // Spec patterns are relative to the configuration file location passed
  // to protractor (in this example conf.js).
  // They may include glob patterns.
  specs: ['./tests/tests-amezon.spec.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  },

  params: {
    path: __dirname,
  }
};