// Generated by CoffeeScript 1.4.0

suite('este.ui.Lightbox', function() {
  var Lightbox, element, fireHandlerClickEvent, fireViewCloseEvent, handler, lightbox, view, viewFactory;
  Lightbox = este.ui.Lightbox;
  handler = null;
  element = null;
  view = null;
  viewFactory = null;
  lightbox = null;
  fireHandlerClickEvent = function(event) {
    return goog.events.fireListeners(handler, 'click', false, event || {});
  };
  fireViewCloseEvent = function() {
    return goog.events.fireListeners(view, 'close', false, {});
  };
  setup(function() {
    handler = {
      decorate: function() {},
      addEventListener: function() {},
      addChild: function() {}
    };
    element = {};
    view = {
      addEventListener: function() {},
      getParent: function() {},
      getId: function() {
        return 1234;
      },
      setParent: function() {},
      render_: function() {},
      dispose: function() {}
    };
    viewFactory = function() {
      return view;
    };
    return lightbox = new Lightbox(handler, viewFactory);
  });
  suite('Lightbox.create', function() {
    return test('should create lightbox instance with object graph', function() {
      lightbox = Lightbox.create();
      return assert.instanceOf(lightbox, Lightbox);
    });
  });
  suite('decorate()', function() {
    return test('should decorate handler with its element', function(done) {
      handler.decorate = function(el) {
        assert.equal(el, element);
        return done();
      };
      return lightbox.decorate(element);
    });
  });
  suite('handler click event', function() {
    test('should call viewFactory with current anchor and array of anchors', function(done) {
      var anchors, currentAnchor;
      currentAnchor = {};
      anchors = [];
      viewFactory = function(p_currentAnchor, p_anchors) {
        assert.equal(p_currentAnchor, currentAnchor);
        assert.equal(p_anchors, anchors);
        done();
        return view;
      };
      lightbox = new Lightbox(handler, viewFactory);
      lightbox.decorate(element);
      return fireHandlerClickEvent({
        currentAnchor: currentAnchor,
        anchors: anchors
      });
    });
    test('should add view as child', function() {
      lightbox.decorate(element);
      fireHandlerClickEvent();
      return assert.equal(lightbox.getChildAt(0), view);
    });
    return test('should render view', function(done) {
      view.render_ = function() {
        return done();
      };
      lightbox.decorate(element);
      return fireHandlerClickEvent();
    });
  });
  suite('close', function() {
    return test('should remove shown view', function() {
      lightbox.decorate(element);
      fireHandlerClickEvent();
      lightbox.close();
      return assert.isNull(lightbox.getChildAt(0));
    });
  });
  return suite('view close event', function() {
    return test('should remove shown view', function() {
      lightbox.decorate(element);
      fireHandlerClickEvent();
      fireViewCloseEvent();
      return assert.isNull(lightbox.getChildAt(0));
    });
  });
});