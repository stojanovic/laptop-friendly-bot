'use strict'

const viberTemplate = require('claudia-bot-builder').viberTemplate
const laptopFriendly = require('../data/laptopfriendly.json')
const jsesc = require('jsesc')

module.exports = function getLocationDescription(city, slug) {
  let location = laptopFriendly.locations[city].find(location => location.slug === slug)

  return new viberTemplate.Text(jsesc(location.description))
    .addReplyKeyboard(true)
      .addKeyboardButton(`<font color="#FFFFFF"><b>Price</b></font>`, `PRICE|${city}|${slug}`, 6, 1, {
        TextSize: 'large',
        BgColor: '#f6d95e'
      })
      .addKeyboardButton(`<font color="#FFFFFF"><b>Website</b></font>`, location.link, 6, 1, {
        TextSize: 'large',
        BgColor: '#f6d95e'
      })
      .addKeyboardButton(`<font color="#FFFFFF"><b>Back</b></font>`, `LOCATION|${city}|${slug}`, 6, 1, {
        TextSize: 'large',
        BgColor: '#343434'
      })
    .get()
}
