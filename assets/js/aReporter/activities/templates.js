// This file was automatically generated from templates.soy.
// Please don't edit this file by hand.

goog.provide('aReporter.activities.templates');

goog.require('soy');


/**
 * @param {Object.<string, *>=} opt_data
 * @return {string}
 * @notypecheck
 */
aReporter.activities.templates.addActivityForm = function(opt_data) {
  var output = '<div class="well well-small"><p><i class="icon-time"></i>Activity record</p><form class="form-inline"><input type="text" name="creationDate" value="' + soy.$$escapeHtmlAttribute(opt_data.creationDate) + '" class="span2" placeholder="Date"><input type="text" name="hours" value="' + soy.$$escapeHtmlAttribute(opt_data.hours) + '" class="span1" placeholder="Hours"><select name="activityType" class="span2">';
  var iLimit8 = opt_data.activityTypes;
  for (var i8 = 0; i8 < iLimit8; i8++) {
    output += '<option>' + soy.$$escapeHtml(opt_data.activityTypes[i8]) + '</option>';
  }
  output += '</select><input type="text" name="description" class="span6" placeholder="Title; Description"><label class="checkbox"><input type="checkbox" name="invoiced"' + ((opt_data.invoiced) ? ' checked' : '') + '> Invoiced</label><button type="submit" class="btn pull-right"><i class="icon-plus-sign"></i></button></form></div>';
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @return {string}
 * @notypecheck
 */
aReporter.activities.templates.activities = function(opt_data) {
  var output = '<table class="table table-striped"><thead><tr><th>Creation date</th><th>Hours</th><th>Type</th><th>Title; Description</th><th>Invoiced</th><th></th></tr></thead><tbody>';
  var activityList19 = opt_data.activities;
  var activityListLen19 = activityList19.length;
  for (var activityIndex19 = 0; activityIndex19 < activityListLen19; activityIndex19++) {
    var activityData19 = activityList19[activityIndex19];
    output += aReporter.activities.templates.activity(activityData19);
  }
  output += '</tbody></table>';
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @return {string}
 * @notypecheck
 */
aReporter.activities.templates.activity = function(opt_data) {
  return '<tr client-id="' + soy.$$escapeHtmlAttribute(opt_data.clientId) + '"><td>' + soy.$$escapeHtml(opt_data.creationDate) + '</td><td>' + soy.$$escapeHtml(opt_data.hours) + '</td><td>' + soy.$$escapeHtml(opt_data.activityType) + '</td><td>' + ((opt_data.invoiced) ? '<i class="icon-check"></i>' : '') + '</td><td><button class="destroy"></button></td></tr>';
};
