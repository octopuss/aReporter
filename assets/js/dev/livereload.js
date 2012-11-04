// Generated by CoffeeScript 1.4.0
/**
  @fileoverview Live reload. Your browsers don't need a refresh button anymore.
*/

(function() {
  var parser, ws;
  if (!window.WebSocket) {
    return;
  }
  parser = document.createElement('a');
  parser.href = window.location;
  ws = new WebSocket("ws://" + parser.hostname + ":" + parser.port + "/");
  return ws.onmessage = function(e) {
    var link, _i, _len, _ref;
    switch (e.data) {
      case 'page':
        window.location.reload(true);
        break;
      case 'styles':
        _ref = document.getElementsByTagName('link');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          link = _ref[_i];
          link.href = link.href;
        }
    }
  };
})();