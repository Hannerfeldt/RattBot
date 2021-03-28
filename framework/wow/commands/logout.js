const readUsers = require('../../user/readUsers')
const saveUsers = require('../../user/saveUsers')

module.exports = (message) => {
    /* Reads all the users */
    const users = readUsers()

    /* Find user in user list */
    const userIndex = users.findIndex(user => user.id === message.author.id)
    
    /* Sets the prefix to an empty string */
    users[userIndex].prefix = ''

    /* Save users to users.json */
    saveUsers(users)
}