'use strict'

const viberTemplate = require('claudia-bot-builder').viberTemplate
const laptopFriendly = require('../data/laptopfriendly.json')
const mainMenu = require('./main-menu')

function toRad(num) {
  return num * Math.PI / 180
}

function getDistance(start, end) {
  const decimals = 2
  const earthRadius = 6371 // km

  const dLat = toRad(end.lat - start.lat)
  const dLon = toRad(end.lon - start.lon)
  const lat1 = toRad(start.lat)
  const lat2 = toRad(end.lat)

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = earthRadius * c
  return Math.round(d * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

module.exports = function closestTo(currentLocation) {
  let locations = laptopFriendly.locations.belgrade.map(location => {
    location.distance = getDistance(currentLocation, { lat: location.lat, lon: location.lng })
    return location
  })
  locations.sort((a, b) => {
    if (a.distance < b.distance)
      return -1
    if (a.distance > b.distance)
      return 1
    return 0
  })
  let closeLocations = locations.filter(location => location.distance <= 5)

  if (!closeLocations.length) {
    return [
      new viberTemplate.Sticker(40124).get(),
      `There's no LaptopFriendly places near you :(\nClosest one is ${locations[0].distance}km away`,
      `If you want to help us to get to your city or you have any recommendation send an email to crew@laptopfriendly.co`,
      mainMenu(`Here's what I can do in meantime:`)
    ]
  } else if (closeLocations.length > 6) {
    closeLocations = closeLocations.slice(0, 6)
  }

  var template = new viberTemplate.Text(`There's ${closeLocations.length} LaptopFriendly locations near you!`)
    .addReplyKeyboard(true)

  closeLocations.map(location => template.addKeyboardButton(`<b><font color="#FFFFFF">${location.name} (${location.distance}km)</font></b>`, `LOCATION|belgrade|${location.slug}`, 3, 2, {
    TextSize: 'large',
    BgColor: '#f6d95e',
    BgMediaType: 'picture',
    BgMedia: location.thumbnail
  }))

  template.addKeyboardButton(`<font color="#FFFFFF"><b>Back to the main menu</b></font>`, 'MAIN_MENU', 6, 1, {
    TextSize: 'large',
    BgColor: '#343434'
  })

  return template.get()
}
