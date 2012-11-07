###*
  @fileoverview aReporter.layout.View.
###
goog.provide 'aReporter.layout.View'

goog.require 'este.app.View'
goog.require 'aReporter.domain.Tickets'
goog.require 'aReporter.domain.Activities'
goog.require 'aReporter.layout.templates'

class aReporter.layout.View extends este.app.View

  ###*
    @constructor
    @extends {este.app.View}
  ###
  constructor: ->
    super()


  ###*
    @type {aReporter.domain.Tickets}
    @protected
  ###
  tickets: null

   ###*
    @type {aReporter.domain.Activities}
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
    if !@activities
      @activities = new aReporter.domain.Activities
      return @localStorage.query @activities, @tickets
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
    activity = new aReporter.domain.Activity
    types = []
    for key,type of aReporter.domain.Activity.ActivityType
      types.push {type:key,value:type}
      #types.push aReporter.domain.Activity.ActivityType[type]
    @tickets.add ticket
    @activities.add activity
    json =
      tickets: @tickets.toJson()
      ticketsLength: @tickets.getLength()
      activities: @activities.toJson()
      activityTypes: types
      activitiesLength:@activities.getLength()
    html = aReporter.layout.templates.element json
    @mergeHtml html
