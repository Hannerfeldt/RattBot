module.exports = (guess, correct) => {
    guess[0].split('').forEach(e => {
        if (!correct.find(c => e.toLowerCase() === c) && e !== ' ') correct.push(e.toLowerCase())
    })
    return correct 
}
