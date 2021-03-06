const Discord = require('discord.js')

const emojis = ['๐ฅ','๐ฅ','๐ฅ','๐']

module.exports = (word, score) => {
    const embededMessage = new Discord.MessageEmbed()
        .setColor('#00ff99')
        .setTitle('Hรคnga i snara')
        .setThumbnail('https://d6ce0no7ktiq.cloudfront.net/images/preview/2018/11/02/design-30836/template-sticker-600x600.png')
        .addField('๐ Hurra! Ni vann ๐', '\u200b')
        .addField('Ordet var: ', `\`${word}\``)
        .addField('**Leaderboard**', '\u200b')
        .setFooter('๐ Bra jobbat ๐')
    score.forEach((e,i) => {
        embededMessage.addField(
            `>>> \`\`\`${emojis[i > 3 ? 3 : i]}  ${e.name}\`\`\` \n Poรคng: ${e.points} `,
            '\u200b'
        )
    })
    return embededMessage
}
