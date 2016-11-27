'use strict'

const viberTemplate = require('claudia-bot-builder').viberTemplate
const laptopFriendly = require('../data/laptopfriendly.json')

module.exports = function getLocationInfo(city, slug) {
  var location = laptopFriendly.locations[city].find(location => location.slug === slug)
  return [
    `Prices for ${location.name}:`,
    location.prices.join('\n'),
    `Amenities:`,
    location.amenities.join('\n'),
    new viberTemplate.Text(`Ready to book and work from ${location.name}? :)`)
      .addReplyKeyboard(false)
        .addKeyboardButton(`<font color="#FFFFFF"><b>Info</b></font>`, `INFO|${city}|${slug}`, 6, 1, {
          TextSize: 'large',
          BgColor: '#f6d95e',
          BgMediaType: 'picture',
          BgMedia: location.thumbnail
        })
        .addKeyboardButton(`<font color="#FFFFFF"><b>Website</b></font>`, location.link, 6, 1, {
          TextSize: 'large',
          BgColor: '#f6d95e',
          BgMediaType: 'picture',
          BgMedia: 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/lf-dark-intro-lf2.jpg'
        })
        .addKeyboardButton(`<font color="#FFFFFF"><b>Back</b></font>`, `CITY|${city}`, 6, 1, {
          TextSize: 'large',
          BgColor: '#343434'
        })
      .get()
  ]
}
