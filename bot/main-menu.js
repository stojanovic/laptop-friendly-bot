'use strict'

const viberTemplate = require('claudia-bot-builder').viberTemplate

module.exports = function mainMenu(text) {
  return new viberTemplate.Text(text || `Here's what can I do for you:`)
    .addReplyKeyboard(true)
      .addKeyboardButton(`<font color="#FFFFFF"><b>See all locations</b></font>`, 'LOCATIONS', 6, 2, {
        TextSize: 'large',
        BgColor: '#f6d95e',
        BgMediaType: 'picture',
        BgMedia: 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/lf-dark-intro-lf2.jpg'
      })
      .addKeyboardButton('<font color="#FFFFFF"><b>Become a Premium member</b></font>', 'PREMIUM', 3, 1, {
        BgColor: '#7aa2d3',
        BgMediaType: 'picture',
        BgMedia: 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/lf-dark-covered-drinks.jpg'
      })
      .addKeyboardButton('<font color="#FFFFFF"><b>LaptopFriendly Website</b></font>', 'https://laptopfriendly.co', 3, 1, {
        BgColor: '#d9bd6a',
        BgMediaType: 'picture',
        BgMedia: 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/lf-dark-vibrant-workspace.jpg'
      })
      .addKeyboardButton('<font color="#FFFFFF"><b>Meetup.com</b></font>', 'https://www.meetup.com/Belgrade-Coworking-Club-by-LaptopFriendly/', 3, 1, {
        BgColor: '#ed1c40',
        BgMediaType: 'picture',
        BgMedia: 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/lf-dark-awesome-community.jpg'
      })
      .addKeyboardButton('<font color="#FFFFFF"><b>Slack</b></font>', 'https://laptopfriendly-slackin.herokuapp.com', 3, 1, {
        BgColor: '#78d4b6',
        BgMediaType: 'picture',
        BgMedia: 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/lf-dark-special-events.jpg'
      })
      .addKeyboardButton('<font color="#FFFFFF"><b>About LaptopFriendly</b></font>', 'ABOUT_LF', 3, 1, {
        BgColor: '#d9bd6a',
        BgMediaType: 'picture',
        BgMedia: 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/lf-dark-barrique.jpg'
      })
      .addKeyboardButton('<font color="#FFFFFF"><b>Help</b></font>', 'HELP', 3, 1, {
        BgColor: '#0cdf47',
        BgMediaType: 'picture',
        BgMedia: 'https://s3.eu-central-1.amazonaws.com/laptopfriendly/lf-dark-pepper.jpg'
      })
    .get()
}
