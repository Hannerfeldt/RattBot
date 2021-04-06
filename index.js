const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
require('dotenv').config()
const getCommand = require('./framework/message/getCommand')
const users = require('./data/users.json')
const { DISCORD_TOKEN } = process.env

client.commands = new Discord.Collection()

client.noPrefixRequired = false
client.oldCommandName = undefined

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))

const prefix = 'nih'
const onCooldown = new Set()
const cooldownTimer = 2000

commandFiles.forEach(file => {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
})

client.on('message', message => {
    /* If message is from bot, ignore it */
    if (message.author.bot || message.channel.name !== 'råttbot') return

    const msgContent = message.content
    let args
    let commandName

    const userIndex = users.findIndex(user => user.id === message.author.id && user.prefix)
    if (userIndex !== -1) {
        commandName = users[userIndex].prefix
        args = msgContent.toLowerCase().split(' ')
    }
    /* Run previouse command and pass in message no prefix required */
    else if (client.noPrefixRequired) {
        commandName = client.oldCommandName
        args = [ msgContent.toLowerCase() ]
    }
    else {
        /* Check if message starts with the correct prefix */
        if (!msgContent.startsWith(prefix)) return

        /* Getting command and argument */
        [ commandName, args ] = getCommand(msgContent, prefix)
    }
    /* If author is on cooldown */
    if (onCooldown.has(message.author.id)) return // message.reply(Math.random() < 0.9 ? `💊 Ta en chillpill 💊` : 'har du ADHD eller?')

    const command = client.commands.get(commandName)
    if (!command) return

    /* Executing command and adding author to cooldown */
    command.execute(message, args, client)
    client.oldCommandName = commandName
    onCooldown.add(message.author.id)
    setTimeout(() => onCooldown.delete(message.author.id), message.author.id === '215948699501592578' ? cooldownTimer*10 : cooldownTimer)
})

client.once('ready', (e) => {
    console.log('⚡RåttBot is online!⚡')
})

client.login(DISCORD_TOKEN)
