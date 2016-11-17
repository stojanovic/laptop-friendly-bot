'use strict'

const botBuilder = require('claudia-bot-builder')
const viberTemplate = botBuilder.viberTemplate

function mainMenu() {
  return viberTemplate.Text(`Here's what can I do for you:`)
    .addReplyKeyboard()
    .addKeyboardButton('Locations', 'reply', 'LOCATIONS', 3, 2, '#f6d95e')
    .addKeyboardButton('About LaptopFriendly', 'reply', 'ABOUT_LF', 3, 2, '#343434')
    .addKeyboardButton('Packages', 'reply', 'PACKAGES', 3, 2, '#343434')
    .addKeyboardButton('LaptopFriendly Website', 'open-url', 'https://laptopfriendly.co', 3, 2, '#f6d95e')
    .get()
}

module.exports = botBuilder(() => {
  return [
    `Hello! I am Laptop Friendly bot`,
    mainMenu()
  ]
})
