###*
  @fileoverview aReporter.domain.Activities.
###
goog.provide 'aReporter.domain.Activities'

goog.require 'este.Collection'
goog.require 'aReporter.domain.Activity'

class aReporter.domain.Activities extends este.Collection

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
  model: aReporter.domain.Activity