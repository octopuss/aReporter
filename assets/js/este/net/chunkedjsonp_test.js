// Generated by CoffeeScript 1.4.0

suite('este.net.ChunkedJsonp', function() {
  var ChunkedJsonp, arrange, randomStringFactory;
  ChunkedJsonp = este.net.ChunkedJsonp;
  randomStringFactory = null;
  setup(function() {
    return randomStringFactory = function() {
      return 'random';
    };
  });
  arrange = function(jsonpFactory, payload, replyCallback) {
    var chunkedJsonp;
    chunkedJsonp = new ChunkedJsonp(jsonpFactory, randomStringFactory);
    return chunkedJsonp.send(payload, replyCallback);
  };
  return suite('send small payload', function() {
    test('should send one request on jsonpFactory', function(done) {
      var jsonpFactory, payload;
      jsonpFactory = function() {
        return {
          send: function(payload, replyCallback) {
            assert.equal(payload.u, 'random');
            assert.equal(payload.d, '{"a":"1"}');
            assert.equal(payload.i, 0);
            assert.equal(payload.t, 1);
            return replyCallback('reply');
          }
        };
      };
      payload = {
        a: '1'
      };
      return arrange(jsonpFactory, payload, function(response) {
        assert.equal(response, 'reply');
        return done();
      });
    });
    return test('should send two requests on jsonpFactory', function(done) {
      var count, jsonpFactory, payload;
      count = 0;
      randomStringFactory = function() {
        return count;
      };
      jsonpFactory = function() {
        return {
          send: function(payload, replyCallback) {
            switch (count) {
              case 0:
                assert.equal(payload.u, 0);
                assert.lengthOf(payload.d, 1900);
                assert.equal(payload.i, 0);
                replyCallback();
                break;
              case 1:
                assert.equal(payload.u, 0);
                assert.lengthOf(payload.d, 1609);
                assert.equal(payload.i, 1);
                assert.equal(payload.t, 2);
                replyCallback('reply');
            }
            return count++;
          }
        };
      };
      payload = {
        foo: new Array(700)
      };
      return arrange(jsonpFactory, payload, function(response) {
        assert.equal(response, 'reply');
        return done();
      });
    });
  });
});
