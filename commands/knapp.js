const fs = require('fs')
module.exports = {
    name: 'knapp',
    description: 'nihihihi',
    execute(message) {
        const imageList = fs.readdirSync('./assets/knapp')
        const randomImage = imageList[parseInt(Math.random() * (imageList.length))]
        message.channel.send({files: [`./assets/knapp/${randomImage}`]})
    }
}
