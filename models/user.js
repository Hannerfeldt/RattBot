module.exports = class User {
    constructor(id, name, points, prefix) {
        this.id = id
        this.name = name
        this.points = points || 0
        this.prefix = prefix || ''
    }
}
