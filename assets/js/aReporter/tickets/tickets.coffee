###*
  @fileoverview aReporter.domain.Tickets.
###
goog.provide 'aReporter.domain.Tickets'

goog.require 'este.Collection'
goog.require 'aReporter.domain.Ticket'

class aReporter.domain.Tickets extends este.Collection

  ###*
    @param {Array=} array
    @constructor
    @extends {este.Collection}
  ###
  constructor: (array) ->
    super array

  ###*
    @inheritDoc
  ###
  model: aReporter.domain.Ticket