const Discord = require('discord.js')
const fs = require('fs')
const readUsers = require('../framework/user/readUsers')
const login = require('../framework/wow/login')
const createEmbededMessage = require('../framework/wow/createEmbededMessage')
// const attachment = new Discord.MessageAttachment('fileRoute', 'nameOfYourPicture');

// const loadMobs = () => {
//     const mobs = fs.readdirSync('./assets/wow/mobs/')
//     return mobs.map(image => new Discord.MessageAttachment(`./assets/wow/mobs/${image}`, image))
// }

const loadCommands = () => {
    const commandFiles = fs.readdirSync('./framework/wow/commands/').filter(file => file.endsWith('.js'))
    return commandFiles.map(file => ({file: file.slice(0, -3), action: require(`../framework/wow/commands/${file}`)}))
}

module.exports = {
    name:'wow',
    templates: {
        createCharacter: {
            color: '#FFFF00',
            title: 'Create your character',
            fields: [{
                name: 'Type your name',
                value: '\u200b',
                inline: false
            }, {
                name: 'Second field',
                value: '...',
                inline: false
            }],
            footer: 'footer content'
        },
    },
    commands: loadCommands(),
    execute(message, args, client) {
        /* Login to wow */
        if (!this.checkLogin(message.author.id)) {
            login(message.author)
            this.sendMessage(
                message,
                createEmbededMessage(
                    this.templates['createCharacter'],
                    { path:'mobs/', name:'Wolf.webp' },
                    { path:'zones/', name:'durotar.jpeg' }
            ))
            return
        }

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
