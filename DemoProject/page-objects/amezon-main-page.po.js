'use strict';
var AmezonMainPage = function() {


}

/**
 * @function getAccountButton 
 * @description This function is used to get account button reference
 * @return {promise} Return promise which resolve the reference of account button
 */
AmezonMainPage.prototype.getAccountButton = function() {
    return element(by.css('#nav-link-accountList'));
};

/**
 * @function getSignInButton 
 * @description This function is used to get signin button reference
 * @return {promise} Return promise which resolve the reference of signin button
 */
AmezonMainPage.prototype.getSignInButton = function() {
    return element(by.css('#nav-flyout-ya-signin'));
};

/**
 * @function getTryPrimeLink 
 * @description This function is used to get try prime link button reference
 * @return {promise} Return promise which resolve the reference of try prime button
 */
AmezonMainPage.prototype.getTryPrimeLink = function() {
    return element(by.xpath('//*[normalize-space(.)="Try Prime"][contains(@class,"nav-sprite nav-logo")]'));
};

/**
 * @function getPrimeToolTip 
 * @description This function is used to get try prime link tooltip reference
 * @return {promise} Return promise which resolve the reference of try prime tooltip
 */
AmezonMainPage.prototype.getPrimeToolTip = function() {
    return element(by.css('#nav-prime-tooltip'));
};

/**
 * @function getTabFromMainPage 
 * @description This function is used to get the tab from main page
 * @param {string} tabName Name of tab;
 * @return {promise} Return promise which resolve the reference of tab.
 */
AmezonMainPage.prototype.getTabFromMainPage = function(tabName) {
    return element(by.xpath('//*[@id="nav-xshop-container"]//*[normalize-space(.)="' + tabName + '"]'));
};

/**
 * @function getSearchBox 
 * @description This function is used to get search box reference
 * @return {promise} Return promise which resolve the reference of search box
 */
AmezonMainPage.prototype.getSearchBox = function() {
    return element(by.css('#twotabsearchtextbox'));
};

/**
 * @function getSearchButton 
 * @description This function is used to get search button reference
 * @return {promise} Return promise which resolve the reference of search button
 */
AmezonMainPage.prototype.getSearchButton = function() {
    return element(by.xpath('//*[@value="Go"][@class="nav-input"]'));
};

/**
 * @function getAllSearchItems 
 * @description This function is used to get all searched items reference
 * @return {promise} Return promise which resolve the reference all searched items
 */
AmezonMainPage.prototype.getAllSearchItems = function() {
    return element.all(by.xpath('//*[@id="s-results-list-atf"]//li'));
};

module.exports = new AmezonMainPage();