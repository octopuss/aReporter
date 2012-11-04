###*
  @fileoverview este.ui.FieldReset.
###
goog.provide 'este.ui.FieldReset'

goog.require 'este.mobile'
goog.require 'goog.dom.classes'
goog.require 'goog.events.InputHandler'
goog.require 'goog.string'
goog.require 'goog.ui.Component'

class este.ui.FieldReset extends goog.ui.Component

  ###*
    @param {Element} element
    @constructor
    @extends {goog.ui.Component}
  ###
  constructor: (element) ->
    @inputHandler = new goog.events.InputHandler element
    @resetBtn = goog.dom.createDom 'div', 'e-reset'
    @decorate element

  ###*
    @type {string}
  ###
  @className: 'e-empty'

  ###*
    @enum {string}
  ###
  @EventType:
    INPUT: 'input'

  ###*
    @type {goog.events.InputHandler}
    @protected
  ###
  inputHandler: null

  ###*
    @type {Element}
    @protected
  ###
  resetBtn: null

  ###*
    @inheritDoc
  ###
  enterDocument: ->
    super()
    @getHandler().
      listen(@inputHandler, 'input', @onInputHandlerInput).
      listen(@resetBtn, este.mobile.tapEvent, @onResetBtnTap)
    @update()
    return

  ###*
    @inheritDoc
  ###
  canDecorate: (element) ->
    element.tagName in ['INPUT', 'TEXTAREA']

  ###*
    @param {goog.events.BrowserEvent} e
    @protected
  ###
  onInputHandlerInput: (e) ->
    @update()
    @dispatchEvent FieldReset.EventType.INPUT

  ###*
    @param {goog.events.BrowserEvent} e
    @protected
  ###
  onResetBtnTap: (e) ->
    # prevents paste bubble in ios5 emulator (didnt tested on real iphone still...)
    e.preventDefault()
    @getElement().value = ''
    @update()
    @getElement().focus()
    @dispatchEvent FieldReset.EventType.INPUT

  ###*
    @protected
  ###
  update: ->
    isEmpty = !goog.string.trim(@getElement().value).length
    goog.dom.classes.enable @getElement(), FieldReset.className, isEmpty
    if isEmpty
      goog.dom.removeNode @resetBtn
    else
      goog.dom.insertSiblingAfter @resetBtn, @getElement()

  ###*
    @inheritDoc
  ###
  disposeInternal: ->
    @inputHandler.dispose()
    super()
    return