suite 'este.ui.lightbox.View', ->

	View = este.ui.lightbox.View
	KeyCodes = goog.events.KeyCodes

	normalizeHTML = (str) ->
		str.replace /\s+/g, ' '

	# classes namespaced to ensure save injection into any html
	htmlFirstAnchor = normalizeHTML "
		<div class='e-ui-lightbox-background'></div>
		<div class='e-ui-lightbox-content'>
			<div class='e-ui-lightbox-image-wrapper'>
				<img class='e-ui-lightbox-image' src='0'>
				<div class='e-ui-lightbox-title'>a</div>
			</div>
		</div>
		<div class='e-ui-lightbox-sidebar'>
			<button class='e-ui-lightbox-previous e-ui-lightbox-disabled'>previous</button>
			<button class='e-ui-lightbox-next'>next</button>
			<div class='e-ui-lightbox-numbers'>
				<span class='e-ui-lightbox-current'>1</span>/
				<span class='e-ui-lightbox-total'>2</span>
			</div>
			<button class='e-ui-lightbox-close'>close</button>
		</div>"

	htmlSecondAnchor = normalizeHTML "
		<div class='e-ui-lightbox-background'></div>
		<div class='e-ui-lightbox-content'>
			<div class='e-ui-lightbox-image-wrapper'>
				<img class='e-ui-lightbox-image' src='1'>
				<div class='e-ui-lightbox-title'>b</div>
			</div>
		</div>
		<div class='e-ui-lightbox-sidebar'>
			<button class='e-ui-lightbox-previous'>previous</button>
			<button class='e-ui-lightbox-next e-ui-lightbox-disabled'>next</button>
			<div class='e-ui-lightbox-numbers'>
				<span class='e-ui-lightbox-current'>2</span>/
				<span class='e-ui-lightbox-total'>2</span>
			</div>
			<button class='e-ui-lightbox-close'>close</button>
		</div>"

	firstAnchor = null
	secondAnchor = null
	anchors = null
	view = null

	setup ->
		firstAnchor = href: 0, title: 'a'
		secondAnchor = href: 1, title: 'b'
		anchors	= [firstAnchor, secondAnchor]
		view = new View firstAnchor, anchors
		view.render()

	fireViewElementClickEvent = (className) ->
		goog.events.fireListeners view.getElement(), 'click', false,
			target:
				className: 'e-ui-lightbox-' + className

	fireDocumentKeydownEvent = (keyCode) ->
		goog.events.fireListeners view.dom_.getDocument(), 'keydown', false,
			keyCode: keyCode ? KeyCodes.ESC

	suite 'View.create()', ->
		test 'should return instance with assigned properties', ->
			view = View.create firstAnchor, anchors
			assert.instanceOf view, View
			assert.equal view.currentAnchor, firstAnchor
			assert.equal view.anchors, anchors

	suite 'render()', ->
		test 'should create element with class lightbox', ->
			assert.equal view.getElement().className, 'e-ui-lightbox'

		test 'should create element with defined innerHTML', ->
			assert.equal normalizeHTML(view.getElement().innerHTML), htmlFirstAnchor

	suite 'click on button with class', ->
		test '.next should set currentAnchor to secondAnchor', ->
			fireViewElementClickEvent 'next'
			assert.equal view.currentAnchor, secondAnchor

		test '.next should update innerHTML', ->
			fireViewElementClickEvent 'next'
			assert.equal normalizeHTML(view.getElement().innerHTML), htmlSecondAnchor

		test '.next two times, should set currentAnchor to secondAnchor', ->
			fireViewElementClickEvent 'next'
			fireViewElementClickEvent 'next'
			assert.equal view.currentAnchor, secondAnchor

		test '.previous should should set currentAnchor back to firstAnchor', ->
			fireViewElementClickEvent 'next'
			fireViewElementClickEvent 'next'
			fireViewElementClickEvent 'previous'
			assert.equal view.currentAnchor, firstAnchor

		test '.previous should not change currentAnchor', ->
			fireViewElementClickEvent 'previous'
			assert.equal view.currentAnchor, firstAnchor

	suite 'keydown on horizontal key', ->
		test 'right arrow should set currentAnchor to secondAnchor', ->
			fireDocumentKeydownEvent KeyCodes.RIGHT
			assert.equal view.currentAnchor, secondAnchor

		test 'right arrow should update innerHTML', ->
			fireDocumentKeydownEvent KeyCodes.RIGHT
			assert.equal normalizeHTML(view.getElement().innerHTML), htmlSecondAnchor

		test 'right arrow two times, should set currentAnchor to secondAnchor', ->
			fireDocumentKeydownEvent KeyCodes.RIGHT
			fireDocumentKeydownEvent KeyCodes.RIGHT
			assert.equal view.currentAnchor, secondAnchor

		test 'left arrow should should set currentAnchor back to firstAnchor', ->
			fireDocumentKeydownEvent KeyCodes.RIGHT
			fireDocumentKeydownEvent KeyCodes.RIGHT
			fireDocumentKeydownEvent KeyCodes.LEFT
			assert.equal view.currentAnchor, firstAnchor

		test 'left arrow should not change currentAnchor', ->
			fireDocumentKeydownEvent KeyCodes.LEFT
			assert.equal view.currentAnchor, firstAnchor

	suite 'keydown on vertical key', ->
		test 'down arrow should set currentAnchor to secondAnchor', ->
			fireDocumentKeydownEvent KeyCodes.DOWN
			assert.equal view.currentAnchor, secondAnchor

		test 'down arrow should update innerHTML', ->
			fireDocumentKeydownEvent KeyCodes.DOWN
			assert.equal normalizeHTML(view.getElement().innerHTML), htmlSecondAnchor

		test 'down arrow two times, should set currentAnchor to secondAnchor', ->
			fireDocumentKeydownEvent KeyCodes.DOWN
			fireDocumentKeydownEvent KeyCodes.DOWN
			assert.equal view.currentAnchor, secondAnchor

		test 'up arrow should should set currentAnchor back to firstAnchor', ->
			fireDocumentKeydownEvent KeyCodes.DOWN
			fireDocumentKeydownEvent KeyCodes.DOWN
			fireDocumentKeydownEvent KeyCodes.UP
			assert.equal view.currentAnchor, firstAnchor

		test 'up arrow should not change currentAnchor', ->
			fireDocumentKeydownEvent KeyCodes.UP
			assert.equal view.currentAnchor, firstAnchor

	suite 'click on button with class .close', ->
		test 'should dispatch close event', (done) ->
			goog.events.listenOnce view, 'close', -> done()
			fireViewElementClickEvent 'close'

	suite 'keydown on document with key esc', ->
		test 'should dispatch close event', (done) ->
			goog.events.listenOnce view, 'close', -> done()
			fireDocumentKeydownEvent()













