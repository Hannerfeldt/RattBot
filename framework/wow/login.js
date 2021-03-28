const readUsers = require('../user/readUsers')
const saveUsers = require('../user/saveUsers')
const createUser = require('../user/createUser')

module.exports = (author) => {
    /* Get all the users */
    const users = readUsers()

    /* Find user in user list */
    const userIndex = users.findIndex(user => user.id === author.id)
    
    /* If found update user points */
    if (userIndex !== -1) users[userIndex].prefix = 'wow'

    /* Else create new user and add to user list */
    else users.push(createUser(author.id, author.username, 0,  'wow' ))

    /* Save users to users.json */
    saveUsers(users)
}
