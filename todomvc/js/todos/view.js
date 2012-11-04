// Coffe Class fixed for Closure Compiler by Este.js
// Generated by CoffeeScript 1.4.0
/**
  @fileoverview este.demos.app.todomvc.todos.View.
*/



goog.provide('este.demos.app.todomvc.todos.View');

goog.require('este.app.View');

goog.require('este.demos.app.todomvc.todos.Collection');

goog.require('este.demos.app.todomvc.todos.templates');



  

  /**
    @constructor
    @extends {este.app.View}
  */


  este.demos.app.todomvc.todos.View = function() {
    este.demos.app.todomvc.todos.View.superClass_.constructor.call(this);
  }

  goog.inherits(este.demos.app.todomvc.todos.View, este.app.View);

  /**
    undefined, active, completed
    @inheritDoc
  */


  este.demos.app.todomvc.todos.View.prototype.url = '/:filter?';

  /**
    @type {este.demos.app.todomvc.todos.Collection}
    @protected
  */


  este.demos.app.todomvc.todos.View.prototype.todos = null;

  /**
    todo: consider enum
    @type {string}
    @protected
  */


  este.demos.app.todomvc.todos.View.prototype.filter = '';

  /**
    Each view is async loaded by default. Load method has to return object
    implementing goog.result.Result interface. It's better than plain old
    callbacks. todo: link to article
    @inheritDoc
  */


  este.demos.app.todomvc.todos.View.prototype.load = function(params) {
    this.filter = params['filter'];
    if (!this.todos) {
      this.todos = new este.demos.app.todomvc.todos.Collection;
      return this.localStorage.query(this.todos);
    }
    return este.demos.app.todomvc.todos.View.superClass_.load.call(this);
  };

  /**
    @inheritDoc
  */


  este.demos.app.todomvc.todos.View.prototype.enterDocument = function() {
    este.demos.app.todomvc.todos.View.superClass_.enterDocument.call(this);
    this.update();
    this.on(this.todos, 'update', this.onTodosUpdate);
    this.on('#new-todo-form', 'submit', this.onNewTodoSubmit);
    this.on('.toggle', 'tap', this.onToggleTap);
    this.on('#toggle-all', 'tap', this.onToggleAllTap);
    this.on('.destroy', 'tap', this.onDestroyTap);
    this.on('#clear-completed', 'tap', this.onClearCompletedTap);
    this.on('label', 'dblclick', this.onLabelDblclick);
    this.on('.edit', 'blur', this.onEditEnd);
    return this.on('.edit', goog.events.KeyCodes.ENTER, this.onEditEnd);
  };

  /**
    @param {este.Model.Event} e
    @protected
  */


  este.demos.app.todomvc.todos.View.prototype.onTodosUpdate = function(e) {
    this.defer(this.update);
    return this.localStorage.saveChanges(e);
  };

  /**
    @protected
  */


  este.demos.app.todomvc.todos.View.prototype.onNewTodoSubmit = function(e) {
    var errors, todo;
    todo = new este.demos.app.todomvc.todo.Model(e.json);
    errors = todo.validate();
    if (errors) {
      return;
    }
    e.target.elements['title'].value = '';
    return this.todos.add(todo);
  };

  /**
    @protected
  */


  este.demos.app.todomvc.todos.View.prototype.onToggleTap = function(e) {
    return e.model.toggleCompleted();
  };

  /**
    @protected
  */


  este.demos.app.todomvc.todos.View.prototype.onToggleAllTap = function(e) {
    var allCompleted;
    allCompleted = !this.todos.filter({
      'completed': false
    }).length;
    return this.todos.toggleCompleted(!allCompleted);
  };

  /**
    @protected
  */


  este.demos.app.todomvc.todos.View.prototype.onDestroyTap = function(e) {
    return this.todos.remove(e.model);
  };

  /**
    @protected
  */


  este.demos.app.todomvc.todos.View.prototype.onClearCompletedTap = function(e) {
    return this.todos.clearCompleted();
  };

  /**
    @protected
  */


  este.demos.app.todomvc.todos.View.prototype.onLabelDblclick = function(e) {
    var edit;
    e.model.set('editing', true);
    edit = e.modelElement.querySelector('.edit');
    return este.dom.focus(edit);
  };

  /**
    @protected
  */


  este.demos.app.todomvc.todos.View.prototype.onEditEnd = function(e) {
    var title;
    if (!e.modelElement) {
      return;
    }
    title = goog.string.trim(e.modelElement.querySelector('.edit').value);
    if (!title) {
      this.todos.remove(e.model);
      return;
    }
    e.model.set({
      'title': title,
      'editing': false
    });
  };

  /**
    @protected
  */


  este.demos.app.todomvc.todos.View.prototype.update = function() {
    var filter, filterObject, html, isCompleted, json, remainingCount, todos, todosLength;
    remainingCount = this.todos.filter({
      'completed': false
    }).length;
    todosLength = this.todos.getLength();
    filterObject = {};
    if (this.filter) {
      isCompleted = this.filter === 'completed';
      filterObject['completed'] = isCompleted;
      filter = isCompleted ? 'completed' : 'active';
    } else {
      filter = 'all';
    }
    todos = this.todos.filter(filterObject);
    json = {
      doneCount: todosLength - remainingCount,
      filter: filter,
      itemsLocalized: this.getLocalizedItems(remainingCount),
      remainingCount: remainingCount,
      todos: todos,
      todosLength: todosLength
    };
    html = este.demos.app.todomvc.todos.templates.element(json);
    return this.mergeHtml(html);
  };

  /**
    @param {number} remainingCount
    @return {string}
    @protected
  */


  este.demos.app.todomvc.todos.View.prototype.getLocalizedItems = function(remainingCount) {
    switch (goog.i18n.pluralRules.select(remainingCount)) {
      case goog.i18n.pluralRules.Keyword.ONE:
        return 'item left';
      default:
        return 'items left';
    }
  };

  
