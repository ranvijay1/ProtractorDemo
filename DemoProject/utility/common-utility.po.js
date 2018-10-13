'use strict';

var fs = require('fs');
var _ = require('lodash');
var path = require('path');

var CommonUtility = function() {

}

/**
 * @function goToURL
 * @description This function is used open the document by the document url.
 * @param {String} url  Url of the document.
 * @returns NA.
 */
CommonUtility.prototype.goToURL = function (url) {
    browser.ignoreSynchronization = true;
    browser.get(url, 120);
  };

  /**
 * @function openUrl
 * @description This function is used to launch the url provided by user.
 * @param {string} urlKey name of the url key.
 * Example amezon-url-and-title.
 */
CommonUtility.prototype.openUrl = function (urlKey) {

    // Creating object
    var documentObj = Documents[urlKey];
    var _this = this;
  
    // Launching the document by url
    var url = documentObj.documentUrl;
    console.log(url)
    _this.goToURL(url);

    _this.waitUntilElementAppears(AmezonMainPage.getAccountButton(), 5000);
  
    // Check if application is launched
    browser.getTitle().then(function (title) {
      if (title !== documentObj.browserTitle) {
        expect(false).customError('Title of browser did not match.Expected: "' + documentObj.browserTitle + '", Found: "' + title + '"');
        _this.takeScreenShot();
      }
    });
  };

  /**
 * @function captureScreenShot
 * @description Use this function to take screen capture whenever you need to capture state of application
 * @param {string} [name] Name of the image. If no name is passed timestamp will be taken as name.
 * @param {sting} [imgDir] Directory path where you want to save the image. If not passed, images will be saved
 * to one level up from current directory under "images" folder.
 * @returns {promise|*} Promise which resolves to the path of iage
 */
CommonUtility.prototype.captureScreenShot = function (name, imgDir) {
    imgDir = imgDir || path.normalize(browser.params.path + '/test-results/Images');
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir);
    }
  
    var defer = protractor.promise.defer();
    var promise = defer.promise;
    var lastChar = imgDir.charAt(imgDir.length - 1);
    if (lastChar !== '/' && lastChar !== '\\') {
      imgDir = imgDir + '\\';
    }
  
    // Setting the default value of "name"
    if (name === undefined) {
      var d = new Date();
      name = d.getHours() + '' + d.getMinutes() + '' + d.getSeconds() + '' + d.getMilliseconds();
    }
  
    browser.takeScreenshot().then(function (png) {
      if (!fs.existsSync(imgDir)) {
        fs.mkdirSync(imgDir);
      }
  
      var stream = fs.createWriteStream(imgDir + name + '.png');
      stream.write(new Buffer(png, 'base64'));
      stream.end();
      defer.fulfill(imgDir + name);
    });
  
    return promise;
  };
  
  /*********************************************************************************************/
  /* Function: captureBrowserConsoleErrors                                                     */
  /* Description: This function is used to capture the Browser Console Errors.                 */
  /* Params: name - Name of the text file in which the Console Errors are to be written        */
  /*                    ex: errorMessage or undefined                                          */
  /* Return: Promise which resolves into the name of the Text file in which the error messages */
  /*                                          are written                                      */
  /*********************************************************************************************/
  CommonUtility.prototype.captureBrowserConsoleErrors = function (name) {
    var defer = protractor.promise.defer();
    var promise = defer.promise;
    var browserConsoleDir = path.normalize(browser.params.path + '/test-results/BrowserConsoleError');
    if (name === undefined) {
      var d = new Date();
      name = d.getHours() + '' + d.getMinutes() + '' + d.getSeconds() + '' + d.getMilliseconds();
    }
  
    browser.manage().logs().get('browser').then(function (browserLogs) {
      if (!fs.existsSync(browserConsoleDir)) {
        fs.mkdirSync(browserConsoleDir);
      }
  
      // browserLogs is an array of objects with level and message fields
      browserLogs.forEach(function (log) {
        if (log.level.value > 900) {
          // it's an error log
          var stream = fs.createWriteStream(browserConsoleDir + '\\' + name + '.txt');
          stream.write(new Buffer(log.message));
          stream.end();
          defer.fulfill(browserConsoleDir + '\\' + name);
        } else {
          defer.reject();
        }
      });
    });
  
    return promise;
  };
  
  /*********************************************************************************************/
  /* Function: takeScreenShot                                                                  */
  /* Description: Use this method to call "captureScreenShot" method, which actually capture   */
  /*              the image, and log the screen capture location into the logs.                */
  /* Params: 1. name: Name for the ScreenShot.                                                 */
  /* Return: nothing.                                                                          */
  /*********************************************************************************************/
  CommonUtility.prototype.takeScreenShot = function (name) {
  
    this.captureScreenShot(name).then(function (imagePath) {
      expect(false).customError('Please find the capture image in the Project Archive at: "' + imagePath + '"');
    });
  
    this.captureBrowserConsoleErrors(name).then(function (browserConsoleErros) {
      expect(false).customError('Please find the captured error messages in the Project Archive at: ' + '"' + browserConsoleErros + '"');
    }, function () {});
  };

  /**
 @function waitUntilElementDisappears
 @description Use this function to wait until the particular element get disappear.
 @param 1. elementReference -> Reference of element for which this function has to wait.
 Ex: 'Report Calculation' dialog reference
 @param 2. timeout -> Maximum time to wait for the element to disappear. Default = 20Secs
 @param 3. message -> optional message to display when timeout
 @return Returns promise which resolves to TRUE or error message.
 */
CommonUtility.prototype.waitUntilElementDisappears = function (elementReference, timeOut, message) {
    var defer = protractor.promise.defer();
    var promise = defer.promise;
    var timeout = timeOut || 20000;
    message = message || 'Timed out while waiting for element to disappear';
  
    // Wait until the element disappear from the web page
    browser.driver.wait(function () {
      return elementReference.isPresent().then(function (isPresent) {
        if (!isPresent) {
          defer.fulfill(true);
        }
  
        return !isPresent;
      });
    }, timeout, message);
  
    return promise;
  };
  
  /**
   @function waitUntilElementAppears
   @description Use this function to wait until the particular element get appears.
   @param 1. elementReference -> Reference of element for which this function has to wait.
   Ex: 'Report Calculation' dialog reference
   @param 2. timeout -> Maximum time to wait for the element to appear. Default = 20Secs
   @param 3. message -> optional message to display when timeout
   @return Returns promise which resolves to TRUE or error message.
   */
  CommonUtility.prototype.waitUntilElementAppears = function (elementReference, timeOut, message) {
    var defer = protractor.promise.defer();
    var promise = defer.promise;
    var timeout = timeOut || 20000;
    message = message || 'Timed out while waiting for element to appear';
  
    // Wait until the element appear in the web page
    browser.driver.wait(function () {
      return elementReference.isDisplayed().then(function (isPresent) {
        if (isPresent) {
          defer.fulfill(true);
        }
  
        return isPresent;
      }, function () {
  
        return false;
      });
    }, timeout, message);
  
    return promise;
  };
  
  /**
 * @func scrollElementToVisibility
 * @description This function will be used to scroll the element so that it is visible on the screen. If the element is already visible it does nothing.
 * @param {string} elementReference Reference of element that has to get into visibility
 * @returns NA
 */
CommonUtility.prototype.scrollElementToVisibility = function (elementReference) {
    var scrollIntoView = function () {
      arguments[0].scrollIntoView();
    };
  
    browser.executeScript(scrollIntoView, elementReference);
  };

  module.exports = new CommonUtility();