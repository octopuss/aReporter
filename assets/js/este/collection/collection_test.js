// Generated by CoffeeScript 1.4.0

suite('este.Collection', function() {
  var Child, Collection, Model, arrangeChildType, arrangeCollectionWithItems, collection;
  Collection = este.Collection;
  Model = este.Model;
  Child = null;
  collection = null;
  setup(function() {
    return collection = new Collection;
  });
  arrangeChildType = function() {
    Child = function() {
      return Model.apply(this, arguments);
    };
    goog.inherits(Child, Model);
    return Child.prototype.schema = {
      c: {
        meta: function() {
          return 'fok';
        }
      }
    };
  };
  arrangeCollectionWithItems = function() {
    collection.add({
      'a': 1,
      'aa': 1.5
    });
    collection.add({
      'b': 2,
      'bb': 2.5
    });
    return collection.add({
      'c': 3,
      'cc': 3.5
    });
  };
  suite('constructor', function() {
    test('should optionally allow inject json data', function() {
      var json;
      json = [
        {
          a: 1
        }, {
          b: 2
        }
      ];
      collection = new Collection(json);
      return assert.deepEqual(collection.toJson(), json);
    });
    return test('should allow to override model', function() {
      var model;
      model = function() {};
      collection = new Collection(null, model);
      collection.add({});
      return assert.instanceOf(collection.at(0), model);
    });
  });
  suite('model property', function() {
    test('should wrap json (meta test included)', function() {
      var json;
      arrangeChildType();
      json = [
        {
          a: 1
        }, {
          b: 2
        }
      ];
      collection = new Collection(json, Child);
      assert.instanceOf(collection.at(0), Child);
      assert.equal(collection.at(0).get('a'), 1);
      assert.equal(collection.at(1).get('b'), 2);
      return assert.equal(collection.at(0).get('c'), 'fok');
    });
    test('should dispatch add event with models, not jsons', function(done) {
      collection = new Collection(null, Model);
      goog.events.listenOnce(collection, 'add', function(e) {
        assert.instanceOf(e.added[0], Model);
        return done();
      });
      return collection.add({
        a: 1
      });
    });
    return test('toJson should serialize model', function() {
      var cJson, collectionJson, json, _i, _len;
      arrangeChildType();
      json = [
        {
          id: 0,
          a: 'aa'
        }, {
          id: 1,
          b: 'bb'
        }
      ];
      collection = new Collection(json, Child);
      collectionJson = collection.toJson();
      for (_i = 0, _len = collectionJson.length; _i < _len; _i++) {
        cJson = collectionJson[_i];
        delete cJson.clientId;
      }
      return assert.deepEqual(collectionJson, [
        {
          id: 0,
          a: 'aa',
          c: 'fok'
        }, {
          id: 1,
          b: 'bb',
          c: 'fok'
        }
      ]);
    });
  });
  suite('add, remove and getLength', function() {
    return test('should work', function() {
      assert.equal(collection.getLength(), 0);
      collection.add(1);
      assert.equal(collection.getLength(), 1);
      assert.isFalse(collection.remove(2));
      assert.isTrue(collection.remove(1));
      return assert.equal(collection.getLength(), 0);
    });
  });
  suite('add item', function() {
    test('should fire add event', function() {
      var addCalled, added;
      addCalled = false;
      added = null;
      goog.events.listenOnce(collection, 'add', function(e) {
        added = e.added;
        return addCalled = true;
      });
      collection.add(1);
      assert.isTrue(addCalled);
      return assert.deepEqual(added, [1]);
    });
    test('should fire update event', function(done) {
      goog.events.listenOnce(collection, 'update', function(e) {
        return done();
      });
      return collection.add(1);
    });
    test('should throw exception for model item with same id', function() {
      var called;
      called = false;
      arrangeChildType();
      collection = new Collection([], Child);
      collection.add({
        id: 1
      });
      try {
        collection.add({
          id: 1
        });
      } catch (e) {
        called = true;
      }
      return assert.isTrue(called);
    });
    return test('should not throw exception for model item with same id if item was removed', function() {
      var called;
      called = false;
      arrangeChildType();
      collection = new Collection([], Child);
      collection.add({
        id: 1
      });
      collection.remove(collection.at(0));
      try {
        collection.add({
          id: 1
        });
      } catch (e) {
        called = true;
      }
      return assert.isFalse(called);
    });
  });
  suite('add items', function() {
    return test('should fire add event', function() {
      var addCalled, added;
      addCalled = false;
      added = null;
      goog.events.listenOnce(collection, 'add', function(e) {
        added = e.added;
        return addCalled = true;
      });
      collection.add([1, 2]);
      assert.isTrue(addCalled);
      return assert.deepEqual(added, [1, 2]);
    });
  });
  suite('remove item', function() {
    test('should fire remove event', function() {
      var removeCalled, removed;
      removeCalled = false;
      removed = null;
      collection.add(1);
      goog.events.listen(collection, 'remove', function(e) {
        removed = e.removed;
        return removeCalled = true;
      });
      collection.remove(1);
      assert.isTrue(removeCalled, 'removeCalled');
      return assert.deepEqual(removed, [1]);
    });
    test('should fire update event', function(done) {
      collection.add(1);
      goog.events.listenOnce(collection, 'update', function(e) {
        return done();
      });
      return collection.remove(1);
    });
    return test('should not fire remove event', function() {
      var removeCalled;
      removeCalled = false;
      goog.events.listen(collection, 'remove', function() {
        return removeCalled = true;
      });
      collection.remove(1);
      return assert.isFalse(removeCalled);
    });
  });
  suite('remove item', function() {
    test('should fire remove event', function() {
      var removeCalled, removed;
      removeCalled = false;
      removed = null;
      collection.add(1);
      goog.events.listen(collection, 'remove', function(e) {
        removed = e.removed;
        return removeCalled = true;
      });
      collection.remove([1]);
      assert.isTrue(removeCalled, 'removeCalled');
      return assert.deepEqual(removed, [1]);
    });
    return test('should not fire remove, change events', function() {
      var changeCalled, removeCalled;
      removeCalled = changeCalled = false;
      goog.events.listen(collection, 'remove', function() {
        return removeCalled = true;
      });
      goog.events.listen(collection, 'change', function() {
        return changeCalled = true;
      });
      collection.remove(1);
      assert.isFalse(removeCalled);
      return assert.isFalse(changeCalled);
    });
  });
  suite('contains', function() {
    return test('should return true if obj is present', function() {
      assert.isFalse(collection.contains(1));
      collection.add(1);
      return assert.isTrue(collection.contains(1));
    });
  });
  suite('removeIf', function() {
    return test('should remove item', function() {
      collection.add(1);
      assert.isTrue(collection.contains(1));
      collection.removeIf(function(item) {
        return item === 1;
      });
      return assert.isFalse(collection.contains(1));
    });
  });
  suite('at', function() {
    return test('should return item by index', function() {
      collection.add(1);
      return assert.equal(collection.at(0), 1);
    });
  });
  suite('toArray', function() {
    return test('should return inner array', function() {
      collection.add(1);
      return assert.deepEqual(collection.toArray(), [1]);
    });
  });
  suite('toJson', function() {
    test('should return inner array', function() {
      collection.add(1);
      return assert.deepEqual(collection.toJson(), [1]);
    });
    return test('should pass noMetas to model toJson method', function(done) {
      collection = new Collection(null, Model);
      collection.add({
        'a': 1
      });
      collection.at(0).toJson = function(noMetas) {
        assert.isTrue(noMetas);
        return done();
      };
      return collection.toJson(true);
    });
  });
  suite('bubbling events', function() {
    return test('from inner model should work', function() {
      var called, innerModel;
      called = 0;
      innerModel = new Model;
      collection.add(innerModel);
      goog.events.listen(collection, 'change', function(e) {
        return called++;
      });
      innerModel.set('1', 1);
      assert.equal(called, 1);
      collection.remove(innerModel);
      assert.equal(called, 1);
      innerModel.set('1', 2);
      return assert.equal(called, 1);
    });
  });
  suite('find', function() {
    return test('should find item', function() {
      var found;
      collection.add([
        {
          a: 1
        }, {
          b: 2
        }
      ]);
      found = collection.find(function(item) {
        return item.a === 1;
      });
      assert.deepEqual(found, {
        a: 1
      });
      found = collection.find(function(item) {
        return item.b === 2;
      });
      assert.deepEqual(found, {
        b: 2
      });
      found = collection.find(function(item) {
        return item.b === 3;
      });
      return assert.isUndefined(found);
    });
  });
  suite('findById', function() {
    test('should find item by id', function() {
      var found;
      collection.add([
        {
          id: 1
        }, {
          id: 2
        }
      ]);
      found = collection.findById(1);
      assert.deepEqual(found, {
        id: 1
      });
      found = collection.findById(2);
      assert.deepEqual(found, {
        id: 2
      });
      found = collection.findById(3);
      return assert.isUndefined(found);
    });
    return test('should find typed item by id', function() {
      var found, json;
      arrangeChildType();
      Child.prototype.schema = {};
      json = [
        {
          id: 1
        }, {
          id: 2
        }
      ];
      collection = new Collection(json, Child);
      found = collection.findById(1);
      json = found.toJson();
      delete json.clientId;
      assert.deepEqual(json, {
        id: 1
      });
      found = collection.findById(2);
      json = found.toJson();
      delete json.clientId;
      assert.deepEqual(json, {
        id: 2
      });
      found = collection.findById(3);
      return assert.isUndefined(found);
    });
  });
  suite('findByClientId', function() {
    test('should find item by clientId', function() {
      var found;
      collection.add([
        {
          id: 1,
          clientId: ':1'
        }, {
          id: 2,
          clientId: ':2'
        }
      ]);
      found = collection.findByClientId(':1');
      assert.deepEqual(found, {
        id: 1,
        clientId: ':1'
      });
      found = collection.findByClientId(':2');
      assert.deepEqual(found, {
        id: 2,
        clientId: ':2'
      });
      found = collection.findByClientId(':3');
      return assert.isUndefined(found);
    });
    return test('should find typed item by clientId', function() {
      var found, json;
      arrangeChildType();
      Child.prototype.schema = {};
      json = [
        {
          id: 1,
          clientId: ':1'
        }, {
          id: 2,
          clientId: ':2'
        }
      ];
      collection = new Collection(json, Child);
      found = collection.findByClientId(':1');
      json = found.toJson();
      delete json.clientId;
      assert.deepEqual(json, {
        id: 1
      });
      found = collection.findByClientId(':2');
      json = found.toJson();
      delete json.clientId;
      assert.deepEqual(json, {
        id: 2
      });
      found = collection.findByClientId(':3');
      return assert.isUndefined(found);
    });
  });
  suite('add typed object into typed collection', function() {
    return test('should work', function() {
      var child;
      arrangeChildType();
      collection = new Collection([], Child);
      child = new Child;
      child.set('a', 1);
      collection.add(child);
      assert.instanceOf(collection.at(0), Child);
      return assert.equal(collection.at(0).get('a'), 1);
    });
  });
  suite('clear', function() {
    return test('should works', function() {
      var count;
      count = 0;
      collection = new Collection;
      collection.add(1);
      collection.add(2);
      goog.events.listenOnce(collection, 'remove', function() {
        return count++;
      });
      collection.clear();
      assert.equal(count, 1);
      assert.isUndefined(collection.at(0));
      return assert.isUndefined(collection.at(1));
    });
  });
  suite('sorting', function() {
    suite('default compare', function() {
      test('should work with numbers', function() {
        collection.add([3, 2, 1]);
        return assert.deepEqual(collection.toJson(), [1, 2, 3]);
      });
      return test('should work with strings', function() {
        collection.add(['c', 'b', 'a']);
        assert.deepEqual(collection.toJson(), ['a', 'b', 'c']);
        collection.remove('a');
        return assert.deepEqual(collection.toJson(), ['b', 'c']);
      });
    });
    return suite('sort', function() {
      test('should fire sort event', function(done) {
        goog.events.listenOnce(collection, 'sort', function(e) {
          return done();
        });
        return collection.sort();
      });
      test('should fire update event', function(done) {
        goog.events.listenOnce(collection, 'update', function(e) {
          return done();
        });
        return collection.sort();
      });
      suite('by', function() {
        test('before should work', function() {
          collection.sort({
            by: function(item) {
              return item.id;
            }
          });
          collection.add({
            id: 3
          });
          collection.add({
            id: 1
          });
          collection.add({
            id: 2
          });
          return assert.deepEqual(collection.toJson(), [
            {
              id: 1
            }, {
              id: 2
            }, {
              id: 3
            }
          ]);
        });
        test('before should not(!) work', function() {
          collection.sort({
            by: null
          });
          collection.add({
            id: 3
          });
          collection.add({
            id: 2
          });
          collection.add({
            id: 1
          });
          return assert.deepEqual(collection.toJson(), [
            {
              id: 3
            }, {
              id: 2
            }, {
              id: 1
            }
          ]);
        });
        return test('after should work', function() {
          collection.add({
            id: 3
          });
          collection.add({
            id: 1
          });
          collection.add({
            id: 2
          });
          collection.sort({
            by: function(item) {
              return item.id;
            }
          });
          return assert.deepEqual(collection.toJson(), [
            {
              id: 1
            }, {
              id: 2
            }, {
              id: 3
            }
          ]);
        });
      });
      return suite('reversed', function() {
        test('before should work', function() {
          collection.sort({
            by: function(item) {
              return item.id;
            },
            reversed: true
          });
          collection.add({
            id: 3
          });
          collection.add({
            id: 1
          });
          collection.add({
            id: 2
          });
          return assert.deepEqual(collection.toJson(), [
            {
              id: 3
            }, {
              id: 2
            }, {
              id: 1
            }
          ]);
        });
        return test('after should work', function() {
          collection.add({
            id: 'c'
          });
          collection.add({
            id: 'a'
          });
          collection.add({
            id: 'b'
          });
          collection.sort({
            by: function(item) {
              return item.id;
            },
            reversed: true
          });
          return assert.deepEqual(collection.toJson(), [
            {
              id: 'c'
            }, {
              id: 'b'
            }, {
              id: 'a'
            }
          ]);
        });
      });
    });
  });
  suite('subclassed collection', function() {
    return test('should allow to define model as property', function() {
      var ChildCollection;
      ChildCollection = function(array, model) {
        goog.base(this, array, model);
      };
      goog.inherits(ChildCollection, Collection);
      ChildCollection.prototype.model = Child;
      collection = new ChildCollection;
      return assert.equal(collection.model, Child);
    });
  });
  suite('filter', function() {
    suite('on collection with jsons', function() {
      setup(function() {
        return arrangeCollectionWithItems();
      });
      test('should filter by function', function() {
        var filtered;
        filtered = collection.filter(function(item) {
          return item['a'] === 1;
        });
        assert.deepEqual(filtered, [
          {
            'a': 1,
            'aa': 1.5
          }
        ]);
        filtered = collection.filter(function(item) {
          return item['a'] === 2;
        });
        assert.deepEqual(filtered, []);
        filtered = collection.filter(function(item) {
          return item['a'] === 1 || item['bb'] === 2.5;
        });
        return assert.deepEqual(filtered, [
          {
            'a': 1,
            'aa': 1.5
          }, {
            'b': 2,
            'bb': 2.5
          }
        ]);
      });
      return test('should filter by object', function() {
        var filtered;
        filtered = collection.filter({
          'a': 1
        });
        assert.deepEqual(filtered, [
          {
            'a': 1,
            'aa': 1.5
          }
        ]);
        filtered = collection.filter({
          'a': 2
        });
        assert.deepEqual(filtered, []);
        filtered = collection.filter({
          'bb': 2.5
        });
        return assert.deepEqual(filtered, [
          {
            'b': 2,
            'bb': 2.5
          }
        ]);
      });
    });
    return suite('on collection with models', function() {
      setup(function() {
        collection = new Collection(null, Model);
        return arrangeCollectionWithItems();
      });
      test('should filter by function', function() {
        var filtered;
        filtered = collection.filter(function(item) {
          return item['a'] === 1;
        });
        delete filtered[0]['clientId'];
        assert.deepEqual(filtered, [
          {
            'a': 1,
            'aa': 1.5
          }
        ]);
        filtered = collection.filter(function(item) {
          return item['a'] === 2;
        });
        assert.deepEqual(filtered, []);
        filtered = collection.filter(function(item) {
          return item['a'] === 1 || item['bb'] === 2.5;
        });
        delete filtered[0]['clientId'];
        delete filtered[1]['clientId'];
        return assert.deepEqual(filtered, [
          {
            'a': 1,
            'aa': 1.5
          }, {
            'b': 2,
            'bb': 2.5
          }
        ]);
      });
      return test('should filter by object', function() {
        var filtered;
        filtered = collection.filter({
          'a': 1
        });
        delete filtered[0]['clientId'];
        assert.deepEqual(filtered, [
          {
            'a': 1,
            'aa': 1.5
          }
        ]);
        filtered = collection.filter({
          'a': 2
        });
        assert.deepEqual(filtered, []);
        filtered = collection.filter({
          'bb': 2.5
        });
        delete filtered[0]['clientId'];
        return assert.deepEqual(filtered, [
          {
            'b': 2,
            'bb': 2.5
          }
        ]);
      });
    });
  });
  return suite('each', function() {
    test('should call passed callback with each collection item', function() {
      var items;
      arrangeCollectionWithItems();
      items = [];
      collection.each(function(item) {
        return items.push(item);
      });
      return assert.deepEqual(items, [
        {
          'a': 1,
          'aa': 1.5
        }, {
          'b': 2,
          'bb': 2.5
        }, {
          'c': 3,
          'cc': 3.5
        }
      ]);
    });
    return test('should call passed callback with each collection model', function() {
      var items;
      collection = new Collection(null, Model);
      arrangeCollectionWithItems();
      items = [];
      collection.each(function(item) {
        item.remove('clientId');
        return items.push(item.toJson());
      });
      return assert.deepEqual(JSON.stringify(items), JSON.stringify([
        {
          'a': 1,
          'aa': 1.5
        }, {
          'b': 2,
          'bb': 2.5
        }, {
          'c': 3,
          'cc': 3.5
        }
      ]));
    });
  });
});