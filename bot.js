'use strict'

const botBuilder = require('claudia-bot-builder')
const viberTemplate = botBuilder.viberTemplate

const laptopFriendly = require('./locations.json')

function mainMenu() {
  return new viberTemplate.Text(`Here's what can I do for you:`)
    .addReplyKeyboard()
    .addKeyboardButton('Help', 'reply', 'HELP', 3, 1, '#0cdf47')
    .addKeyboardButton('About LaptopFriendly', 'reply', 'ABOUT_LF', 3, 1, '#d9bd6a')
    .addKeyboardButton('Slack', 'open-url', 'https://laptopfriendly.co?utm_source=viber_bot&utm_medium=laptopfriendly_website', 3, 1, '#78d4b6')
    .addKeyboardButton('Meetup.com', 'open-url', 'https://www.meetup.com/Belgrade-Coworking-Club-by-LaptopFriendly/', 3, 1, '#ed1c40')
    .addKeyboardButton('LaptopFriendly Website', 'open-url', 'https://laptopfriendly.co?utm_source=viber_bot&utm_medium=laptopfriendly_website', 3, 1, '#f6d95e')
    .addKeyboardButton('Premium', 'reply', 'PREMIUM', 3, 1, '#8bc3d9')
    .addKeyboardButton('See all locations', 'reply', 'LOCATIONS', 6, 2, '#899a21')
    .get()
}

function showAllLocations() {
  return laptopFriendly.locations.map(location => new viberTemplate.Url(location.link).get())
}

module.exports = botBuilder((message, originalRequest) => {
  console.log(message, originalRequest)

  if (message.text === 'LOCATIONS')
    return showAllLocations()

  return [
    `Hello! I am Laptop Friendly bot`,
    mainMenu()
  ]
})
