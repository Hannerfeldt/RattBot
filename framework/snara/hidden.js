module.exports = (word, correct) => {
    const chosenWordLength = word.split('')
    const hiddenWord = chosenWordLength.map(e => {
        if (e === ' ') return ' '
        else if (correct.find(c => e.toLowerCase() === c)) return e
        else return '⬜'
    }).join(' ')
    return hiddenWord
}
