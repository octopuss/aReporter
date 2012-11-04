# consider: should dispose previously registered drag on second click? test in ui

suite 'este.ui.resizer.Handles', ->

	Handles = este.ui.resizer.Handles

	element = null
	handles = null
	offsetParent = null
	dragger = null
	draggerFactory = null
	invisibleOverlay = null
	invisibleOverlayFactory = ->
		invisibleOverlay

	fireMouseDownOnVerticalHandle = ->
		goog.events.fireListeners handles.vertical, 'mousedown', false,
				target: handles.vertical

	fireMouseDownOnHorizontalHandle = ->
		goog.events.fireListeners handles.horizontal, 'mousedown', false,
				target: handles.horizontal

	setup ->
		document.elementFromPoint = ->
		element = document.createElement 'div'
		element.offsetLeft = 20
		element.offsetTop = 30
		element.offsetWidth = 100
		element.offsetHeight = 200
		offsetParent = document.createElement 'div'
		element.offsetParent = offsetParent
		dragger =
			startDrag: ->
			addEventListener: ->
			dispose: ->
		draggerFactory = ->
			dragger
		invisibleOverlay = new goog.ui.Component
		handles = new Handles draggerFactory, invisibleOverlayFactory
		handles.decorate element

	# createMockDocument does not help because internally component uses glogal document
	# but deleting for non primitive types is ok (it will return prototype implementation)
	teardown ->
		delete document.elementFromPoint

	suite 'Handles.create', ->
		test 'should create instance', ->
			handles = Handles.create()
			assert.instanceOf handles, Handles

	suite 'decorate', ->
		test 'should render vertical and horizontal handles', ->
			assert.equal handles.vertical.nodeType, 1
			assert.equal handles.horizontal.nodeType, 1

		test 'should render handles into offsetParent', ->
			assert.isNotNull handles.vertical.parentNode
			assert.isNotNull handles.horizontal.parentNode
			assert.equal handles.vertical.parentNode, element.offsetParent
			assert.equal handles.horizontal.parentNode, element.offsetParent

		test 'should set handles bounds', ->
			assert.equal handles.horizontal.style.left, '20px'
			assert.equal handles.horizontal.style.top, '230px'
			assert.equal handles.horizontal.style.width, '100px'
			assert.equal handles.vertical.style.left, '120px'
			assert.equal handles.vertical.style.top, '30px'
			assert.equal handles.vertical.style.height, '200px'

		test 'should add classes to handles', ->
			assert.ok goog.dom.classes.has handles.horizontal, 'e-resizer-handle-horizontal'
			assert.ok goog.dom.classes.has handles.vertical, 'e-resizer-handle-vertical'

		test 'should render handles into element itself if offsetParent is null', ->
			element.offsetParent = null
			handles = new Handles
			handles.decorate element
			assert.equal handles.vertical.parentNode, element
			assert.equal handles.horizontal.parentNode, element

	suite 'update', ->
		test 'should update handles bounds', ->
			element.offsetLeft = 30
			element.offsetTop = 40
			element.offsetWidth = 110
			element.offsetHeight = 210
			handles.update()
			assert.equal handles.horizontal.style.left, '30px'
			assert.equal handles.horizontal.style.top, '250px'
			assert.equal handles.horizontal.style.width, '110px'
			assert.equal handles.vertical.style.left, '140px'
			assert.equal handles.vertical.style.top, '40px'
			assert.equal handles.vertical.style.height, '210px'

	suite 'dispose', ->
		test 'should dispose handles', ->
			handles.dispose()
			assert.isNull handles.vertical.parentNode
			assert.isNull handles.horizontal.parentNode
			assert.isFalse goog.events.hasListener handles.vertical, 'mouseout', false
			assert.isFalse goog.events.hasListener handles.horizontal, 'mouseout', false

	suite 'isHandle', ->
		test 'should return true for handle element', ->
			assert.isTrue handles.isHandle handles.vertical
			assert.isTrue handles.isHandle handles.horizontal

		test 'should return false for anything else', ->
			assert.isFalse handles.isHandle {}
			assert.isFalse handles.isHandle null

	suite 'mousedown on horizontal handle', ->
		test 'should set horizontal handle as active', ->
			fireMouseDownOnHorizontalHandle()
			assert.equal handles.activeHandle, handles.horizontal

		test 'should register events than call dragStart e on dragger from factory', (done) ->
			event =
				target: handles.horizontal
			count = 0
			dragger.addEventListener = -> count++
			dragger.startDrag = (e) ->
				assert.equal e, event
				assert.equal count, 3
				done()
			goog.events.fireListeners handles.horizontal, 'mousedown', false, event

	suite 'mousedown on vertical handle', ->
		test 'should set vertical handle as active', ->
			fireMouseDownOnVerticalHandle()
			assert.equal handles.activeHandle, handles.vertical

		test 'should call register events than call dragStart e on dragger from factory', (done) ->
			event =
				target: handles.vertical
			count = 0
			dragger.addEventListener = -> count++
			dragger.startDrag = (e) ->
				assert.equal e, event
				assert.equal count, 3
				done()
			goog.events.fireListeners handles.vertical, 'mousedown', false, event

	suite 'dragging', ->
		test 'should dispatch start event, with property element', (done) ->
			goog.events.listenOnce handles, 'start', (e) ->
				assert.equal e.element, element
				done()
			fireMouseDownOnVerticalHandle()
			goog.events.fireListeners dragger, 'start', false, {}

		test 'should dispatch start event, with property vertical true', (done) ->
			goog.events.listenOnce handles, 'start', (e) ->
				assert.equal e.vertical, true
				done()
			fireMouseDownOnVerticalHandle()
			goog.events.fireListeners dragger, 'start', false, {}

		test 'should dispatch drag event, with property vertical true', (done) ->
			goog.events.listenOnce handles, 'drag', (e) ->
				assert.equal e.vertical, true
				done()
			fireMouseDownOnVerticalHandle()
			goog.events.fireListeners dragger, 'start', false, {}
			goog.events.fireListeners dragger, 'drag', false, {}

		test 'should dispatch start event, with property vertical false', (done) ->
			goog.events.listenOnce handles, 'start', (e) ->
				assert.equal e.vertical, false
				done()
			fireMouseDownOnHorizontalHandle()
			goog.events.fireListeners dragger, 'start', false, {}

		test 'should dispatch start event, with property vertical false', (done) ->
			goog.events.listenOnce handles, 'drag', (e) ->
				assert.equal e.vertical, false
				done()
			fireMouseDownOnHorizontalHandle()
			goog.events.fireListeners dragger, 'start', false, {}
			goog.events.fireListeners dragger, 'drag', false, {}

		test 'should dispatch drag event, with properties element, width and height', (done) ->
			goog.events.listenOnce handles, 'drag', (e) ->
				assert.equal e.width, 15
				assert.equal e.height, 10
				assert.equal e.element, element
				done()
			fireMouseDownOnVerticalHandle()
			goog.events.fireListeners dragger, 'start', false,
				clientX: 10
				clientY: 20
			goog.events.fireListeners dragger, 'drag', false,
				clientX: 25
				clientY: 30

		test 'drag should update handles bounds', ->
			element.offsetLeft = 30
			element.offsetTop = 40
			element.offsetWidth = 110
			element.offsetHeight = 210

			handles.update()

			assert.equal handles.horizontal.style.left, '30px'
			assert.equal handles.horizontal.style.top, '250px'
			assert.equal handles.horizontal.style.width, '110px'
			assert.equal handles.vertical.style.left, '140px'
			assert.equal handles.vertical.style.top, '40px'
			assert.equal handles.vertical.style.height, '210px'

			fireMouseDownOnVerticalHandle()
			goog.events.fireListeners dragger, 'start', false, {}

			element.offsetLeft = 31
			element.offsetTop = 42
			element.offsetWidth = 113
			element.offsetHeight = 214
			goog.events.fireListeners dragger, 'drag', false, {}
			assert.equal handles.horizontal.style.left, '31px'
			assert.equal handles.horizontal.style.top, '256px'
			assert.equal handles.horizontal.style.width, '113px'
			assert.equal handles.vertical.style.left, '144px'
			assert.equal handles.vertical.style.top, '42px'
			assert.equal handles.vertical.style.height, '214px'

	suite 'drag end event', ->
		test 'should dispose dragger', (done) ->
			fireMouseDownOnVerticalHandle()
			dragger.dispose = -> done()
			goog.events.fireListeners dragger, 'start', false, {}
			goog.events.fireListeners dragger, 'end', false, {}

		test 'should unrender invisible overlay', ->
			exitDocumentCalled = false
			invisibleOverlay.exitDocument = -> exitDocumentCalled = true
			fireMouseDownOnVerticalHandle()
			goog.events.fireListeners dragger, 'start', false, {}
			goog.events.fireListeners dragger, 'end', false, {}
			assert.isTrue exitDocumentCalled
			assert.isNull invisibleOverlay.getElement().parentNode

		test 'should dispatch end event', (done) ->
			fireMouseDownOnVerticalHandle()
			goog.events.fireListeners dragger, 'start', false, {}
			goog.events.listenOnce handles, 'end', -> done()
			goog.events.fireListeners dragger, 'end', false, {}

		test 'should dispatch end event with bool property close equal true', (done) ->
			document.elementFromPoint = -> handles.vertical
			fireMouseDownOnVerticalHandle()
			goog.events.fireListeners dragger, 'start', false, {}
			goog.events.listenOnce handles, 'end', (e) ->
				assert.isFalse e.close
				done()
			goog.events.fireListeners dragger, 'end', false, {}

		test 'should dispatch end event with bool property close equal false', (done) ->
			document.elementFromPoint = -> null
			fireMouseDownOnVerticalHandle()
			goog.events.fireListeners dragger, 'start', false, {}
			goog.events.listenOnce handles, 'end', (e) ->
				assert.isTrue e.close
				done()
			goog.events.fireListeners dragger, 'end', false, {}

		test 'should dispatch end event with element property', (done) ->
			goog.events.listenOnce handles, 'end', (e) ->
				assert.equal e.element, element
				done()
			fireMouseDownOnVerticalHandle()
			goog.events.fireListeners dragger, 'start', false, {}
			goog.events.fireListeners dragger, 'end', false, {}

	suite 'dispose', ->
		test 'should dispose dragger too', (done) ->
			fireMouseDownOnVerticalHandle()
			dragger.dispose = -> done()
			handles.dispose()

		test 'should unrender invisible overlay', ->
			exitDocumentCalled = false
			invisibleOverlay.exitDocument = -> exitDocumentCalled = true
			fireMouseDownOnVerticalHandle()
			goog.events.fireListeners dragger, 'start', false, {}
			goog.events.fireListeners dragger, 'end', false, {}
			assert.isTrue exitDocumentCalled
			assert.isNull invisibleOverlay.getElement().parentNode

	suite 'drag start event', ->
		test 'should render invisible overlay into handles document body', ->
			fireMouseDownOnVerticalHandle()
			goog.events.fireListeners dragger, 'start', false, {}
			assert.equal invisibleOverlay.getElement().parentNode, handles.dom_.getDocument().body

		test 'should render invisible overlay with same cursor as activeHandle', ->
			fireMouseDownOnVerticalHandle()
			handles.vertical.__style.cursor = 'fok'
			goog.events.fireListeners dragger, 'start', false, {}
			assert.equal invisibleOverlay.getElement().style.cursor, 'fok'

		test 'should render invisible overlay with same cursor as activeHandle', ->
			fireMouseDownOnHorizontalHandle()
			handles.horizontal.__style.cursor = 'foo'
			goog.events.fireListeners dragger, 'start', false, {}
			assert.equal invisibleOverlay.getElement().style.cursor, 'foo'











