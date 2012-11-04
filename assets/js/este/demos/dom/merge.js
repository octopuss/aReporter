// This file was automatically generated from merge.soy.
// Please don't edit this file by hand.

goog.provide('este.demos.dom.merge.templates');

goog.require('soy');


/**
 * @param {Object.<string, *>=} opt_data
 * @return {string}
 * @notypecheck
 */
este.demos.dom.merge.templates.form = function(opt_data) {
  return '<form id=\'form\'>' + ((opt_data.input) ? '<h1>Hi.</h1>' : '<h1>Input is not required</h1>') + '<label>input<input name=\'input\' value=\'' + soy.$$escapeHtmlAttribute(opt_data.input) + '\'>' + soy.$$escapeHtml(opt_data.input) + '</label><br><label>textarea<textarea style=\'font-size: ' + soy.$$escapeHtmlAttribute(soy.$$filterCssValue(opt_data.textarea.length)) + 'px\' name=\'textarea\'>' + soy.$$escapeHtmlRcdata(opt_data.textarea) + '</textarea>' + soy.$$escapeHtml(opt_data.textarea) + '</label></form>';
};
