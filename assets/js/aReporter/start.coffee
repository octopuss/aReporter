###*
  @fileoverview Start script of the aReporter application

###

goog.provide 'aReporter.start'

goog.require 'aReporter.layout.View'
goog.require 'este.dev.Monitor.create'
goog.require 'este.app.create'

###*
  @param {Object} data JSON from server
###
aReporter.start = (data) ->

  ###
    This is example of goog.DEBUG, a constant overidable. true for dev, false
    for production. Closure compiler will strip monitor code for production.
  ###
  if goog.DEBUG
    este.dev.Monitor.create()

  forceHash = false
  app = este.app.create 'aReporter', [
    aReporter.layout.View
  ], forceHash
  app.localStorageNamespace = 'aReporter'
  app.urlEnabled = false
  app.start()





# ensures the symbol will be visible after compiler renaming
goog.exportSymbol 'aReporter.start', aReporter.start