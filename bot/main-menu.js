'use strict'

const viberTemplate = require('claudia-bot-builder').viberTemplate

module.exports = function mainMenu(text) {
  return new viberTemplate.Text(text || `Here's what can I do for you:`)
    .addReplyKeyboard(true)
      .addKeyboardButton(`<b>See all locations</b>`, 'LOCATIONS', 6, 2, {
        TextSize: 'large',
        BgColor: '#f6d95e',
        BgMediaType: 'picture',
        BgMedia: 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/lf-buttons-all-locations-icons.png'
      })
      .addKeyboardButton('<b>Become a Premium member</b>', 'PREMIUM', 3, 1, {
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
