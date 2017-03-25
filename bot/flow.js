'use strict'

const mainMenu = require('./main-menu')
const aboutText = require('./about-text')
const help = require('./help')
const showAllCities = require('./show-all-cities')
const showAllLocations = require('./show-all-locations')
const getLocationInfo = require('./get-location-info')
const getLocationPrices = require('./get-location-prices')
const getLocationDescription = require('./get-location-description')
const becomePremiumMember = require('./become-premium-member')
const closestTo = require('./closest-to')
const isUrl = require('./helpers/is-url')
const apiAiQuery = require('./helpers/api-ai')

module.exports = function botFlow(message, originalRequest) {
  if (isUrl(message.text)) // Do nothing if user sends an url, because it's a reply to an URL button
    return true

  if (message.text === 'MAIN_MENU')
    return mainMenu()

  if (message.text === 'ABOUT_LF')
    return aboutText()

  if (message.text === 'LOCATIONS')
    return showAllCities()

  if (message.text === 'PREMIUM')
    return becomePremiumMember()

  if (message.text === 'HELP')
    return help()

  if (/^CITY\|[a-z0-9-]{2,}$/.test(message.text))
    return showAllLocations(message.text.replace('CITY|', ''))

  if (/^LOCATION\|[a-z0-9-]{2,}\|[a-z0-9-]{2,}$/.test(message.text)) {
    let data = message.text.split('|')
    return getLocationInfo(data[1], data[2])
  }

  if (/^INFO\|[a-z0-9-]{2,}\|[a-z0-9-]{2,}$/.test(message.text)) {
    let data = message.text.split('|')
    return getLocationDescription(data[1], data[2])
  }

  if (/^PRICE\|[a-z0-9-]{2,}\|[a-z0-9-]{2,}$/.test(message.text)) {
    let data = message.text.split('|')
    return getLocationPrices(data[1], data[2])
  }

  if (!message.text && message.originalRequest.message.type === 'location')
    return closestTo(message.originalRequest.message.location)

  return apiAiQuery(message.text, message.sender, originalRequest.env.apiAi)
    .then(response => {
      if (response.action === 'smalltalk.greetings')
        return [
          `Hello! I am Laptop Friendly bot`,
          mainMenu()
        ]

      return response.reply
    })
    .catch(() => {
      return [
        `Sorry, I don't understand`,
        mainMenu()
      ]
    })
}
