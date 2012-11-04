// Coffe Class fixed for Closure Compiler by Este.js
// Generated by CoffeeScript 1.4.0
/**
	@fileoverview este.ui.resizer.Handles'
*/



goog.provide('este.ui.resizer.Handles');

goog.provide('este.ui.resizer.Handles.create');

goog.require('goog.ui.Component');

goog.require('goog.fx.Dragger');

goog.require('goog.math.Coordinate');

goog.require('este.ui.InvisibleOverlay.create');



  

  /**
  		@param {Function} draggerFactory
  		@param {Function} invisibleOverlayFactory
  		@constructor
  		@extends {goog.ui.Component}
  */


  este.ui.resizer.Handles = function(draggerFactory, invisibleOverlayFactory) {
    this.draggerFactory = draggerFactory;
    this.invisibleOverlayFactory = invisibleOverlayFactory;
  }

  goog.inherits(este.ui.resizer.Handles, goog.ui.Component);

  /**
  		@return {este.ui.resizer.Handles}
  */


  este.ui.resizer.Handles.create = function() {
    var draggerFactory;
    draggerFactory = function() {
      var dragger;
      dragger = new goog.fx.Dragger(document.createElement('div'));
      return dragger;
    };
    return new este.ui.resizer.Handles(draggerFactory, este.ui.InvisibleOverlay.create);
  };

  /**
  		@enum {string}
  */


  este.ui.resizer.Handles.EventType = {
    MOUSEOUT: 'mouseout',
    START: 'start',
    DRAG: 'drag',
    END: 'end'
  };

  /**
  		@type {Element}
  */


  este.ui.resizer.Handles.prototype.vertical = null;

  /**
  		@type {Element}
  */


  este.ui.resizer.Handles.prototype.horizontal = null;

  /**
  		@type {Element}
  */


  este.ui.resizer.Handles.prototype.activeHandle = null;

  /**
  		@type {Function}
  */


  este.ui.resizer.Handles.prototype.draggerFactory = null;

  /**
  		@type {Function}
  */


  este.ui.resizer.Handles.prototype.invisibleOverlayFactory = null;

  /**
  		@type {goog.fx.Dragger}
  */


  este.ui.resizer.Handles.prototype.dragger = null;

  /**
  		@type {goog.math.Coordinate}
  */


  este.ui.resizer.Handles.prototype.dragMouseStart = null;

  /**
  		@type {este.ui.InvisibleOverlay}
  */


  este.ui.resizer.Handles.prototype.invisibleOverlay = null;

  /**
  		@inheritDoc
  */


  este.ui.resizer.Handles.prototype.decorateInternal = function(element) {
    este.ui.resizer.Handles.superClass_.decorateInternal.call(this, element);
    this.createHandles();
    this.update();
  };

  /**
  		@protected
  */


  este.ui.resizer.Handles.prototype.createHandles = function() {
    var parent;
    this.vertical = this.dom_.createDom('div', 'e-resizer-handle-vertical');
    this.horizontal = this.dom_.createDom('div', 'e-resizer-handle-horizontal');
    parent = this.getElement().offsetParent || this.getElement();
    parent.appendChild(this.vertical);
    return parent.appendChild(this.horizontal);
  };

  /**
  		Update handles bounds.
  		@protected
  */


  este.ui.resizer.Handles.prototype.update = function() {
    var el, left, top;
    el = this.getElement();
    left = el.offsetLeft;
    top = el.offsetTop;
    goog.style.setPosition(this.horizontal, left, top + el.offsetHeight);
    goog.style.setWidth(this.horizontal, el.offsetWidth);
    goog.style.setPosition(this.vertical, left + el.offsetWidth, top);
    return goog.style.setHeight(this.vertical, el.offsetHeight);
  };

  /**
  		@inheritDoc
  */


  este.ui.resizer.Handles.prototype.enterDocument = function() {
    este.ui.resizer.Handles.superClass_.enterDocument.call(this);
    this.getHandler().listen(this.horizontal, 'mousedown', this.onHorizontalMouseDown).listen(this.vertical, 'mousedown', this.onVerticalMouseDown).listen(this.horizontal, 'mouseout', this.onMouseOut).listen(this.vertical, 'mouseout', this.onMouseOut);
  };

  /**
  		@param {goog.events.BrowserEvent} e
  		@protected
  */


  este.ui.resizer.Handles.prototype.onHorizontalMouseDown = function(e) {
    this.activeHandle = this.horizontal;
    return this.startDrag(e);
  };

  /**
  		@param {goog.events.BrowserEvent} e
  		@protected
  */


  este.ui.resizer.Handles.prototype.onVerticalMouseDown = function(e) {
    this.activeHandle = this.vertical;
    return this.startDrag(e);
  };

  /**
  		@param {goog.events.BrowserEvent} e
  		@protected
  */


  este.ui.resizer.Handles.prototype.onMouseOut = function(e) {
    return this.dispatchEvent(e);
  };

  /**
  		@param {goog.events.BrowserEvent} e
  		@protected
  */


  este.ui.resizer.Handles.prototype.startDrag = function(e) {
    this.dragger = this.draggerFactory();
    this.getHandler().listen(this.dragger, 'start', this.onDragStart).listen(this.dragger, 'drag', this.onDrag).listen(this.dragger, 'end', this.onDragEnd);
    return this.dragger.startDrag(e);
  };

  /**
  		@param {goog.fx.DragEvent} e
  		@protected
  */


  este.ui.resizer.Handles.prototype.onDragStart = function(e) {
    this.invisibleOverlay = this.invisibleOverlayFactory();
    this.addChild(this.invisibleOverlay, false);
    this.invisibleOverlay.render(this.dom_.getDocument().body);
    this.invisibleOverlay.getElement().style.cursor = goog.style.getComputedCursor(this.activeHandle);
    this.dragMouseStart = new goog.math.Coordinate(e.clientX, e.clientY);
    return this.dispatchEvent({
      element: this.getElement(),
      vertical: this.activeHandle === this.vertical,
      type: este.ui.resizer.Handles.EventType.START
    });
  };

  /**
  		@param {goog.fx.DragEvent} e
  		@protected
  */


  este.ui.resizer.Handles.prototype.onDrag = function(e) {
    var difference, mouseCoord;
    mouseCoord = new goog.math.Coordinate(e.clientX, e.clientY);
    var dragMouseStart = /** @type {!goog.math.Coordinate} */ (this.dragMouseStart);

    difference = goog.math.Coordinate.difference(mouseCoord, dragMouseStart);
    this.dispatchEvent({
      element: this.getElement(),
      vertical: this.activeHandle === this.vertical,
      type: este.ui.resizer.Handles.EventType.DRAG,
      width: difference.x,
      height: difference.y
    });
    return this.update();
  };

  /**
  		@param {goog.fx.DragEvent} e
  		@protected
  */


  este.ui.resizer.Handles.prototype.onDragEnd = function(e) {
    this.removeChild(this.invisibleOverlay, true);
    this.dragger.dispose();
    return this.dispatchEvent({
      element: this.getElement(),
      type: este.ui.resizer.Handles.EventType.END,
      close: this.shouldClose(e)
    });
  };

  /**
  		@param {goog.fx.DragEvent} e
  		@return {boolean}
  		@protected
  */


  este.ui.resizer.Handles.prototype.shouldClose = function(e) {
    var el;
    el = this.dom_.getDocument().elementFromPoint(e.clientX, e.clientY);
    return !(el === this.horizontal || el === this.vertical);
  };

  /**
  		@param {Node} element
  */


  este.ui.resizer.Handles.prototype.isHandle = function(element) {
    return element === this.vertical || element === this.horizontal;
  };

  /**
  		@inheritDoc
  */


  este.ui.resizer.Handles.prototype.disposeInternal = function() {
    this.dom_.removeNode(this.horizontal);
    this.dom_.removeNode(this.vertical);
    if (this.dragger) {
      this.dragger.dispose();
    }
    este.ui.resizer.Handles.superClass_.disposeInternal.call(this);
  };

  
