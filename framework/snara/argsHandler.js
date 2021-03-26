module.exports = (args, regEx, correct, wrong, message) => {
    /* Missing argument */
    if (args.length === 0 ) return `${message.author.username}, du måste gissa på en bokstav eller siffra`

    /* More then one argument */
    if (args.length > 1) return
    // `${message.author.username}, en sak i taget`

    /*  */
    if (args[0].split('').length > 1) return
    // `${message.author.username}, ska jag fatta det där?`

    /*  */
    const guess = args[0].split('')[0]

    /* Not matching regex */
    if (!regEx.test(guess)) return `${message.author.username}, bara bokstäver och siffror`

    /* Already guessed */
    if(correct.find(e => e === guess) || wrong.find(e => e === guess)) return `${message.author.username}, ${guess.toUpperCase()} har redan gissats på`

    return undefined
}
