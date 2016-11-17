'use strict';

var botBuilder = require('claudia-bot-builder');

module.exports = botBuilder(message => {
  return `Hello! You sent ${message.text}`;
});

