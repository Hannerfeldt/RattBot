const Discord = require('discord.js')

module.exports = (hidden, guesses, wrong) => {
    const embededMessage = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Hänga i snara')
        .setThumbnail('https://d6ce0no7ktiq.cloudfront.net/images/preview/2018/11/02/design-30836/template-sticker-600x600.png')
        .addField('⬇⬇ Ordet ⬇⬇', '*För att gissa skriv bara din gissning.\n Inget nih-prefix behövs.*')
        .addField(`${hidden}`, '\u200b')
        .addField(`\`\`\`${guesses}\`\`\` gissningar kvar tills 💀`, '\u200b')
        .setFooter(wrong.length === 0 ? '🎮 Låt spelen börja 🎮' : ('❌Felgissningar: ' + wrong.join(' ').toUpperCase() + '❌'))
    return embededMessage
}
