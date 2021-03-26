const Discord = require('discord.js')
const getCommand = require('./framework/message/getCommand')
const User = require('./models/user')

const client = new Discord.Client()

const fs = require('fs')

const prefix = 'nih'

client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))

const onCooldown = new Set()
const cooldownTimer = 3000

commandFiles.forEach(file => {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
})

client.on('message', message => {
    const msgContent = message.content
    /* Check if message is valid command and if author is on cooldown */
    if (!msgContent.startsWith(prefix) || message.author.bot) return
    if (onCooldown.has(message.author.id)) return message.reply('ta en chillpill 💊')

    /* Getting command and argument */
    const { command, args } = getCommand(msgContent, prefix)
    if (!client.commands.get(command)) return

    /* Executing command and adding author to cooldown */
    client.commands.get(command).execute(message, args, client)
    onCooldown.add(message.author.id)
    setTimeout(() => onCooldown.delete(message.author.id), cooldownTimer)
})

client.once('ready', (e) => {
    console.log('⚡RåttBot is online!⚡')
})

client.login('ODIwMzM0MzgyNDUxNTIzNjI2.YEzp7Q.Cjg688dNbhJVRxcETUlVAiuIzGQ')
