const Discord = require('discord.js')
const fetch = require('node-fetch')
const embedConstruction = require('../framework/message/embedUnderConstruction')
module.exports = {
    name: 'sam',
    execute(message) {
        const embededMessage = embedConstruction()
        message.channel.send(embededMessage)
    }
}
