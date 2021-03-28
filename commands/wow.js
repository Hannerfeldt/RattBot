const fs = require('fs')
const readUsers = require('../framework/user/readUsers')
const login = require('../framework/wow/login')
const createEmbededMessage = require('../framework/wow/createEmbededMessage')
const templates = require('../framework/wow/embededTemplates/templates.json')

const loadCommands = () => {
    const commandFiles = fs.readdirSync('./framework/wow/commands/').filter(file => file.endsWith('.js'))
    return commandFiles.map(file => ({file: file.slice(0, -3), action: require(`../framework/wow/commands/${file}`)}))
}

module.exports = {
    name:'wow',
    commands: loadCommands(),
    execute(message, args, client) { 
        if (!this.checkLogin(message.author.id)) return 
            login(message.author), 
            this.sendMessage(
                message, 
                createEmbededMessage(templates['createCharacter'])
            )

        const command = args.shift()
        try {
            const { action } = this.commandHandler(command)
            action(message, args)
        } catch(e) {
            console.error(e.message)
            this.sendError(message, e.message)
        }
    },
    checkLogin(id) {
        const users = readUsers()
        /* Find user in user list */
        const user = users.find(user => user.id === id)
        /* Return users login status */
        return user?.prefix === 'wow' || false
    },
    commandHandler(commandName) {
        return this.commands.find(c => c.file === commandName)
    }, 
    sendMessage(message, embededMessage) {
        message.channel.send(embededMessage)
    },
    sendError(message, error) {
        message.reply(error)
    }
}
