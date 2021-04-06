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
const successfulGuess = require('../framework/snara/successfulGuess')
const scoreHandler = require('../framework/user/scoreHandler')

module.exports = {
    name: 'snara',
    description: 'hängagubbe',
    words: [
        'Systembolaget', 'Gitarr', 'Anna Lund', 'Rullstol', 'Fönster', 'Plastpåse', 'jeans', 'jinnsjacka', 'jeansjacka', 'Kebab', 'Hamza',
        'Jeppeg', 'Gitarr', 'Råtta', 'Molotov Cocktail', 'Knapp', 'Tangentbord', 'Mus', 'Röv', 'Penis', 'Tuttar', 'Jonathan',
        'Among us', 'Frankrike', 'Eddie Palmer Pocket Pussy', 'Äpple', 'Pizza', 'New York', 'gräs', 'knark', 'girig', 'lever på gränsen',
        'förhud', 'leka', 'dum', 'horunge', 'kidnappning', 'hudkräm', 'Jakob Konnbjer', 'Enskede', 'Estet', 'g minus', 'avgrunden',
        'Snara', 'Spartan', 'Eddie Palmer', 'Pocketpussy', 'Hoppa på huvud', 'Skolskjutare', 'Barnens Ö', 'Triangelparken',
        'Weed', 'Molotov Cocktail', 'Coomer', 'Doomer', 'Boomer', 'Zoomer', 'Skate 3', 'Asiat', 'SATS', 'snål', 'drutten',
        'Barba', 'Alfred', 'Bea', 'Alf nyberg', 'Jonis', 'Kinagunga', 'Globen', 'Fotboll', 'Joint', 'Among us', 'Björn',
        'Råtta', 'Reptil', 'Jonis', 'Bobby', 'skolskjutare', 'skjutning', 'schling', 'nugget', 'dragkedja', 'maria pool',
        'golvläggare', 'doge coin', 'bilnycklar', 'speldesigner', 'ekonomistudent', 'hermans storebror', 'guitar hero', 'euwstmacka',
        'vinterbad', 'Devourer', 'Sax', 'Nils Werge', 'Klätterställning', 'pokemon', 'beyblade', 'anton', 'tindermannen', 'Holger',
        'Hannibal', 'Hektor med c', 'Hugo', 'Herman', 'skateboard', 'djaffdjaff', 'lovisa', 'klassfest', 'world of warcraft', 'xphania',
        'vasilis gotevas', 'trapphus', 'äcklig', 'ådrig', 'alfa', 'lich king', 'snek', 'stockholms blodbad', 'dummare',
        'tentakel', 'minihamster', 'kebaben', 'fIIIIIsk', 'extra kött', 'röd sås', 'vit sås', 'specialsås', 'blizzard',
        'vit sås', 'harold and kumar', 'harold and coomar', 'chickenwing', 'isbad', 'isvak', 'propeller', 'drunkna', 'helikopter',
        'avhuggen', 'stump', 'nih', 'kedja', 'avskuren', 'eksem', 'ace', 'akne', 'indian', 'Heskiga Handen', 'för lång', 'gul',
        'läderlappen', 'fuckroom', 'killroom', 'ashe main', 'stonk', 'stockholmspolisen STANNA', 'fyllecell', 'knark', 'drake',
        'knark knark drake drake knapp', 'Elon musk', 'snorkråka', 'björnbuse', 'krokig näsa', 'cigarett', 'alkohol',
        'suga kuk för crack', 'plåga', 'snara', 'hoppa från bro', 'business', 'pim pim', 'zoo', 'pianotråd', 'lång', 'Jay Smith',
        'Johnny Sins', 'Oliver', 'Subway', 'gul sås', 'Nils Werge har bånge', 'hutu tutsi',
        'breakycpk but at what cost', '9 fingrar upp', '10 cheese', 'koka lite pasta', 
    ],
    gameStarted: false,
    guesses: 3,
    chosenWord: null,
    correct: [],
    wrong: [],
    regEx: /[a-zåäö\d]/,
    score: [],
    execute(message, args, client) {
        /* Init */
        if (!this.gameStarted) {
            this.chosenWord = init(this.words)
            this.guesses = Math.round(((1 / this.chosenWord.split('').length) * 20) + 3)
            this.guesses = this.guesses < 0 ? 1 : this.guesses
            this.gameStarted = true
            client.noPrefixRequired = true
            return this.makeDefaultEmbed(message)
        }
        const guess = args[0].split('').join()

        /* Error */
        const errorMsg = argsHandler(guess, this.regEx, this.correct, this.wrong, message)
        if (errorMsg) return this.makeErrorEmbed(message, errorMsg)

        /* Points */
        let points
        let correctGuess
        if (guess.length === 1) correctGuess = makeGuessLetter(guess, this.chosenWord)
        else correctGuess = makeGuessWord(args, this.chosenWord, this.correct)

        if (correctGuess > 0) this.correct = successfulGuess(guess === 1 ? guess : args, this.correct ), points = correctGuess
        else {
            if (guess.length === 1) this.wrong.push(guess), points = 0
            else points = -1
            this.guesses--
        }

        this.score = scoreHandler(points, message.author)

        /* Game Over */
        if (victory(this.chosenWord, this.correct)) return this.makeVictoryEmbed(message), client.noPrefixRequired = false
        if (this.guesses <= 0) return this.makeLossEmbed(message), client.noPrefixRequired = false

        this.makeDefaultEmbed(message)
    },
    makeErrorEmbed(message, errorMsg) {
        const embededMessage = embedError(
            errorMsg,
            'Ditt meddelande: ' + `\`\`\`${message.content}\`\`\``,
            'för att gissa skriv bara din gissning, inget nih-prefix behövs')
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
