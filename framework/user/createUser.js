const User = require('../../models/user')

module.exports = (id, name, points, options) => {
    return new User(id, name, points, options)
}