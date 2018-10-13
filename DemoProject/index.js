Documents = require(__dirname + '/data/data.json');
/*CommonUtility = require(__dirname + '/utility/common-utility.po');
Customatcher = require(__dirname + '/utility/custom-matchers.po');*/


var fs = require('fs');

// Define globals to quiet WebStorm

/* globals CommonFunctions:true, FactSearch:true, FactSetLoginPage:true, ChartHelpers:true, ExcelUtilities:true, FDSAManager:true, FDSWebUtilities:true, ThiefHelpers:true, LimaUtil: true */
/* globals DelayBackend:true, FileDialog:true, ThiefGridHelpers:true */
customMatchers = require(__dirname + '/utility/custom-matchers.po');
CommonUtility = require(__dirname + '/utility/common-utility.po');
UiUtility = require(__dirname + '/ui-utility/ui-utility.po');
AmezonMainPage = require(__dirname + '/page-objects/amezon-main-page.po');
TodayDealPage = require(__dirname + '/page-objects/today-deal-page.po');

if (global.jasmine) {
  customMatchers.setCustomMatchers();
}

module.exports = {
    CommonUtility: CommonUtility
};
