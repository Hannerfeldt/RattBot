module.exports = (message, prefix) => {
    const fullCommand = message.slice(prefix.length).trim().toLowerCase().split(' ')
    const commandName = fullCommand.shift()
    const args = fullCommand
    return { commandName, args }
}
