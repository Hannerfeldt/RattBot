const Discord = require('discord.js')

module.exports = () => {
    const embededMessage = new Discord.MessageEmbed()
        .setColor('#ffff00')
        .setTitle('🚧 Under konstruktion 🚧')
        .setThumbnail('https://static.loopia.se/responsive/images/extra_pages/construction.png')
        .addField('Brand new feature comming soon', '🏗 👷 🏗')
    return embededMessage
}
