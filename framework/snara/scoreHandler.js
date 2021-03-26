module.exports = (score, scoreBoard, name) => {
    const index = scoreBoard.findIndex(e => e.name === name)
    if (index<0) scoreBoard.push({name, score})
    else scoreBoard[index].score += score
    return scoreBoard
}
