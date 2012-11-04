###*
  @fileoverview aReporter.layout.View.
###
goog.provide 'aReporter.layout.View'

goog.require 'este.app.View'
goog.require 'aReporter.domain.Tickets'
goog.require 'aReporter.layout.templates'

class aReporter.layout.View extends este.app.View

  ###*
    @constructor
    @extends {este.app.View}
  ###
  constructor: ->
    super()

 
  ###*
    @type {aReporter.Tickets}
    @protected
  ###
  tickets: null

   ###*
    @type {aReporter.Activities}
    @protected
  ###
  activities: null

  ###*
    Each view is async loaded by default. Load method has to return object
    implementing goog.result.Result interface. It's better than plain old
    callbacks. todo: link to article
    @inheritDoc
  ###
  load: (params) ->
    if !@tickets
      @tickets = new aReporter.domain.Tickets
      return @localStorage.query @tickets
    super()
    
  ###*
    @inheritDoc
  ###
  enterDocument: ->
    super()
    @update()

  ###*
    Method takes care of default layout initialization and rendering
    @protected
  ###
  update:->
    ticket = new aReporter.domain.Ticket title:'aaa', active:true
    @tickets.add ticket
    json =
      tickets: @tickets
      ticketsLength: @tickets.getLength()
    html = aReporter.layout.templates.element json
    @mergeHtml html
