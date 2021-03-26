const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'sam',
    execute(message) {
        fetch('https://steppschuh-json-porn-v1.p.rapidapi.com/image/5817567562170368/400.jpg')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const embededMessage = new Discord.MessageEmbed()
                    .setColor('#ffc0cb')
                    .setTitle('Weeb test')
                    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/c/c8/Wikipe-tan_full_length.png')
                    .addField(data.results[0].question, '\u200b')
                    const options = data.results[0].incorrect_answers.concat(data.results[0].correct_answer)
                    console.log(options)
                options.forEach((e, i)=>
                    embededMessage.addField('\u200b', `\`\`\`${i+1}: ${e}\`\`\``)
                )
                message.channel.send(embededMessage)
            })
    }
}
