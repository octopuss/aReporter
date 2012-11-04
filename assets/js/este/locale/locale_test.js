// Generated by CoffeeScript 1.4.0

suite('este.Locale', function() {
  suite('instance test', function() {
    var locale;
    locale = new este.Locale(' ', ',', 2, ' Kč', false);
    test('locale.number_format', function() {
      var str;
      str = locale.number_format(123, 0);
      assert.equal('123', str);
      str = locale.number_format(123.456, 0);
      assert.equal('123', str);
      str = locale.number_format(123.456, 2);
      assert.equal('123,46', str);
      str = locale.number_format(98123.456, 2);
      return assert.equal('98 123,46', str);
    });
    return test('locale.formatPrice', function() {
      var str;
      str = locale.formatPrice(123, 0);
      assert.equal('123,00 Kč', str);
      str = locale.formatPrice(123.4, 0);
      assert.equal('123,40 Kč', str);
      str = locale.formatPrice(123.45, 0);
      return assert.equal('123,45 Kč', str);
    });
  });
  return suite('instance test', function() {
    var locale;
    locale = new este.Locale(',', '.', 2, '$', true);
    test('locale.number_format', function() {
      var str;
      str = locale.number_format(123, 0);
      assert.equal('123', str);
      str = locale.number_format(123.456, 0);
      assert.equal('123', str);
      str = locale.number_format(123.456, 2);
      assert.equal('123.46', str);
      str = locale.number_format(98123.456, 2);
      return assert.equal('98,123.46', str);
    });
    return test('locale.formatPrice', function() {
      var str;
      str = locale.formatPrice(123, 0);
      assert.equal('$123.00', str);
      str = locale.formatPrice(123.4, 0);
      assert.equal('$123.40', str);
      str = locale.formatPrice(123.45, 0);
      return assert.equal('$123.45', str);
    });
  });
});
