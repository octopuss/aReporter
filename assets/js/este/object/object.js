// Generated by CoffeeScript 1.4.0
/**
  @fileoverview Object utils.
*/

goog.provide('este.object');

goog.require('goog.object');

/**
  If value is array with length == 1, replace array with array[0].
  @param {Object} object
  @return {Object}
*/


este.object.normalizeOneItemArrayValues = function(object) {
  var key, normalized, value;
  normalized = {};
  for (key in object) {
    value = object[key];
    if (goog.isArray(value) && value.length === 1) {
      normalized[key] = value[0];
      continue;
    }
    normalized[key] = value;
  }
  return normalized;
};