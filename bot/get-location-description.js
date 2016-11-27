'use strict'

const viberTemplate = require('claudia-bot-builder').viberTemplate
const laptopFriendly = require('../data/laptopfriendly.json')

module.exports = function getLocationDescription(city, slug) {
  let location = laptopFriendly.locations[city].find(location => location.slug === slug)

  let description = location.description

  description.push(new viberTemplate.Text('Anything else you would like to know about this location?')
    .addReplyKeyboard(false)
      .addKeyboardButton(`<font color="#FFFFFF"><b>Prices</b></font>`, `PRICE|${city}|${slug}`, 6, 1, {
        TextSize: 'large',
        BgColor: '#f6d95e',
        BgMediaType: 'picture',
        BgMedia: 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/lf-dark-covered-drinks.jpg'
      })
      .addKeyboardButton(`<font color="#FFFFFF"><b>Website</b></font>`, location.link, 6, 1, {
        TextSize: 'large',
        BgColor: '#f6d95e',
        BgMediaType: 'picture',
        BgMedia: 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/lf-dark-intro-lf2.jpg'
      })
      .addKeyboardButton(`<font color="#FFFFFF"><b>Back</b></font>`, `LOCATION|${city}|${slug}`, 6, 1, {
        TextSize: 'large',
        BgColor: '#343434'
      })
    .get())

  return description
}
