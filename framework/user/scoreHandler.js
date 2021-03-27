const readUsers = require('./readUsers')
const saveUsers = require('./saveUsers')
const createUser = require('./createUser')

module.exports = (points, author) => {
    /* Get all the users */
    const users = readUsers()

    /* Find user in user list */
    const userIndex = users.findIndex(user => user.id === author.id)

    /* If found update user points */
    if (userIndex !== -1) users[userIndex].points += points

    /* Else create new user and add to user list */
    else users.push(createUser(author.id, author.username, points))

    /* Save users to users.json */
    saveUsers(users)
    /* Return top 10 users scores */
    return users.sort((a, b) => b.points - a.points).slice(0, 9)
}
