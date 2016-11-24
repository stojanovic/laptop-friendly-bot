'use strict'

const viberTemplate = require('claudia-bot-builder').viberTemplate
const mainMenu = require('./main-menu')

module.exports = function about() {
  return [
    `Hello, as you probably know I am LaptopFriendly bot!`,
    `I can tell you about all the locations for LaptopFriendly in Belgrade and I'll be able to do the same for Novi Sad soon. I can also tell you a few things about LaptopFriendly itself and our Premium packages.\n\nThe easiest and the best way to interact with me, at the moment, is to click on the things on custom keyboards I'll present you.\n\nI will probably reply to most of the things you type, but don't expect smart answers :)`,
    `I am still not that smart, but I am cute.`,
    new viberTemplate.Sticker(40126).get(),
    // `If you want to know more about how do I work, you can, I am Open Source, just visit: https://github.com/stojanovic/laptop-friendly-bot`,
    mainMenu(`Here's what we can do for you:`)
  ]
}
