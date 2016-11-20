'use strict'

const viberTemplate = require('claudia-bot-builder').viberTemplate
const laptopFriendly = require('../data/laptopfriendly.json')

module.exports = function showAllCities() {
  return new viberTemplate.Text(`Select a city below or simply share your location`)
    .addReplyKeyboard(true)
      .addKeyboardButton(`<font color="#FFFFFF"><b>Belgrade (${laptopFriendly.locations.belgrade.length})</b></font>`, 'CITY|belgrade', 6, 2, {
        TextSize: 'large',
        BgColor: '#f6d95e',
        BgMediaType: 'picture',
        BgMedia: 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/belgrade.png'
      })
      .addKeyboardButton(`<font color="#FFFFFF"><b>Novi Sad (${laptopFriendly.locations['novi-sad'].length || 'Coming soon'})</b></font>`, 'CITY|novi-sad', 6, 2, {
        TextSize: 'large',
        BgColor: '#f6d95e',
        BgMediaType: 'picture',
        BgMedia: 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/novi-sad.png'
      })
      .addKeyboardButton(`<font color="#FFFFFF"><b>Back</b></font>`, 'MAIN_MENU', 6, 1, {
        TextSize: 'large',
        BgColor: '#343434'
      })
    .get()
}
