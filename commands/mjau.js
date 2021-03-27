const apiRequest = require('../framework/message/apiRequest')
module.exports = {
    name: 'mjau',
    description: 'katt',
    apiUrl: 'https://api.thecatapi.com/v1/images/search',
    apiKey: process.env.CAT_TOKEN,
    async execute(message, args) {
        let query = ''
        if (args) {
            const categories = await apiRequest('https://api.thecatapi.com/v1/categories', this.apiKey)
            if (parseInt(args[0]) < categories.length ) query = `?category_ids=${categories[args].id}`
        }
        const data = await apiRequest(this.apiUrl + query, this.apiKey)
        message.channel.send(data.length ? data[0].url : 'Jag e ledsen')
    }
}
