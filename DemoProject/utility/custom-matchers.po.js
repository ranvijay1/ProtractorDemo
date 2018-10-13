// Custom Matcher(s)
function CustomMatchers() { }

CustomMatchers.prototype.setCustomMatchers = function () {
  beforeEach(function () {
    jasmine.addMatchers({

      customError: function () {
        return {
          compare: function (actual, stepID, mesg) {
            stepID = stepID || '';
            mesg = mesg || '';
            var result = {};
            result.pass = actual === true;

            if (!result.pass) {
              result.message = stepID + mesg;
            }

            return result;
          }
        };
      }

    });
  });
};

module.exports = new CustomMatchers();