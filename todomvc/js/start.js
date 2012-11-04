// Generated by CoffeeScript 1.4.0
/**
  @fileoverview este.demos.app.todomvc.start.
*/

goog.provide('este.demos.app.todomvc.start');

goog.require('este.app.create');

goog.require('este.demos.app.todomvc.todos.View');

goog.require('este.dev.Monitor.create');

/**
  @param {Object} data JSON from server
*/


este.demos.app.todomvc.start = function(data) {
  var app, forceHash;
  if (goog.DEBUG) {
    este.dev.Monitor.create();
  }
  forceHash = true;
  app = este.app.create('todoapp', [este.demos.app.todomvc.todos.View], forceHash);
  app.localStorageNamespace = 'todos-este';
  return app.start();
};

goog.exportSymbol('este.demos.app.todomvc.start', este.demos.app.todomvc.start);