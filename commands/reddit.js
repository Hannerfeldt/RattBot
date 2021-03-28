const apiRequest = require('../framework/message/apiRequest')

module.exports = {
    name: 'reddit',
    description: 'get random reddit post',
    apiUrl: 'https://www.reddit.com/r/popular/top.json',
    async execute(message, args) {
        if (args.length) this.apiUrl = `https://www.reddit.com/r/${args}/top.json`
        else this.apiUrl = 'https://www.reddit.com/r/popular/top.json'
        const data = await apiRequest(this.apiUrl)
        const rng = parseInt(Math.random() * data.data.children.length)
        const media = data.data.children[rng].data.is_video ? data.data.children[rng].data.secure_media.reddit_video.fallback_url : data.data.children[rng].data.url_overridden_by_dest
        message.channel.send(media)
    }
}
