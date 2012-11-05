// This file was automatically generated from templates.soy.
// Please don't edit this file by hand.

goog.provide('aReporter.templates');

goog.require('soy');


/**
 * @param {Object.<string, *>=} opt_data
 * @return {string}
 * @notypecheck
 */
aReporter.templates.callToAction = function(opt_data) {
  var output = '';
  /** @desc text in some div calling to action */
  var MSG_UNNAMED_194 = goog.getMsg(
      '{$action} on me',
      {'action': soy.$$escapeHtml(opt_data.action)});
  output += MSG_UNNAMED_194;
  return output;
};
