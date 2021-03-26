module.exports = (message) => {
    if ((!msgContent.startsWith(prefix) || !noPrefix) || message.author.bot) return
    if (onCooldown.has(message.author.id)) return message.reply('ta en chillpill 💊')
    return { command, args }
}
