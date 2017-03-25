'use strict'

const viberTemplate = require('claudia-bot-builder').viberTemplate
const rp = require('minimal-request-promise')

module.exports = function getLocationDescription(city, slug) {
  return rp.get(`https://laptopfriendly.co/${city}/${slug}.json`)
    .then(rawResponse => JSON.parse(rawResponse.body))
    .then(response => {
      const place = response.place
      const description = [place.description]

      description.push(new viberTemplate.Text('Anything else you would like to know about this location?')
        .addReplyKeyboard(false)
          .addKeyboardButton(`<font color="#FFFFFF"><b>Website</b></font>`, `https://laptopfriendly.co/${city}/${slug}`, 6, 2, {
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
    })
}
