'use strict'

const viberTemplate = require('claudia-bot-builder').viberTemplate
const rp = require('minimal-request-promise')

module.exports = function getLocationInfo(city, slug) {
  return rp.get(`https://laptopfriendly.co/${city}/${slug}.json`)
    .then(rawResponse => JSON.parse(rawResponse.body))
    .then(response => {
      const place = response.place

      console.log(place, place.location)

      return [
        `${place.name}`,
        `${place.location.address}, ${place.city.name}`,
        new viberTemplate.Location(parseFloat(place.location.lat), parseFloat(place.location.lng))
          .addReplyKeyboard(true)
            .addKeyboardButton(`<font color="#FFFFFF"><b>Info</b></font>`, `INFO|${city}|${slug}`, 6, 2, {
              TextSize: 'large',
              BgColor: '#f6d95e',
              BgMediaType: 'picture',
              BgMedia: `https://laptopfriendly.co/${place.photos[0].url}`,
              Image: 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/semi_transparent_black.png'
            })
            .addKeyboardButton(`<font color="#FFFFFF"><b>Website</b></font>`, `https://laptopfriendly.co/${city}/${slug}`, 6, 2, {
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
    })
}
