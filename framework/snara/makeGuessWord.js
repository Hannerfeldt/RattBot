module.exports = (guess, word, correct) => {
    console.log('guess word', guess, word.toLowerCase())
    if (guess[0] !== word.toLowerCase()) return 0
    return word.split('').filter(e => !correct.some(c => e.toLowerCase() === c.toLowerCase())).length
}
