'use strict'

const botBuilder = require('claudia-bot-builder')
const botFlow = require('./bot/flow')

module.exports = botBuilder((message, originalRequest) => {
  console.log(message, originalRequest)

  return botFlow(message)
})
