// This file was automatically generated from templates.soy.
// Please don't edit this file by hand.

goog.provide('aReporter.layout.templates');

goog.require('soy');
goog.require('aReporter.tickets.templates');


/**
 * @param {Object.<string, *>=} opt_data
 * @return {string}
 * @notypecheck
 */
aReporter.layout.templates.element = function(opt_data) {
  return '<div class="container-fluid">' + aReporter.layout.templates.navbar(opt_data) + aReporter.layout.templates.metaInfo(opt_data) + '<div class="row-fluid"><div class="span3">' + aReporter.tickets.templates.addTicketFrm(opt_data) + ((opt_data.ticketsLength) ? aReporter.tickets.templates.tickets(opt_data) : '') + '</div><!--/span--><div class="span9">bla</div><!--/span--></div><!--/.row-fluid-->' + aReporter.layout.templates.footer(opt_data) + '</div><!--/.fluid-container-->';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @return {string}
 * @notypecheck
 */
aReporter.layout.templates.navbar = function(opt_data) {
  return '<div class="navbar navbar-inverse navbar-fixed-top"><div class="navbar-inner"><div class="container-fluid"><a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></a><a class="brand" href="#">Activity reporter</a><div class="nav-collapse collapse"><p class="navbar-text pull-right">Logged in as <a href="#" class="navbar-link">T911552</a></p><ul class="nav"><li class="active"><a href="#">Home</a></li><li><a href="#about">About</a></li></ul></div><!--/.nav-collapse --></div></div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @return {string}
 * @notypecheck
 */
aReporter.layout.templates.metaInfo = function(opt_data) {
  return '<div class="row-fluid"><div class="span8"><h2>Write what you have done</h2></div><!--/span--><div class="span4"><div class="well well-small"><p><span class="label label-info">Hrs this week</span><p><span class="label label-important">Hrs this month</span></div></div><!--/span--></div><!--/row-->';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @return {string}
 * @notypecheck
 */
aReporter.layout.templates.footer = function(opt_data) {
  return '<hr><footer><p>&copy; Ivan Doležal ' + soy.$$escapeHtml(opt_data.creationDate) + '</p></footer>';
};
