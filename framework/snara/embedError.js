const Discord = require('discord.js')

module.exports = (header, text, hint) => {
    const embededMessage = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Hänga i snara')
        .setThumbnail('https://d6ce0no7ktiq.cloudfront.net/images/preview/2018/11/02/design-30836/template-sticker-600x600.png')
        .addField(`❗❗${header}❗❗`, text)
        .setFooter(hint)
    return embededMessage
}
