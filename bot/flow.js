'use strict'

const mainMenu = require('./main-menu')
const showAllCities = require('./show-all-cities')
const showAllLocations = require('./show-all-locations')
const getLocationInfo = require('./get-location-info')
const getLocationDescription = require('./get-location-description')

module.exports = function botFlow(message) {
  if (message.text === 'MAIN_MENU')
    return mainMenu()

  if (message.text === 'LOCATIONS')
    return showAllCities()

  if (/^CITY\|[a-z0-9-]{2,}$/.test(message.text)) {
    console.log('city')
    return showAllLocations(message.text.replace('CITY|', ''))
  }

  if (/^LOCATION\|[a-z0-9-]{2,}\|[a-z0-9-]{2,}$/.test(message.text)) {
    let data = message.text.split('|')
    return getLocationInfo(data[1], data[2])
  }

  if (/^INFO\|[a-z0-9-]{2,}\|[a-z0-9-]{2,}$/.test(message.text)) {
    let data = message.text.split('|')
    return getLocationDescription(data[1], data[2])
  }

  return [
    `Hello! I am Laptop Friendly bot`,
    mainMenu()
  ]
}
