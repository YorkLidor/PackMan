'use strict'

const GHOST = '&#9781'
var gGhosts = []
var gRemovedGhosts = []

var gIntervalGhosts

function createGhosts(board) {
    // make 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {

    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    if (nextCell === PACMAN) {
        if (gPacman.isSuper) return
        gameOver()
    }


    // DONE: moving **from** current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: **Move the ghost** to new location:
    // DONE: update the model (save cell contents so we can restore later)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM

    if (gPacman.isSuper) {
        renderCell(nextLocation, getGhostHTML(ghost, 'blue'))
    } else renderCell(nextLocation, getGhostHTML(ghost))

}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost, color = getRandomColor()) {
    return `<span style="color:${color}">${GHOST}</span>`
}

function removeGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i]
        if (currGhost.location.i === location.i && currGhost.location.j === location.j) {
            if (currGhost.currCellContent === FOOD) {
                gGame.foodLeftToWin--
                updateScore(1)
                currGhost.currCellContent = EMPTY
                currGhost.location = {i:2,j:6}
                // currGhost.location.i = 2
                // currGhost.location.j = 6
            } else if (currGhost.currCellContent === CHERRY) {
                updateScore(15)
                currGhost.currCellContent = EMPTY
            }
            gRemovedGhosts.push(currGhost)
            gGhosts.splice(i, 1)
        }
    }
}

function returnEatenGhosts() {
    for (var i = 0; i < gRemovedGhosts.length; i++) {
        gGhosts.push(gRemovedGhosts[i])
    }
    gRemovedGhosts = []
}

