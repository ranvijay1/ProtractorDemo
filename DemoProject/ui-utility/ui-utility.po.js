'use strict';
var UiUtility = function() {

}

/**
 * @function performMouseMove 
 * @description This function is used to perform mouse move action on any reference
 * @param {string} reference Pass reference of element on which want to perform mouse move action.
 * @return {promise} NA
 */
UiUtility.prototype.performMouseMove = function(reference) {
    browser.actions().mouseMove(reference).perform();
}

/**
 * @function verifyElementIsDisplayed
 * @description This function is used to verify if element is displayed or not displayed either by
 * element reference or by the xpath of an element.
 * @param {object} parameterJSON Pass json object as parameter.
 *      @param {string} parameterJSON.elementName Name of element.
 *      @param {string} [parameterJSON.reference] Reference of element. This is optional parameter.
 *      @param {string} [parameterJSON.xpathOfElement] Xpath of the element. This is optional parameter.
 *      @param {boolean} [parameterJSON.isDisplayed = false] Pass true if you want to verify the element is displayed. Default value is set to FALSE.
 *      Example : var parameterJSON = {elementName: Name of element, reference: reference of element, xpathOfElement: xpath of element, isDisplayed: true / false / undefined};
 *      If you pass xpath of element then no need to pass reference of element and vice versa.
 * @returns NA.
 */
UiUtility.prototype.verifyElementIsDisplayed = function (parameterJSON) {
    // Variable declaration
    var eleName = parameterJSON.elementName;
    var _this = this;
  
    // If element name is undefined
    if (parameterJSON.elementName === undefined) {
      eleName = 'Element';
    }
  
    // Setting default value for isDisplayed
    if (parameterJSON.isDisplayed === undefined) {
      parameterJSON.isDisplayed = false;
    }
  
    if (parameterJSON.isDisplayed === true) {
      // Verify element is displayed with xpath of element
      if (parameterJSON.xpathOfElement !== undefined) {
        element(by.xpath(parameterJSON.xpathOfElement)).isDisplayed().then(function (flag) {
          if (!flag) {
            expect(false).customError('"' + eleName + '" is not present');
            CommonUtility.takeScreenShot();
          }
        });
      } else if (parameterJSON.reference !== undefined) {
        // Verify element is not displayed with reference of element
        parameterJSON.reference.isDisplayed().then(function (flag) {
          if (!flag) {
            expect(false).customError('"' + eleName + '" is not present');
            CommonUtility.takeScreenShot();
          }
        });
      }
    } else {
      // Verify element is displayed with xpath of element
      if (parameterJSON.xpathOfElement !== undefined) {
        element(by.xpath(parameterJSON.xpathOfElement)).isDisplayed().then(function (flag) {
          if (flag) {
            expect(false).customError('"' + eleName + '" is present');
            CommonUtility.takeScreenShot();
          }
        });
      } else if (parameterJSON.reference !== undefined) {
        // Verify element is not displayed with reference of element
        parameterJSON.reference.isDisplayed().then(function (flag) {
          if (flag) {
            expect(false).customError('"' + eleName + '" is present');
            CommonUtility.takeScreenShot();
          }
        });
      }
    }
  };

  /**
 * @function verifyElementIsPresent
 * @description This function is used to verify if element is present or not, either by using element reference or by the xpath of an element.
 * @param {json} parameterJSON Pass json object as parameter.
 *      @param {string} parameterJSON.elementName Name of element.
 *      @param {string} [parameterJSON.reference] Reference of element. This is optional parameter.
 *      @param {string} [parameterJSON.xpathOfElement] Xpath of the element. This is optional parameter.
 *      @param {boolean} [parameterJSON.isPresent = false] Pass true if you want to verify if element is present. Default value is set to FALSE.
 *      Example : var parameterJSON = {elementName: Name of element, reference: reference of element, xpathOfElement: xpath of element, isPresent: true / false / undefined};
 *      If you pass xpath of element then no need to pass reference of element and vice versa.
 * @returns NA.
 */
UiUtility.prototype.verifyElementIsPresent = function (parameterJSON) {

    // Variable declaration
    var eleName = parameterJSON.elementName;
    var _this = this;
  
    // If element name is undefined
    if (parameterJSON.elementName === undefined) {
      eleName = 'Element';
    }
  
    // Setting default value for isPresent
    if (parameterJSON.isPresent === undefined) {
      parameterJSON.isPresent = false;
    }
  
    if (parameterJSON.isPresent === true) {
      // Verify element is present with xpath of element
      if (parameterJSON.xpathOfElement !== undefined) {
        element(by.xpath(parameterJSON.xpathOfElement)).isPresent().then(function (flag) {
          if (!flag) {
            expect(false).customError('"' + eleName + '" is not present');
            CommonUtility.takeScreenShot();
          }
        });
      } else if (parameterJSON.reference !== undefined) {
        // Verify element is present with reference of element
        parameterJSON.reference.isPresent().then(function (flag) {
          if (!flag) {
            expect(false).customError('"' + eleName + '" is not present');
            CommonUtility.takeScreenShot();
          }
        });
      }
    } else {
      // Verify element is not present with xpath of element
      if (parameterJSON.xpathOfElement !== undefined) {
        element(by.xpath(parameterJSON.xpathOfElement)).isPresent().then(function (flag) {
          if (flag) {
            expect(false).customError('"' + eleName + '" is present');
            CommonUtility.takeScreenShot();
          }
        });
      } else if (parameterJSON.reference !== undefined) {
        // Verify element is not present with reference of element
        parameterJSON.reference.isPresent().then(function (flag) {
          if (flag) {
            expect(false).customError('"' + eleName + '" is present');
            CommonUtility.takeScreenShot();
          }
        });
      }
    }
  };

  /**
 * @function clickOnElementRefrence 
 * @description This function is used to click on any reference
 * @param {string} reference Pass reference of element on which want to perform click.
 * @param {string} [elementName] Pass element name;
 * @return {promise} NA
 */
UiUtility.prototype.clickOnElementRefrence = function(reference, elementName) {
    if(elementName === undefined) {
        elementName = 'Element';
    }
    reference.click().then(function() {}, function(err) {
        CommonUtility.takeScreenShot();
        expect(false).customError(elementName + ' is not clickable' + err);
    });
}

/**
 * @function checkOrUncheckCheckBox 
 * @description This function is used to check or uncheck the checkbox
 * @param {string} reference Pass reference of element on which want to perform click.
 * @param {string} [status] pass true for check false for uncheck
 * Example true/false
 * @param {string} [elementName] Pass element name;
 * @return {promise} NA
 */
UiUtility.prototype.checkOrUncheckCheckBox = function(reference, status, elementName) {
    if(elementName === undefined) {
        elementName = 'Element';
    }

    if(status === undefined) {
        status = false;
    }

    // Clicking on check box
    reference.click().then(function() {}, function(err) {
        CommonUtility.takeScreenShot();
        expect(false).customError(elementName + ' is not clickable' + err);
    });

    if (status) {
        CommonUtility.waitUntilElementAppears(reference, 10000);
        // Verifying if check box is checked
        reference.getAttribute('checked').then(function(flag) {
            if(!flag) {
                expect(false).customError( elementName + ' did not get checked');
                CommonUtility.takeScreenShot();
            }
        });
    } else {
        // Verifying if check box is unchecked
        CommonUtility.waitUntilElementAppears(reference, 5000);
        reference.getAttribute('value').then(function(flag) {
            if(flag) {
                expect(false).customError( elementName + ' did not get unchecked');
                CommonUtility.takeScreenShot();
            }
        });
    }
    
}

/**
 * @function settingAndVerifyingText 
 * @description This function is used to set and verifying text
 * @param {string} reference Pass reference of text box.
 * @param {string} text pass text
 * @return {promise} NA
 */
UiUtility.prototype.settingAndVerifyingText = function(reference, text) {

    //Clearing text box
    reference.clear();

    //Setting text
    reference.sendKeys(text);

    // Verifying text is entered correctly
    reference.getAttribute('value').then(function(getText) {
        if(getText !== text) {
            expect(false).customError( 'Text did not set correctly; Actual: ' + text + 'Found: ' + getText);
            CommonUtility.takeScreenShot();
        }
    });
    
}
  

module.exports = new UiUtility();