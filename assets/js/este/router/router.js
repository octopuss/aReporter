// Coffe Class fixed for Closure Compiler by Este.js
// Generated by CoffeeScript 1.4.0
/**
  @fileoverview este.Router.
  @see ../demos/router.html

  Navigation element is any element with s3j7lgxd4ruz1s3j7lgxd4ruz attribute. Not only anchor, but
  li or tr too. Of course only <a href=s3j7lgxd4ruz2s3j7lgxd4ruzs are crawable with search engines.
  But if we are creating pure client side rendered web app, we can use s3j7lgxd4ruz3s3j7lgxd4ruz
  attribute on any element we need. We can even nest anchors, which is useful
  for touch devices.
*/



goog.provide('este.Router');

goog.require('este.array');

goog.require('este.Base');

goog.require('este.router.Route');

goog.require('este.string');

goog.require('goog.dom');



  

  /**
    @param {este.History} history
    @param {este.events.TapHandler} tapHandler
    @constructor
    @extends {este.Base}
  */


  este.Router = function(history, tapHandler) {
    this.history = history;
    this.tapHandler = tapHandler;
    este.Router.superClass_.constructor.apply(this, arguments);
    this.routes = [];
  }

  goog.inherits(este.Router, este.Base);

  /**
    If true, tapHandler will not change url.
    todo: add demo for such case
    @type {boolean}
  */


  este.Router.prototype.silentTapHandler = false;

  /**
    @type {este.History}
    @protected
  */


  este.Router.prototype.history = null;

  /**
    @type {este.events.TapHandler}
    @protected
  */


  este.Router.prototype.tapHandler = null;

  /**
    @type {Array.<este.router.Route>}
    @protected
  */


  este.Router.prototype.routes = null;

  /**
    @type {boolean}
    @protected
  */


  este.Router.prototype.ignoreNextOnHistoryNavigate = false;

  /**
    @param {string} path
    @param {Function} show
    @param {este.router.Route.Options=} options
    @return {este.Router}
  */


  este.Router.prototype.add = function(path, show, options) {
    var route;
    if (options == null) {
      options = {};
    }
    path = este.string.stripSlashHashPrefixes(path);
    route = new este.router.Route(path, show, options);
    this.routes.push(route);
    return this;
  };

  /**
    @param {string} path
    @return {boolean}
  */


  este.Router.prototype.remove = function(path) {
    path = este.string.stripSlashHashPrefixes(path);
    return este.array.removeAllIf(this.routes, function(item) {
      return item.path === path;
    });
  };

  /**
    @param {string} path
    @param {Object=} params
    @param {boolean=} silent
  */


  este.Router.prototype.pathNavigate = function(path, params, silent) {
    var route;
    if (silent == null) {
      silent = false;
    }
    path = este.string.stripSlashHashPrefixes(path);
    route = this.findRoute(path);
    if (!route) {
      return;
    }
    this.ignoreNextOnHistoryNavigate = silent;
    return this.navigate(route.getUrl(params));
  };

  /**
    @param {string} path
    @protected
  */


  este.Router.prototype.findRoute = function(path) {
    path = este.string.stripSlashHashPrefixes(path);
    return goog.array.find(this.routes, function(item) {
      return item.path === path;
    });
  };

  /**
    @param {string} token
  */


  este.Router.prototype.navigate = function(token) {
    token = este.string.stripSlashHashPrefixes(token);
    return this.history.setToken(token);
  };

  /**
    @return {boolean}
  */


  este.Router.prototype.isHtml5historyEnabled = function() {
    return this.history.html5historyEnabled;
  };

  /**
    Start router.
  */


  este.Router.prototype.start = function() {
    this.on(this.tapHandler.getElement(), 'click', this.onTapHandlerElementClick);
    this.on(this.tapHandler, 'tap', this.onTapHandlerTap);
    this.on(this.history, 'navigate', this.onHistoryNavigate);
    this.history.setEnabled(true);
  };

  /**
    todo: ignore unmatched tokens
    @param {goog.events.BrowserEvent} e
    @protected
  */


  este.Router.prototype.onTapHandlerElementClick = function(e) {
    var token;
    token = this.tryGetToken(e.target);
    if (!token) {
      return;
    }
    return e.preventDefault();
  };

  /**
    @param {goog.events.BrowserEvent} e
    @protected
  */


  este.Router.prototype.onTapHandlerTap = function(e) {
    var token;
    token = this.tryGetToken(e.target);
    if (!token) {
      return;
    }
    if (this.silentTapHandler) {
      this.processRoutes(token, false);
      return;
    }
    return this.history.setToken(token);
  };

  /**
    @param {goog.history.Event} e
    @protected
  */


  este.Router.prototype.onHistoryNavigate = function(e) {
    if (this.ignoreNextOnHistoryNavigate) {
      this.ignoreNextOnHistoryNavigate = false;
      return;
    }
    return this.processRoutes(e.token, e.isNavigation);
  };

  /**
    @param {Node} target
    @return {string}
    @protected
  */


  este.Router.prototype.tryGetToken = function(target) {
    var token;
    token = '';
    goog.dom.getAncestor(target, function(node) {
      if (node.nodeType !== 1) {
        return false;
      }
      token = este.string.stripSlashHashPrefixes(node.getAttribute('href'));
      return !!token;
    }, true);
    return token;
  };

  /**
    @param {string} token
    @param {boolean} isNavigation
    @protected
  */


  este.Router.prototype.processRoutes = function(token, isNavigation) {
    var firstRouteMatched, matched, route, _i, _len, _ref;
    token = este.string.stripSlashHashPrefixes(token);
    firstRouteMatched = false;
    _ref = this.routes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      route = _ref[_i];
      try {
        matched = route.process(token, isNavigation, firstRouteMatched);
        if (matched) {
          firstRouteMatched = true;
        }
      } finally {
        continue;
      }
    }
  };

  /**
    @inheritDoc
  */


  este.Router.prototype.disposeInternal = function() {
    this.history.dispose();
    this.tapHandler.dispose();
    este.Router.superClass_.disposeInternal.apply(this, arguments);
  };

  
