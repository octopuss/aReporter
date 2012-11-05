###*
  @fileoverview aReporter.domain.Ticket.
###
goog.provide 'aReporter.domain.Ticket'

goog.require 'este.Model'

class aReporter.domain.Ticket extends este.Model

  ###*
    @param {Object=} json
    @constructor
    @extends {este.Model}
  ###
  constructor: (json) ->
    super json

  ###*
    @inheritDoc
  ###
  defaults:
    'title': ''
    'active': false

  ###*
    @inheritDoc
  ###
  schema:
    'title':
      'set': este.model.setters.trim
      'validators':
        'required': este.model.validators.required

  toggleActive: ->
    active = @get 'active'
    @set 'active', !active
