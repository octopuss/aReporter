// Coffe Class fixed for Closure Compiler by Este.js
// Generated by CoffeeScript 1.4.0
/**
  @fileoverview URI utils.
*/

goog.provide('este.uri.utils');

goog.require('goog.uri.utils');

/**
  Returns s3j7lgxd4ruz3s3j7lgxd4ruz from the URL - i.e. excludes protocol, host, port and fragment
  @param {string} uri
*/


este.uri.utils.getPathAndQuery = function(uri) {
  var pieces;
  pieces = goog.uri.utils.split(uri);
  return goog.uri.utils.buildFromEncodedParts(null, null, null, null, pieces[goog.uri.utils.ComponentIndex.PATH], pieces[goog.uri.utils.ComponentIndex.QUERY_DATA]);
};
