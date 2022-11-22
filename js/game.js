'use strict'

const WALL = '🧱'
const FOOD = '.'
const EMPTY = ' '
const POWERFOOD = '@'
const CHERRY = '🍒'

var gCherryInterval
var gBoard

const gGame = {
    score: 0,
    foodLeftToWin: 0,
    isOn: false
}


function onInit() {
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gCherryInterval = setInterval(addCherry, 1000 * 15)

}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gGame.foodLeftToWin++
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gGame.foodLeftToWin--
            }
        }
    }

    board[size - 2][size - 2] = POWERFOOD
    board[1][1] = POWERFOOD
    board[1][size - 2] = POWERFOOD
    board[size - 2][1] = POWERFOOD
    gGame.foodLeftToWin -= 5
    return board
}

function updateScore(diff) {
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}

function gameOver() {
    console.log('Game Over')
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    gGame.isOn = false
    renderCell(gPacman.location, '💀')
    document.querySelector('.lose-modal').style.display = 'grid'
}

function restartGame() {
    document.querySelector('.lose-modal').style.display = 'none'
    document.querySelector('.win-modal').style.display = 'none'
    gGhosts = []
    updateScore(-gGame.score)
    onInit()
}

function gameWin() {
    if (gGame.foodLeftToWin === 0) {
        console.log('Game win')
        clearInterval(gIntervalGhosts)
        clearInterval(gCherryInterval)
        gGame.isOn = false
        renderCell(gPacman.location, '🏆')
        document.querySelector('.win-modal').style.display = 'grid'
    } else return
}

function addCherry() {
    var emptyCels = getEmptyCel()
    if (!emptyCels) return
    const randomCell = drawNum(emptyCels)
    //Modal 
    gBoard[randomCell.i][randomCell.j] = CHERRY
    //Dom
    renderCell(randomCell, CHERRY)
}