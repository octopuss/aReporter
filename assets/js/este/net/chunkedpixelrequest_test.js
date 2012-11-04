// Generated by CoffeeScript 1.4.0

suite('este.net.ChunkedPixelRequest', function() {
  var ChunkedPixelRequest, arrange, randomStringFactory, request, srcCallback, uri;
  ChunkedPixelRequest = este.net.ChunkedPixelRequest;
  uri = null;
  randomStringFactory = null;
  srcCallback = null;
  request = null;
  setup(function() {
    uri = 'fok.com';
    randomStringFactory = function() {
      return 'random';
    };
    return srcCallback = function(src) {};
  });
  arrange = function() {
    return request = new ChunkedPixelRequest(uri, randomStringFactory, srcCallback);
  };
  suite('send one request', function() {
    return test('should work', function(done) {
      srcCallback = function(src) {
        assert.equal(src, 'fok.com?' + encodeURIComponent('{"u":"random","d":"{\\"a\\":\\"1\\"}","i":0,"t":1}'));
        assert.equal(src, 'fok.com?%7B%22u%22%3A%22random%22%2C%22d%22%3A%22%7B%5C%22a%5C%22%3A%5C%221%5C%22%7D%22%2C%22i%22%3A0%2C%22t%22%3A1%7D');
        return done();
      };
      arrange();
      return request.send({
        a: '1'
      });
    });
  });
  return suite('send two request', function() {
    return test('should work', function(done) {
      var count;
      count = 0;
      srcCallback = function(src) {
        count++;
        switch (count) {
          case 1:
            return assert.equal(src, 'fok.com?' + encodeURIComponent('{"u":"random","d":"{\\"a\\":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null","i":0,"t":2}'));
          case 2:
            assert.equal(src, 'fok.com?' + encodeURIComponent('{"u":"random","d":",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]}","i":1,"t":2}'));
            return done();
        }
      };
      arrange();
      return request.send({
        a: new Array(700)
      });
    });
  });
});
