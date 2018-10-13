'use strict';
var TodayDealPage = function() {

}

/**
 * @function getTodayDealPage 
 * @description This function is used to get today deal page reference
 * @return {promise} Return promise which resolve the reference of atoday deal page
 */
TodayDealPage.prototype.getTodayDealPage = function() {
    return element(by.xpath('//*[normalize-space(.)="Today\'s Deals"][contains(@class,"gbh1-bold")]'));
};

/**
 * @function getDepartmentCheckBox 
 * @description This function is used to get department checkbox reference
 * @param departmentName Name of department.
 * @return {promise} Return promise which resolve the reference of checkbox page
 */
TodayDealPage.prototype.getDepartmentCheckBox = function(departmentName) {
    return element(by.xpath('//*[normalize-space(.)="' + departmentName + '"]//ancestor::label//input'));
};

/**
 * @function getItemBasedOnName 
 * @description This function is used to get  item based on name
 * @param {string} itemName Name of item.
 * @return {promise} Return promise which resolve the reference of item based on name
 */
TodayDealPage.prototype.getItemBasedOnName = function(itemName) {
    return element(by.xpath('//a[normalize-space(.)="'+ itemName + '"]'));
};

module.exports = new TodayDealPage();