// This file was automatically generated from templates.soy.
// Please don't edit this file by hand.

goog.provide('aReporter.tickets.templates');

goog.require('soy');


/**
 * @param {Object.<string, *>=} opt_data
 * @return {string}
 * @notypecheck
 */
aReporter.tickets.templates.tickets = function(opt_data) {
  var output = '\t<h3>Stacked tickets</h3><ul class="nav nav-tabs nav-stacked">';
  var ticketList73 = opt_data.tickets;
  var ticketListLen73 = ticketList73.length;
  for (var ticketIndex73 = 0; ticketIndex73 < ticketListLen73; ticketIndex73++) {
    var ticketData73 = ticketList73[ticketIndex73];
    output += aReporter.tickets.templates.ticket(ticketData73);
  }
  output += '</ul>';
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @return {string}
 * @notypecheck
 */
aReporter.tickets.templates.ticket = function(opt_data) {
  return '\t<li class="' + ((opt_data.active) ? 'active' : '') + '" client-id="' + soy.$$escapeHtmlAttribute(opt_data.clientId) + '"><a href="#navs"><i class="icon-file"></i>' + soy.$$escapeHtml(opt_data.title) + '</a><button class="unlist"></button></li>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @return {string}
 * @notypecheck
 */
aReporter.tickets.templates.addTicketFrm = function(opt_data) {
  return '<form class="navbar-form pull-left"><label><i class="icon-search"></i>Ticket id</label><input type="text" id="ticket-id-fld" placeholder="Type ticket id"><button type="submit" id="add-ticket-btn" class="btn btn-inverse"><i class="icon-plus-sign icon-white"></i> Add</button></form>';
};
