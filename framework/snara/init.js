module.exports = (words) => {
    const chosenWord = words[parseInt(Math.random() * (words.length - 1))]
    return chosenWord
}
