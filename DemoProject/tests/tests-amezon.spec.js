'use strict';
require('../index.js');

describe('Test Case: Testing Amezon Site', function () {
    var parameterJSON = { elementName: undefined, reference: undefined, xpathOfElement: undefined, isDisplayed: true };

    describe('Test Scenario: Open amezon url and performing mouse move operation', function () {

        it('Should open amezon url and verifying the title of page', function () {
            CommonUtility.openUrl('amezon-url-and-title');
        });

        var referenceOfMouseHover = [AmezonMainPage.getAccountButton(), AmezonMainPage.getTryPrimeLink()];
        var referenceOfAfterHoverTheMouse = [AmezonMainPage.getSignInButton(), AmezonMainPage.getPrimeToolTip()];
        var elementName = ['Sign In button', 'ToolTip textbox'];

        referenceOfMouseHover.forEach(function (ref, index) {
            it('Should hover mouse on "' + elementName[index] + '" button', function () {
                UiUtility.performMouseMove(ref);
            });

            it('Verifying if "' + elementName[index] + '" button present', function () {
                parameterJSON.elementName = elementName[index];
                parameterJSON.reference = referenceOfAfterHoverTheMouse[index];
                CommonUtility.waitUntilElementAppears(referenceOfAfterHoverTheMouse[index], 3000);
                UiUtility.verifyElementIsDisplayed(parameterJSON);
            });
        });

    });

    describe('Test Scenario: Select "Today\'s Deals" tab and selecting specific item', function () {

        it('Should click on "Today\'s Deals" tab from amezon main page', function () {
            UiUtility.clickOnElementRefrence(AmezonMainPage.getTabFromMainPage('Today\'s Deals'), 'Today\'s Deals');
        });

        it('Verifying if "Today\'s Deal" page opened', function () {
            parameterJSON.elementName = 'Today \'s Deal Page';
            parameterJSON.reference = TodayDealPage.getTodayDealPage();
            CommonUtility.waitUntilElementAppears(TodayDealPage.getTodayDealPage(), 5000);
            UiUtility.verifyElementIsDisplayed(parameterJSON);
        });

        it('Should click on "Book" checkbox from department to checkoff', function() {
            CommonUtility.scrollElementToVisibility(TodayDealPage.getDepartmentCheckBox('Books'));
            UiUtility.checkOrUncheckCheckBox(TodayDealPage.getDepartmentCheckBox('Books'), true, 'Books');
        });

        it('Shoul select "Klutz LEGO Chain Reactions Craft Kit" from the list', function() {
            CommonUtility.waitUntilElementAppears(TodayDealPage.getItemBasedOnName('Klutz LEGO Chain Reactions Craft Kit'), 5000);
            UiUtility.clickOnElementRefrence(TodayDealPage.getItemBasedOnName('Klutz LEGO Chain Reactions Craft Kit'), 'Klutz LEGO Chain Reactions Craft Kit');
        });
    });

    describe('Test Scenario: Searching item from search textbox and selecting specific item', function() {
        
        it('Should enter "Nike Shoes" in to search box', function() {
            UiUtility.settingAndVerifyingText(AmezonMainPage.getSearchBox(), 'Nike Shoes');
        });

        it('Should click on "Search button"', function() {
            UiUtility.clickOnElementRefrence(AmezonMainPage.getSearchButton());
        });

        it('Verifying if some items displayed in results', function() {
            AmezonMainPage.getAllSearchItems().count().then(function(count) {
                if(count <= 0) {
                    expect(false).customError('No items displyed in the result');
                    CommonUtility.takeScreenShot();
                }
            });
        });

        
    });
});