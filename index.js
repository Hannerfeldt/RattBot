const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
require('dotenv').config()
const getCommand = require('./framework/message/getCommand')
const { DISCORD_TOKEN } = process.env

client.commands = new Discord.Collection()

client.noPrefixRequired = false
client.oldCommandName = undefined

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))

const prefix = 'nih'
const onCooldown = new Set()
const cooldownTimer = 3000

commandFiles.forEach(file => {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
})

client.on('message', message => {
    const msgContent = message.content
    let args
    let commandName
    /* Run old command and pass in message */
    if (client.noPrefixRequired) {
        commandName = client.oldCommandName
        args = msgContent
    }
    else {
        /* Check if message is valid command and if author is on cooldown */
        if (!msgContent.startsWith(prefix) || message.author.bot) return
        
        /* Getting command and argument */
        commandName, args = getCommand(msgContent, prefix)
    }
    if (onCooldown.has(message.author.id)) return message.reply(`💊 Ta en chillpill, ${message.author.username} 💊`)

    const command = client.commands.get(commandName)
    if (!command) return

    /* Executing command and adding author to cooldown */
    command.execute(message, args, client)
    client.oldCommandName = commandName
    onCooldown.add(message.author.id)
    setTimeout(() => onCooldown.delete(message.author.id), cooldownTimer)
})

client.once('ready', (e) => {
    console.log('⚡RåttBot is online!⚡')
})

client.login(DISCORD_TOKEN)
