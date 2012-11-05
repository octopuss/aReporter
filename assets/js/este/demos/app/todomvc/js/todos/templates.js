// This file was automatically generated from templates.soy.
// Please don't edit this file by hand.

goog.provide('este.demos.app.todomvc.todos.templates');

goog.require('soy');


/**
 * @param {Object.<string, *>=} opt_data
 * @return {string}
 * @notypecheck
 */
este.demos.app.todomvc.todos.templates.element = function(opt_data) {
  return este.demos.app.todomvc.todos.templates.header(opt_data) + ((opt_data.todosLength) ? este.demos.app.todomvc.todos.templates.main(opt_data) + este.demos.app.todomvc.todos.templates.footer(opt_data) : '');
};


/**
 * @param {Object.<string, *>=} opt_data
 * @return {string}
 * @notypecheck
 */
este.demos.app.todomvc.todos.templates.header = function(opt_data) {
  return '<header id="header"><h1>todos</h1><form id="new-todo-form"><input name="title" id="new-todo" placeholder="What needs to be done?" autofocus></form></header>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @return {string}
 * @notypecheck
 */
este.demos.app.todomvc.todos.templates.main = function(opt_data) {
  var output = '<section id="main"><input ' + ((opt_data.remainingCount == 0) ? 'checked' : '') + ' id="toggle-all" type="checkbox"><label for="toggle-all">Mark all as complete</label><ul id="todo-list">';
  var todoList104 = opt_data.todos;
  var todoListLen104 = todoList104.length;
  for (var todoIndex104 = 0; todoIndex104 < todoListLen104; todoIndex104++) {
    var todoData104 = todoList104[todoIndex104];
    output += este.demos.app.todomvc.todos.templates.todo(todoData104);
  }
  output += '</ul></section>';
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @return {string}
 * @notypecheck
 */
este.demos.app.todomvc.todos.templates.todo = function(opt_data) {
  return '<li class="' + ((opt_data.completed) ? 'completed' : '') + ' ' + ((opt_data.editing) ? 'editing' : '') + '" client-id="' + soy.$$escapeHtmlAttribute(opt_data.clientId) + '"><div class="view"><input ' + ((opt_data.completed) ? 'checked' : '') + ' class="toggle" type="checkbox"><label>' + soy.$$escapeHtml(opt_data.title) + '</label><button class="destroy"></button></div><input class="edit" value="' + soy.$$escapeHtmlAttribute(opt_data.title) + '"></li>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @return {string}
 * @notypecheck
 */
este.demos.app.todomvc.todos.templates.footer = function(opt_data) {
  return '<footer id="footer"><span id="todo-count"><strong>' + soy.$$escapeHtml(opt_data.remainingCount) + '</strong> ' + soy.$$escapeHtml(opt_data.itemsLocalized) + '</span><ul id="filters"><li><a class="' + ((opt_data.filter == 'all') ? 'selected' : '') + '" href="#/">All</a></li><li><a class="' + ((opt_data.filter == 'active') ? 'selected' : '') + '" href="#/active">Active</a></li><li><a class="' + ((opt_data.filter == 'completed') ? 'selected' : '') + '" href="#/completed">Completed</a></li></ul>' + ((opt_data.doneCount) ? '<button id="clear-completed">Clear completed (' + soy.$$escapeHtml(opt_data.doneCount) + ')</button>' : '') + '</footer>';
};
