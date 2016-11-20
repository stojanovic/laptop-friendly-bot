'use strict'

const viberTemplate = require('claudia-bot-builder').viberTemplate
const laptopFriendly = require('../data/laptopfriendly.json')

module.exports = function showAllLocations(city) {
  var template = new viberTemplate.Text(`There's ${laptopFriendly.locations[city].length} laptopfriendly locations in Belgrade!`)
    .addReplyKeyboard(true)

  laptopFriendly.locations[city].map(location => template.addKeyboardButton(`<b><font color="#FFFFFF">${location.name}</font></b>`, `LOCATION|belgrade|${location.slug}`, 3, 2, {
    TextSize: 'large',
    BgColor: '#f6d95e',
    BgMediaType: 'picture',
    BgMedia: location.thumbnail
  }))

  template.addKeyboardButton(`<font color="#FFFFFF"><b>Back</b></font>`, 'LOCATIONS', 6, 1, {
    TextSize: 'large',
    BgColor: '#343434'
  })

  return template.get()
}
