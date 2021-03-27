module.exports = (guess, regEx, correct, wrong, message) => {
    /* Missing argument 
        if (args.length === 0 ) return `${message.author.username}, du måste gissa på en bokstav eller siffra`
        const guess = args[0].split('')
    */

    /*  */
    if (guess.length > 1) return

    /* Not matching regex */
    if (!regEx.test(guess)) return `${message.author.username}, bara bokstäver och siffror`

    /* Already guessed */
    if(correct.find(e => e === guess) || wrong.find(e => e === guess)) return `${message.author.username}, ${guess.toUpperCase()} har redan gissats på`

    return undefined
}
