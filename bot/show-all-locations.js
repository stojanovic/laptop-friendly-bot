'use strict'

const viberTemplate = require('claudia-bot-builder').viberTemplate
const mainMenu = require('./main-menu')
const rp = require('minimal-request-promise')

module.exports = function showAllLocations(city) {
  return rp.get(`https://laptopfriendly.co/${city}.json`)
    .then(rawResponse => JSON.parse(rawResponse.body))
    .then(response => {
      if (!response.places.length)
        return [
          `${city} is coming soon :)`,
          mainMenu(`Here's what can I do for you in the meantime:`)
        ]

      const template = new viberTemplate.Text(`There are ${response.places.length} laptopfriendly locations there!`)
        .addReplyKeyboard(true)

      response.places.forEach(location => {
        return template.addKeyboardButton(`<b><font color="#FFFFFF">${location.name}</font></b>`, `LOCATION|${city}|${location.slug}`, 3, response.places.length < 18 ? 2 : 1, {
          TextSize: 'large',
          BgColor: '#f6d95e',
          BgMediaType: 'picture',
          BgMedia: `https://laptopfriendly.co/${location.thumbnail}`,
          Image: 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/semi_transparent_black.png'
        })
      })

      template.addKeyboardButton(`<font color="#FFFFFF"><b>Back</b></font>`, 'LOCATIONS', 6, 1, {
        TextSize: 'large',
        BgColor: '#343434'
      })

      return template.get()
    })
}
