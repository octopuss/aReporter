// Coffe Class fixed for Closure Compiler by Este.js
// Generated by CoffeeScript 1.4.0
/**
  @fileoverview aReporter.domain.Activities.
*/



goog.provide('aReporter.domain.Activities');

goog.require('este.Collection');

goog.require('aReporter.domain.Activity');



  

  /**
    @param {Array=} array
    @constructor
    @extends {este.Collection}
  */


  aReporter.domain.Activities = function(array) {
    aReporter.domain.Activities.superClass_.constructor.call(this, array);
  }

  goog.inherits(aReporter.domain.Activities, este.Collection);

  /**
    @inheritDoc
  */


  aReporter.domain.Activities.prototype.model = aReporter.domain.Activity;

  
