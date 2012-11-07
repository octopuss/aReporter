###*
  @fileoverview aReporter.domain.Activity.
###
goog.provide 'aReporter.domain.Activity'

goog.require 'este.Model'

class aReporter.domain.Activity extends este.Model

  ###*
    @param {Object=} json
    @constructor
    @extends {este.Model}
  ###
  constructor: (json) ->
    super json

  ###*
    Activity types enumeration
    @enum  {String}
  ###
  @ActivityType =
    PROGRAMMING : 'Programming'
    COMMUNICATION : 'Communication'
    TESTING : 'Testing'
    OTHER : 'Other'

  ###*
    @inheritDoc
  ###
  defaults:
    'hours': 0
    'md':0
    'date': new Date
    'title':''
    'description':''
    'type':@ActivityType.PROGRAMMING
    'invoiced':true

  ###*
    @inheritDoc
  ###
  schema:
    'title':
      'set': este.model.setters.trim
      'validators':
        'required': este.model.validators.required
    'hours':
      'validators':
        'required': este.model.validators.required

  calculateMD: ->
    hrs = @get 'hours'
    @set md hrs / 8
  getActivityTypeList: ->
    options = []
    for key, value of @ActivityType
      options.push value
    return options
