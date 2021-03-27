module.exports = (guess, word) => {
   return word.split('').filter(e => e.toLowerCase() === guess).length
}
