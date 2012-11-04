// Coffe Class fixed for Closure Compiler by Este.js
// Generated by CoffeeScript 1.4.0
/**
  @fileoverview Locale utils
  @author jiri.kopsa(at)proactify.com (Jiří Kopsa)
*/

goog.provide('este.Locale');


  /**
    @param {string} thousandsSeparator
    @param {string} decimalsSeparator
    @param {number} defaultDecimals
    @param {string} currency
    @param {boolean} currencyBefore
    @constructor
  */

  este.Locale = function(thousandsSeparator, decimalsSeparator, defaultDecimals, currency, currencyBefore) {
    this.thousandsSeparator = thousandsSeparator;
    this.decimalsSeparator = decimalsSeparator;
    this.defaultDecimals = defaultDecimals;
    this.currency = currency;
    this.currencyBefore = currencyBefore;
  }

  /**
    Formats price
    @param {string|number} number
  */


  este.Locale.prototype.formatPrice = function(number) {
    if (this.currencyBefore) {
      return this.currency + this.number_format(number, this.defaultDecimals);
    } else {
      return this.number_format(number, this.defaultDecimals) + this.currency;
    }
  };

  /**
    Formats a number with grouped thousands
    Source: http://phpjs.org/functions/number_format:481
    @param {string|number} number
    @param {number} decimals
  */


  este.Locale.prototype.number_format = function(number, decimals) {
    var dec, n, prec, s, sep, toFixedFix;
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    n = !isFinite(+number) ? 0 : +number;
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    sep = typeof this.thousandsSeparator === 'undefined' ? ',' : this.thousandsSeparator;
    dec = typeof this.decimalsSeparator === 'undefined' ? '.' : this.decimalsSeparator;
    s = '';
    toFixedFix = function(n, prec) {
      var k;
      k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  };

  