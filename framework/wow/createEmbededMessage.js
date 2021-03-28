const Discord = require('discord.js')

module.exports = (template) => {
    const embededMessage = new Discord.MessageEmbed()
        .setColor(template.color)
        .setTitle(template.title)
        .setThumbnail(`attachment://${template.thumbnail}`)
        .setImage(template.image)
        .setFooter(template.footer)
    template.fields.forEach(field => {
        embededMessage.addField(field.name, field.value, field.inline)
    })
    return embededMessage
}
