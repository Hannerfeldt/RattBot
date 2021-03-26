const Discord = require('discord.js')
const init = require('../framework/snara/init')
const hidden = require('../framework/snara/hidden')
const makeGuessLetter = require('../framework/snara/makeGuessLetter')
const makeGuessWord = require('../framework/snara/makeGuessWord')
const victory = require('../framework/snara/victory')
const embedDefault = require('../framework/snara/embedDefault')
const embedError = require('../framework/snara/embedError')
const embedVictory = require('../framework/snara/embedVictory')
const embedLoss = require('../framework/snara/embedLoss')
const argsHandler = require('../framework/snara/argsHandler')
const scoreHandler = require('../framework/user/scoreHandler')

module.exports = {
    name: 'snara',
    description: 'hängagubbe',
    words: [
        'Systembolaget', 'Gitarr', 'Anna Lund', 'Rullstol', 'Fönster', 'Plastpåse', 'Jeansjacka', 'Kebab', 'Hamza',
        'Jeppeg', 'Gitarr', 'Råtta', 'Molotov Cocktail', 'Knapp', 'Tangentbord', 'Mus', 'Röv', 'Penis', 'Tuttar', 'Jonathan',
        'Among us', 'Frankrike', 'Eddie Palmer Pocket Pussy', 'Äpple', 'Pizza', 'New York', 'gräs', 'knark', 'girig',
        'alf nyberg', 'förhud', 'leka', 'dum', 'horunge', 'kidnappning', 'hudkräm', 'Jakob Konnbjer', 'Enskede', 'Estet',
        'Snara', 'Spartan', 'Eddie Palmer', 'Pocketpussy', 'Hoppa på huvud', 'Skolskjutare', 'Barnens Ö', 'Triangelparken',
        'Weed', 'Molotov Cocktail', 'Coomer', 'Doomer', 'Boomer', 'Zoomer', 'Skate 3', 'Asiat', 'SATS', 'snål', 'drutten',
        'bea', 'Barba', 'Alfred', 'Bea', 'Alf nyberg', 'Jonis', 'Kinagunga', 'Globen', 'Fotboll', 'Joint', 'Among us', 'Björn',
        'Råtta', 'Reptil', 'Jonis', 'Bobby', 'skolskjutare', 'skjutning', 'schling', 'nugget', 'dragkedja', 'maria pool',
        'golvläggare', 'doge coin', 'bilnycklar', 'speldesigner', 'ekonomistudent', 'hermans storebror', 'guitar hero',
        'vinterbad', 'Devourer', 'Sax', 'Nils Werge', 'Klätterställning', 'pokemon', 'beyblade', 'anton', 'tindermannen',
        'skateboard', 'djaffdjaff', 'lovisa', 'klassfest', 'world of warcraft', 'xphania', 'vasilis gotevas', 'trapphus','äcklig',
        'ådrig', 'alfa', 'lich king', 'snek', 'stockholms blodbad', 'dummare', 'tentakel', 'minihamster', 'kebaben',
        'extra kött', 'röd sås', 'vit sås', 'specialsås', 'blizzard', 'vit sås', 'harold and kumar', 'harold and coomar',
        'isbad', 'isvak', 'propeller', 'drunkna', 'helikopter', 'avhuggen', 'stump', 'nih', 'kedja', 'avskuren', 'eksem',
        'akne', 'indian', 'Heskiga Handen', 'för lång', 'gul', 'läderlappen', 'fuckroom', 'killroom', ' ashe main', 'stockholmspolisen STANNA',
        'fyllecell', 'knark', 'drake', 'knark knark drake drake knapp', 'Elon musk', 'snorkråka', 'björnbuse',' krokig näsa',
        'cigarett', 'alkohol', 'suga kuk för crack', 'plåga', 'snara', 'hoppa från bro', 'pim pim', 'zoo', 'pianotråd', 'lång',
    ],
    gameStarted: false,
    guesses: 3,
    chosenWord: null,
    correct: [],
    wrong: [],
    regEx: /[a-zåäö\d]/,
    score: [],
    execute(message, args) {
        /* Init */
        if (!this.gameStarted) {
            this.chosenWord = init(this.words)
            this.guesses = Math.round(((1 / this.chosenWord.split('').length) * 20) + 3)
            this.guesses = this.guesses < 0 ? 1 : this.guesses
            this.gameStarted = true
            console.log(this.chosenWord)
            return this.makeDefaultEmbed(message)
        }

        /* Error */
        const errorMsg = argsHandler(args, this.regEx, this.correct, this.wrong, message)
        if (errorMsg) return this.makeErrorEmbed(message, errorMsg)

        /* Points */
        let points
        const guess = args[0].split('').join()
        console.log("1", guess)

        let successfulGuess
        if (guess.length === 1) successfulGuess = makeGuessLetter(guess, this.chosenWord).length
        else successfulGuess = makeGuessWord(guess, this.chosenWord)

        console.log("4", successfulGuess)

        if (successfulGuess > 0) this.correct.push(guess), points = successfulGuess
        else this.wrong.push(guess), this.guesses--, points = -1
        scoreHandler(points, message.author)
        this.score = []

        /* Game Over */
        if (victory(this.chosenWord, this.correct)) return this.makeVictoryEmbed(message)
        if (this.guesses <= 0) return this.makeLossEmbed(message)

        this.makeDefaultEmbed(message)
    },
    makeErrorEmbed(message, errorMsg) {
        const embededMessage = embedError(
            errorMsg,
            'Ditt meddelande: ' + `\`\`\`${message.content}\`\`\``,
            't.ex. nih snara g')
        message.channel.send(embededMessage)
    },
    makeDefaultEmbed(message) {
        const hiddenWord = hidden(this.chosenWord, this.correct)
        const embededMessage = embedDefault(hiddenWord, this.guesses, this.wrong)
        message.channel.send(embededMessage)
    },
    makeVictoryEmbed(message) {
        const embededMessage = embedVictory(this.chosenWord, this.score)
        message.channel.send(embededMessage)
        this.reset()
    },
    makeLossEmbed(message) {
        const embededMessage = embedLoss(this.chosenWord, this.score)
        message.channel.send(embededMessage)
        this.reset()
    },
    reset() {
        this.gameStarted = false,
        this.guesses = 3,
        this.chosenWord = null,
        this.correct = [],
        this.wrong = []
    }
}