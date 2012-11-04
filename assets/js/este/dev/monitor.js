// Coffe Class fixed for Closure Compiler by Este.js
// Generated by CoffeeScript 1.4.0
/**
  @fileoverview Dev monitor. Small console output at right bottom of screen.
  Useful for mobile development. It also shows total count of registered
  listeners. It's useful to see it and be sure, that app does not leak.
  ex.
    mlog efn47v2hm63h1efn47v2hm63h
*/



goog.provide('este.dev.Monitor');

goog.provide('este.dev.Monitor.create');

goog.require('goog.ui.Component');



  

  /**
    @constructor
    @extends {goog.ui.Component}
  */


  este.dev.Monitor = function() {
    este.dev.Monitor.superClass_.constructor.apply(this, arguments);
  }

  goog.inherits(este.dev.Monitor, goog.ui.Component);

  /**
    @return {este.dev.Monitor}
  */


  este.dev.Monitor.create = function() {
    var monitor;
    monitor = new este.dev.Monitor;
    monitor.decorate(document.body);
    return monitor;
  };

  /**
    @type {Element}
  */


  este.dev.Monitor.prototype.monitor = null;

  /**
    @type {Node}
  */


  este.dev.Monitor.prototype.left = null;

  /**
    @type {Node}
  */


  este.dev.Monitor.prototype.right = null;

  /**
    @type {?number}
  */


  este.dev.Monitor.prototype.timer = null;

  /**
    @inheritDoc
  */


  este.dev.Monitor.prototype.decorateInternal = function(element) {
    var _this = this;
    este.dev.Monitor.superClass_.decorateInternal.call(this, element);
    this.monitor = this.dom_.createDom('div', {
      'style': 'white-space: nowrap; font-size: 10px; position: absolute; z-index: 9999999999999; opacity: .8; max-width: 100%; right: 10px; bottom: 0; background-color: #eee; color: #000; padding: .7em;'
    });
    this.left = this.monitor.appendChild(this.dom_.createDom('div', {
      'style': 'word-break: break-word; display: inline-block',
      'id': 'devlog'
    }));
    this.right = this.monitor.appendChild(this.dom_.createDom('div', {
      'style': 'display: inline-block'
    }));
    element.appendChild(this.monitor);
    this.timer = setInterval(function() {
      return _this.right.innerHTML = '| ' + (goog.events.getTotalListenerCount() - 1);
    }, 500);
  };

  /**
    @inheritDoc
  */


  este.dev.Monitor.prototype.enterDocument = function() {
    este.dev.Monitor.superClass_.enterDocument.call(this);
    this.getHandler().listen(window, 'scroll', this.onWindowScroll);
  };

  /**
    @protected
  */


  este.dev.Monitor.prototype.onWindowScroll = function(e) {
    var bottom;
    bottom = -this.dom_.getDocumentScroll().y;
    return this.monitor.style.bottom = (bottom + 10) + 'px';
  };

  /**
    @inheritDoc
  */


  este.dev.Monitor.prototype.disposeInternal = function() {
    clearInterval(this.timer);
    this.getElement().removeChild(this.monitor);
    este.dev.Monitor.superClass_.disposeInternal.call(this);
  };

  