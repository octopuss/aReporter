// Coffe Class fixed for Closure Compiler by Este.js
// Generated by CoffeeScript 1.4.0
/**
  @fileoverview Non destructive innerHTML update. Preserve form fields states,
  prevents images flickering, changes only changed nodes.
  EXPERIMENTAL

  How does it work
    element is clonned (without content)
    clone.innerHTML = html
    element and clone are normalized
    then clone is merged with element, see mergeInternal
    only changed elements are touched

  este.dom.merge el, efn47v2hm63h1efn47v2hm63h

  todo
    tests (manually in IE and Gecko)
    better algorithm for temporally injected nodes via siblings checks
    consider outerHTML optimalization

  scenarios for end2end tests
    merge.html demo (form state is preserved)
    todomvc demo (exact behaviour)
  @see ../demos/merge.html
*/

goog.provide('este.dom.merge');

goog.provide('este.dom.Merge');

goog.require('este.dom');

goog.require('este.json');

goog.require('goog.array');

/**
  @param {Element} element
  @param {string} html
*/


este.dom.merge = function(element, html) {
  var merge;
  merge = new este.dom.Merge(element, html);
  merge.merge();
};


  /**
    @param {Element} element
    @param {string} html
    @constructor
  */

  este.dom.Merge = function(element, html) {
    this.element = element;
    this.html = html;
  }

  /**
    @type {Element}
    @protected
  */


  este.dom.Merge.prototype.element = null;

  /**
    @type {string}
    @protected
  */


  este.dom.Merge.prototype.html = '';

  /**
    Merge html into element.
  */


  este.dom.Merge.prototype.merge = function() {
    var clone;
    clone = this.element.cloneNode(false);
    clone.innerHTML = this.html;
    clone.normalize();
    this.element.normalize();
    return this.mergeInternal(this.element, clone);
  };

  /**
    @param {Element} to
    @param {Element} from
    @protected
  */


  este.dom.Merge.prototype.mergeInternal = function(to, from) {
    var fromNode, fromNodes, howMany, i, node, toNode, toNodes, _i, _j, _len, _len1, _ref;
    toNodes = goog.array.toArray(to.childNodes);
    fromNodes = goog.array.toArray(from.childNodes);
    if (toNodes.length > fromNodes.length) {
      howMany = toNodes.length - fromNodes.length;
      _ref = toNodes.splice(fromNodes.length, howMany);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        goog.dom.removeNode(node);
      }
    }
    for (i = _j = 0, _len1 = fromNodes.length; _j < _len1; i = ++_j) {
      fromNode = fromNodes[i];
      toNode = toNodes[i];
      if (!toNode) {
        to.appendChild(fromNode);
        continue;
      }
      if (toNode.nodeType === 3 && fromNode.nodeType === 3) {
        toNode.data = fromNode.data;
        continue;
      }
      if (toNode.tagName !== fromNode.tagName) {
        toNode.parentNode.replaceChild(fromNode, toNode);
        continue;
      }
      this.mergeAttributes(toNode, fromNode);
      this.mergeInternal(toNode, fromNode);
    }
  };

  /**
    @param {Element} toNode
    @param {Element} fromNode
    @protected
  */


  este.dom.Merge.prototype.mergeAttributes = function(toNode, fromNode) {
    var attr, valueLessFieldProp, valueLessFieldValue, valueLessFields, _i, _j, _len, _len1, _ref, _ref1;
    valueLessFields = {
      'INPUT': 'checked',
      'OPTION': 'selected'
    };
    valueLessFieldProp = valueLessFields[fromNode.tagName];
    valueLessFieldValue = fromNode.hasAttribute(valueLessFieldProp);
    if (toNode.hasAttributes()) {
      _ref = goog.array.toArray(toNode.attributes);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attr = _ref[_i];
        if (fromNode.hasAttribute(attr.name)) {
          continue;
        }
        toNode.removeAttribute(attr.name);
      }
    }
    if (fromNode.hasAttributes()) {
      _ref1 = goog.array.toArray(fromNode.attributes);
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        attr = _ref1[_j];
        if (attr.name === 'value') {
          if (toNode[attr.name] === attr.value) {
            continue;
          }
          toNode[attr.name] = attr.value;
        } else {
          if (toNode.getAttribute(attr.name) === attr.value) {
            continue;
          }
          toNode.setAttribute(attr.name, attr.value);
        }
      }
    }
    if (valueLessFieldProp) {
      toNode[valueLessFieldProp] = valueLessFieldValue;
    }
  };

  