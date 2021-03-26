module.exports = {
    name: 'test',
    description: '...',
    execute(message, args, client) {
        const { id } = message.channel.guild.channels.cache.find(element => element.name.toLowerCase() === args[0])
        const channel = client.channels.cache.get(id)
        if (!channel) return console.error("The channel does not exist!")
        channel.join().then(connection => {
            console.log(connection)
            const dispatcher = connection.play('/assets/skype/soundtest.mp3')
            // dispatcher.on('end', end => voiceChannel.leave())
        }).catch(e => {
            // Oh no, it errored! Let's log it to console :)
            console.error(e)
        })
    }
}
