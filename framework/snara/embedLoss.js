const Discord = require('discord.js')

const emojis = ['🥇','🥈','🥉','🎈']

module.exports = (word, score) => {
    let embededMessage = new Discord.MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Hänga i snara')
        .setThumbnail('https://d6ce0no7ktiq.cloudfront.net/images/preview/2018/11/02/design-30836/template-sticker-600x600.png')
        .addField('💀 Game Over 💀', '\u200b')
        .addField('Ordet var: ', `\`${word}\``)
        .addField('**Leaderboard**', '\u200b')
        .setFooter('🎉 Bättre lycka nästa gång 🎉')
    score.forEach((e,i) => {
        embededMessage.addField(
            `>>> \`\`\`${emojis[i > 3 ? 3 : i]}  ${e.name}\`\`\` \n Poäng: ${e.points} `,
            '\u200b'
        )
    })
    return embededMessage
}
