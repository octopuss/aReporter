// Coffe Class fixed for Closure Compiler by Este.js
// Generated by CoffeeScript 1.4.0
/**
  @fileoverview este.demos.app.simplehash.products.View.
*/



goog.provide('este.demos.app.simplehash.products.View');

goog.require('este.app.View');

goog.require('este.demos.app.simplehash.products.Collection');



  

  /**
    @constructor
    @extends {este.app.View}
  */


  este.demos.app.simplehash.products.View = function() {
    este.demos.app.simplehash.products.View.superClass_.constructor.call(this);
  }

  goog.inherits(este.demos.app.simplehash.products.View, este.app.View);

  /**
    @inheritDoc
  */


  este.demos.app.simplehash.products.View.prototype.url = '/';

  /**
    @type {este.demos.app.simplehash.products.Collection} products
    @protected
  */


  este.demos.app.simplehash.products.View.prototype.products = null;

  /**
    @inheritDoc
  */


  este.demos.app.simplehash.products.View.prototype.load = function(params) {
    var result,
      _this = this;
    result = new goog.result.SimpleResult;
    setTimeout(function() {
      var _ref;
      if ((_ref = _this.products) == null) {
        _this.products = new este.demos.app.simplehash.products.Collection([
          {
            name: 'Magic box',
            description: 'Something wonderful...'
          }, {
            name: 'Blue table',
            description: 'Just a table.'
          }, {
            name: 'Red light',
            description: 'You know it from district.'
          }
        ]);
      }
      return result.setValue(true);
    }, 1000);
    return result;
  };

  /**
    @inheritDoc
  */


  este.demos.app.simplehash.products.View.prototype.enterDocument = function() {
    este.demos.app.simplehash.products.View.superClass_.enterDocument.apply(this, arguments);
    this.update();
  };

  /**
    @inheritDoc
  */


  este.demos.app.simplehash.products.View.prototype.update = function() {
    var links, product, url, _i, _len, _ref;
    window['console']['log']("products rendered");
    links = [];
    _ref = this.products.toJson();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      product = _ref[_i];
      url = this.getUrl(este.demos.app.simplehash.product.View, {
        id: product['clientId']
      });
      links.push("<li><a href='" + url + "'>" + url + "</a>");
    }
    this.getElement().innerHTML = "<p>products</p>\n<ul>\n  " + (links.join('')) + "\n</ul>";
  };

  
