module.exports = (word, correct) => {
    const chosenWordLength = word.split('')
    const victory = chosenWordLength.every(e => correct.find(c => {
        if (e === ' ') return true
        return e.toLowerCase() === c
    }))
    return victory
}
