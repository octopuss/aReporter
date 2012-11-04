// Generated by CoffeeScript 1.4.0

suite('este.string', function() {
  var string;
  string = este.string;
  suite('subs', function() {
    test('should replace array', function() {
      var str;
      str = string.subs('foo{0}.. {1}', [1, 2]);
      return assert.equal(str, 'foo1.. 2');
    });
    return test('should replace object', function() {
      var str;
      str = string.subs('foo{foo}, {bla}', {
        foo: 1,
        bla: 2
      });
      return assert.equal(str, 'foo1, 2');
    });
  });
  suite('subsOrNull', function() {
    test('should replace array', function() {
      var str;
      str = string.subsOrNull('foo{0}.. {1}', [1, 2]);
      return assert.equal(str, 'foo1.. 2');
    });
    test('should replace array', function() {
      var str;
      str = string.subsOrNull('foo.. {prop}', {});
      return assert.isNull(str);
    });
    return test('should replace array', function() {
      var str;
      str = string.subsOrNull('foo.. {prop}', {
        prop: 'value'
      });
      return assert.equal(str, 'foo.. value');
    });
  });
  suite('chunk', function() {
    var arrange, chunked;
    chunked = null;
    arrange = function(str) {
      return chunked = string.chunk(str, 2);
    };
    test('should not chunk string less than 2', function() {
      arrange('f');
      assert.lengthOf(chunked, 1);
      return assert.equal(chunked[0], 'f');
    });
    test('should not chunk string equal than 2', function() {
      arrange('fo');
      assert.lengthOf(chunked, 1);
      return assert.equal(chunked[0], 'fo');
    });
    return test('should chunk string greater than 2', function() {
      arrange('foo');
      assert.lengthOf(chunked, 2);
      assert.equal(chunked[0], 'fo');
      return assert.equal(chunked[1], 'o');
    });
  });
  return suite('chunkToObject', function() {
    var arrange, chunked;
    chunked = null;
    arrange = function(str) {
      return chunked = string.chunkToObject(str, 2);
    };
    test('should not chunk string less than 2', function() {
      arrange('f');
      assert.lengthOf(chunked, 1);
      assert.equal(chunked[0].text, 'f');
      assert.equal(chunked[0].index, 0);
      return assert.equal(chunked[0].total, 1);
    });
    test('should not chunk string equal than 2', function() {
      arrange('fo');
      assert.lengthOf(chunked, 1);
      assert.equal(chunked[0].text, 'fo');
      assert.equal(chunked[0].index, 0);
      return assert.equal(chunked[0].total, 1);
    });
    return test('should chunk string greater than 2', function() {
      arrange('foo');
      assert.lengthOf(chunked, 2);
      assert.equal(chunked[0].text, 'fo');
      assert.equal(chunked[0].index, 0);
      assert.equal(chunked[0].total, 2);
      assert.equal(chunked[1].text, 'o');
      assert.equal(chunked[1].index, 1);
      return assert.equal(chunked[1].total, 2);
    });
  });
});