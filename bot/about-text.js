'use strict'

const viberTemplate = require('claudia-bot-builder').viberTemplate
const mainMenu = require('./main-menu')

module.exports = function about() {
  return [
    new viberTemplate.Text(`LaptopFriendly is a is a growing community transforming the co-working landscape. We partner with coffee shops, restaurants and other everyday spaces that meet our high standards for work and productivity.`).get(),
    new viberTemplate.Text(`Why LaptopFriendly?`).get(),
    new viberTemplate.Text(`WORKSPACE VARIETY \n\nWhatever you do, find a workspace that fits you best. All venues include reliable Wi-Fi, ample power sockets, comfy seating areas and more. \n\n\nTIGHT-KNIT COMMUNITY \n\nConnect with dozens of like-minded creatives hiding in your area. Find new clients, discuss ideas, or get relevant feedback on your work. \n\n\nUNLIMITED DRINKS \n\nFrom Basic to Premium, our membership plans cover coffee, tea, smoothies, and more. Pay a fraction of what you'd usually spend on food and beverages. \n\n\nSPECIAL EVENTS \n\nFrom custom workshops to meet-and-greets with industry leaders, we create opportunities for our members to grow. Also, parties.`).get(),
    mainMenu(`Here's what we can do for you:`)
  ]
}
