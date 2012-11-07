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
  var typeList8 = opt_data.activityTypes;
  var typeListLen8 = typeList8.length;
  for (var typeIndex8 = 0; typeIndex8 < typeListLen8; typeIndex8++) {
    var typeData8 = typeList8[typeIndex8];
    output += '<option value="' + soy.$$escapeHtmlAttribute(typeData8.type) + '">' + soy.$$escapeHtml(typeData8.value) + '</option>';
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
  var activityList22 = opt_data.activities;
  var activityListLen22 = activityList22.length;
  for (var activityIndex22 = 0; activityIndex22 < activityListLen22; activityIndex22++) {
    var activityData22 = activityList22[activityIndex22];
    output += aReporter.activities.templates.activity(activityData22);
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
