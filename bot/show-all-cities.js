'use strict'

const viberTemplate = require('claudia-bot-builder').viberTemplate
const rp = require('minimal-request-promise')

const citesWithImages = ['athens', 'belgrade', 'berlin', 'brighton', 'bucharest', 'kobenhavn-n', 'great-torrington', 'lisbon', 'london', 'novi-sad', 'plovdiv', 'salvador', 'sofia', 'tallinn', 'vienna', 'warsaw', 'zagreb']

module.exports = function showAllCities() {
  return rp.get('https://laptopfriendly.co/cities.json')
    .then(rawResponse => JSON.parse(rawResponse.body))
    .then(response => {
      let cities = response.countries
        .map(country => country.cities.map(city => { city.country = country.country || country.city; return city }))
        .reduce((allCities, city) => allCities.concat(city), [])
        .filter(city => city.slug !== 'other')
        .sort((a, b) => a.name < b.name ? -1 : 1)

      const message = new viberTemplate.Text(`Select a city below or simply share your location`)
        .addReplyKeyboard(true)

      cities.forEach(city => {
        message.addKeyboardButton(`<font color="#FFFFFF"><b>${city.name}, ${city.country}</b></font>`, `CITY|${city.slug}`, 3, cities.length < 18 ? 2 : 1, {
          TextSize: 'large',
          BgColor: '#f6d95e',
          BgMediaType: 'picture',
          BgMedia: citesWithImages.indexOf(city.slug) > -1 ? `https://s3.eu-central-1.amazonaws.com/laptopfriendly/cities/${city.slug}.jpg` : 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/cities/other.jpg',
          Image: 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/semi_transparent_black.png'
        })
      })

      return message
        .addKeyboardButton(`<font color="#FFFFFF"><b>Back</b></font>`, 'MAIN_MENU', 6, 1, {
          TextSize: 'large',
          BgColor: '#343434'
        })
        .get()
    })
}
