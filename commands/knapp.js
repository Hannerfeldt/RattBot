const fs = require('fs')
module.exports = {
    name: 'knapp',
    description: 'nihihihi',
    blackList: [],
    whiteList: [],
    execute(message) {
        /* Loads all media from the knapp directory */
        const imageList = fs.readdirSync('./assets/knapp')
        /* Create whitelist with indexes tied to the media  */
        if(!this.whiteList.length) this.whiteList = [...Array(imageList.length).keys()]
        /* Random number with range of whitelist length */
        const rng = parseInt(Math.random() * (this.whiteList.length))
        /* Gets media using the random number */
        const randomImage = imageList[this.whiteList[rng]]
        /* If blacklist is full remove the oldest/first index and add it back to the whitelist in the correct position */
        if (this.blackList.length === imageList.length - 1) this.whiteList.splice((this.blackList[0] - 1), 0, this.blackList.splice(0, 1)[0])
        /* Adds new index to the blacklist and removes it from the whitelist */
        this.blackList.push(this.whiteList.splice(this.whiteList.findIndex(e => e === this.whiteList[rng]), 1)[0])
        /* Sends media to channel */
        message.channel.send({files: [`./assets/knapp/${randomImage}`]})
    }
}
