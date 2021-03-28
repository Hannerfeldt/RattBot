const Discord = require('discord.js')

module.exports = (template, thumbnail, image) => {
    const attachmentMob = new Discord.MessageAttachment(`./assets/wow/${thumbnail.path + thumbnail.name}`, thumbnail.name)
    const attachmentImage = new Discord.MessageAttachment(`./assets/wow/${image.path + image.name}`, image.name)

    const embededMessage = new Discord.MessageEmbed()
        .setColor(template.color)
        .setTitle(template.title)
        .attachFiles(attachmentMob)
        .attachFiles(attachmentImage)
        .setThumbnail(`attachment://${thumbnail.name}`)
        .setImage(`attachment://${image.name}`)
        .setFooter(template.footer)
    template.fields.forEach(field => {
        embededMessage.addField(field.name, field.value, field.inline)
    })
    return embededMessage
}
