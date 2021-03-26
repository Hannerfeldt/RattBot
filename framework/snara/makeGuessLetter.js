module.exports = (guess, word) => {
   console.log('2',guess)
   console.log('3',word)
   return word.split('').filter(e => e.toLowerCase() === guess)
}
