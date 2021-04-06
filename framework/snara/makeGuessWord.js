module.exports = (guess, word, correct) => {
    if (guess[0] !== word.toLowerCase()) return 0
    return word.split('').filter(e => !correct.some(c => e.toLowerCase() === c.toLowerCase())).length
}
