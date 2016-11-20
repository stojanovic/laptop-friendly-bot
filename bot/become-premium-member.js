'use strict'

const viberTemplate = require('claudia-bot-builder').viberTemplate

module.exports = function becomePremiumMember() {
  return [
    'All users have access to daily LaptopFriendly deals, which cover reservation and occupancy fees, as well as refreshments.',
    'The deals are paid on arrival by both Basic and Premium users.',
    'For a monthly fee, Premium members get to enjoy additional perks added to each daily deal, gain access to exclusive LaptopFriendly venues and much more!',
    `Here's what you get as basic and premium member:`,
    new viberTemplate.Photo('https://s3.eu-central-1.amazonaws.com/laptopfriendly/perks.png', 'Basic vs Premium membership')
      .addReplyKeyboard(true)
        .addKeyboardButton(`<font color="#FFFFFF"><b>More info about Premium membership</b></font>`, `https://laptopfriendly.co/en/membership`, 6, 2, {
          TextSize: 'large',
          BgColor: '#f6d95e'
        })
        .addKeyboardButton(`<font color="#FFFFFF"><b>Back</b></font>`, `MAIN_MENU`, 6, 1, {
          TextSize: 'large',
          BgColor: '#343434'
        })
      .get()
  ]
}
