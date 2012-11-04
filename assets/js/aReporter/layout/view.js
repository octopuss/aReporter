// Coffe Class fixed for Closure Compiler by Este.js
// Generated by CoffeeScript 1.4.0
/**
  @fileoverview aReporter.layout.View.
*/



goog.provide('aReporter.layout.View');

goog.require('este.app.View');

goog.require('aReporter.domain.Tickets');

goog.require('aReporter.layout.templates');



  

  /**
    @constructor
    @extends {este.app.View}
  */


  aReporter.layout.View = function() {
    aReporter.layout.View.superClass_.constructor.call(this);
  }

  goog.inherits(aReporter.layout.View, este.app.View);

  /**
    @type {aReporter.Tickets}
    @protected
  */


  aReporter.layout.View.prototype.tickets = null;

  /**
   @type {aReporter.Activities}
   @protected
  */


  aReporter.layout.View.prototype.activities = null;

  /**
    Each view is async loaded by default. Load method has to return object
    implementing goog.result.Result interface. It's better than plain old
    callbacks. todo: link to article
    @inheritDoc
  */


  aReporter.layout.View.prototype.load = function(params) {
    if (!this.tickets) {
      this.tickets = new aReporter.domain.Tickets;
      return this.localStorage.query(this.tickets);
    }
    return aReporter.layout.View.superClass_.load.call(this);
  };

  /**
    @inheritDoc
  */


  aReporter.layout.View.prototype.enterDocument = function() {
    aReporter.layout.View.superClass_.enterDocument.call(this);
    return this.update();
  };

  /**
    Method takes care of default layout initialization and rendering
    @protected
  */


  aReporter.layout.View.prototype.update = function() {
    var html, json, ticket;
    ticket = new aReporter.domain.Ticket({
      title: 'aaa',
      active: true
    });
    this.tickets.add(ticket);
    json = {
      tickets: this.tickets,
      ticketsLength: this.tickets.getLength()
    };
    html = aReporter.layout.templates.element(json);
    return this.mergeHtml(html);
  };

  