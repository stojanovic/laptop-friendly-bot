'use strict'

const botBuilder = require('claudia-bot-builder')
const viberTemplate = botBuilder.viberTemplate

const laptopFriendly = require('./locations.json')

function mainMenu() {
  return new viberTemplate.Text(`Here's what can I do for you:`)
    .addReplyKeyboard(true)
      .addKeyboardButton(`<b>See all locations</b>`, 'LOCATIONS', 6, 2, {
        TextSize: 'large',
        BgColor: '#f6d95e',
        BgMediaType: 'picture',
        BgMedia: 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/lf-buttons-all-locations-icons.png'
      })
      .addKeyboardButton('<b>Become a Premium user</b>', 'PREMIUM', 3, 1, {
        BgColor: '#7aa2d3',
        BgMediaType: 'picture',
        BgMedia: 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/lf-buttons-premium.png'
      })
      .addKeyboardButton('<b>LaptopFriendly Website</b>', 'https://laptopfriendly.co?utm_source=viber_bot&utm_medium=laptopfriendly_website', 3, 1, {
        BgColor: '#d9bd6a',
        BgMediaType: 'picture',
        BgMedia: 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/lf-buttons-website.png'
      })
      .addKeyboardButton('Meetup.com', 'https://www.meetup.com/Belgrade-Coworking-Club-by-LaptopFriendly/', 3, 1, {
        BgColor: '#ed1c40'
      })
      .addKeyboardButton('Slack', 'https://laptopfriendly.co?utm_source=viber_bot&utm_medium=laptopfriendly_website', 3, 1, {
        BgColor: '#78d4b6'
      })
      .addKeyboardButton('About LaptopFriendly', 'ABOUT_LF', 3, 1, {
        BgColor: '#d9bd6a'
      })
      .addKeyboardButton('Help', 'HELP', 3, 1, {
        BgColor: '#0cdf47'
      })
    .get()
}

function showAllCities() {
  return new viberTemplate.Text(`Select a city below or simply share your location`)
    .addReplyKeyboard(true)
      .addKeyboardButton(`<font color="#FFFFFF"><b>Belgrade (${laptopFriendly.locations.belgrade.length})</b></font>`, 'CITY|belgrade', 6, 2, {
        TextSize: 'large',
        BgColor: '#f6d95e',
        BgMediaType: 'picture',
        BgMedia: 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/belgrade.png'
      })
        .addKeyboardButton(`<font color="#FFFFFF"><b>Novi Sad (${laptopFriendly.locations['novi-sad'].length})</b></font>`, 'CITY|novi-sad', 6, 2, {
          TextSize: 'large',
          BgColor: '#f6d95e',
          BgMediaType: 'picture',
          BgMedia: 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/novi-sad.png'
        })
    .get()
}

function showAllLocations(city) {
  var template = new viberTemplate.Text(`There's ${laptopFriendly.locations[city].length} laptopfriendly locations in Belgrade!`)
    .addReplyKeyboard(true)

  laptopFriendly.locations[city].map(location => template.addKeyboardButton(`<b><font color="#FFFFFF">${location.name}</font></b>`, `LOCATION|belgrade|${location.slug}`, 6, 2, {
    TextSize: 'large',
    BgColor: '#f6d95e',
    BgMediaType: 'picture',
    BgMedia: location.thumbnail
  }))

  return template.get()
}

function getLocationInfo(city, slug) {
  var location = laptopFriendly.locations[city].find(location => location.slug === slug)
  return [
    `${location.name}`,
    `${location.address}, Belgrade`,
    new viberTemplate.Location(location.lat, location.lng)
      .addReplyKeyboard(true)
        .addKeyboardButton(`<font color="#FFFFFF"><b>Working hours</b></font>`, 'WH', 3, 1, {
          TextSize: 'large',
          BgColor: '#7aa2d3'
        })
        .addKeyboardButton(`<font color="#FFFFFF"><b>Gallery</b></font>`, 'GALLERY', 3, 1, {
          TextSize: 'large',
          BgColor: '#7aa2d3'
        })
        .addKeyboardButton(`<font color="#FFFFFF"><b>Info</b></font>`, 'INFO', 3, 1, {
          TextSize: 'large',
          BgColor: '#7aa2d3'
        })
        .addKeyboardButton(`<font color="#FFFFFF"><b>Price</b></font>`, 'PRICE', 3, 1, {
          TextSize: 'large',
          BgColor: '#7aa2d3'
        })
        .addKeyboardButton(`<font color="#FFFFFF"><b>Book</b></font>`, `BOOK|belgrade|${location.slug}`, 6, 2, {
          TextSize: 'large',
          BgColor: '#f6d95e'
        })
      .get()
  ]
}

module.exports = botBuilder((message, originalRequest) => {
  console.log(message, originalRequest)

  if (message.text === 'LOCATIONS')
    return showAllCities()

  if (/^CITY\|[a-z0-9-]{2,}$/.test(message.text)) {
    console.log('city')
    return showAllLocations(message.text.replace('CITY|', ''))
  }

  if (/^LOCATION\|[a-z0-9-]{2,}|[a-z0-9-]{2,}$/.test(message.text)) {
    var data = message.text.split('|')
    console.log(data)
    return getLocationInfo(data[1], data[2])
  }

  return [
    `Hello! I am Laptop Friendly bot`,
    mainMenu()
  ]
})
