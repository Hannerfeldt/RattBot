module.exports = class User {
    constructor(id, name, points) {
        this.id = id
        this.name = name
        this.points = points || 0
    }
    updatePoints(amount) {
        this.points += amount
    }
}