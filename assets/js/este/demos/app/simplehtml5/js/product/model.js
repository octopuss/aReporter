// Coffe Class fixed for Closure Compiler by Este.js
// Generated by CoffeeScript 1.4.0
/**
  @fileoverview este.demos.app.simplehtml5.product.Model.
*/



goog.provide('este.demos.app.simplehtml5.product.Model');

goog.require('este.Model');



  

  /**
    @param {Object=} json
    @param {Function=} idGenerator
    @constructor
    @extends {este.Model}
  */


  este.demos.app.simplehtml5.product.Model = function(json, idGenerator) {
    este.demos.app.simplehtml5.product.Model.superClass_.constructor.call(this, json, idGenerator);
  }

  goog.inherits(este.demos.app.simplehtml5.product.Model, este.Model);

  /**
    @inheritDoc
  */


  este.demos.app.simplehtml5.product.Model.prototype.schema = {
    'name': {
      'set': este.model.setters.trim,
      'validators': {
        'required': este.model.validators.required
      }
    },
    'description': {
      'set': este.model.setters.trim,
      'validators': {
        'required': este.model.validators.required
      }
    }
  };

  