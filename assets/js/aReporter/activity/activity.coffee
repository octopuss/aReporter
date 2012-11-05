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
  ActivityTypeEnum =
    PROGRAMMING : 'Programming'
    COMMUNICATION : 'Communication'
    TESTING : 'Testing'
    OTHER : 'Other'

  ###*
    Activity type
  ###
  activityType:ActivityTypeEnum

  ###*
    @inheritDoc
  ###
  defaults:
    'hours': 0
    'md':0
    'date': new Date
    'title':''
    'description':''
    'type':ActivityTypeEnum.PROGRAMMING
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
  getActivityTypesList:->
    return ActivityTypeEnum.getValues
