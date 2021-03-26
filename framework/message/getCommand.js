module.exports = (message, prefix) => {
    const fullCommand = message.slice(prefix.length).trim().toLowerCase().split(' ')
    const command = fullCommand.shift()
    const args = fullCommand
    return { command, args }
}
