const User = require('../../models/user')

module.exports = (id, name, points) => {
    return new User(id, name, points)
}