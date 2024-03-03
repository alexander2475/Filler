
const colors = ['#FEB202','#633DD7', '#D1383B','#238bf3','#2CA082', '#ED7F01'];

let board =
    [
        ['x', 'y', 'x', 'x', 'x', 'x',],
        ['x', 'x', 't', 'x', 'x', 'x',],
        ['x', 'x', 'x', 'y', 'x', 'x',],
        ['x', 'x', 'y', 'y', 'x', 'x',]
    ];

let player1Board =
    [
        ['x', 'y', 'x', 'x', 'x', 'x',],
        ['x', 'x', 't', 'x', 'x', 'x',],
        ['x', 'x', 'x', 'y', 'x', 'x',],
        ['x', 'x', 'y', 'y', 'x', 'x',]
    ];

let player2Board =
    [
        ['x', 'y', 'x', 'x', 'x', 'x',],
        ['x', 'x', 't', 'x', 'x', 'x',],
        ['x', 'x', 'x', 'y', 'x', 'x',],
        ['x', 'x', 'y', 'y', 'x', 'x',]
    ];

for (let row of board){
    const rowString = row.join(' ');
    console.log(rowString);
}

let turn = true;
console.log("Is is player1's turn: " + turn);

let player1Captured;
let player2Captured;
let player1Name;
let player2Name;

document.addEventListener('DOMContentLoaded', function() {

    const gameArea = document.getElementById('gameArea');
    const colorChoice = document.getElementById('colorOptions');
    const playerArea = document.getElementById("players");

    for (let j = 0; j < colors.length; j++){
        const colorOpt = document.createElement('div');
        colorOpt.className = 'colorTiles';
        colorOpt.textContent = " ";
        colorChoice.appendChild(colorOpt);
    }

    let counter = 1;

    for (let row = 0; row < 4; row++){
        for (let column = 0; column < 6; column++){
            const tile = document.createElement('div');
            tile.className = 'tile';
            //tile.textContent = `Tile ${counter++}\n${row}`+`,${column}`;
            tile.innerHTML = `Tile ${counter++}<br>(${row},${column})`;

            board[row][column] = tile;

            gameArea.appendChild(tile);

            if (row === 0 && column === 5){
                player1Captured = board[row][column];
            }
            // Assign player2 to bottom left corner
            else if (row === 3 && column === 0){
                player2Captured = board[row][column];
            }
        }
    }

    for (let k = 1; k <= 2; k++) {
        const players = document.createElement('div');
        players.className = 'player-names';
        players.textContent = `Player ${k}`;

        if (k === 1){
            player1Name = players;
        } else if (k === 2) {
            player2Name = players;
        }
        playerArea.appendChild(players);
    }
});

//sets up the color bar and adds event listeners to each item.
function setupColorsBar() {
    let colorTiles = document.getElementsByClassName('colorTiles');
    for (let i = 0; i < colors.length; i++){
        colorTiles[i].style.backgroundColor = colors[i];
        colorTiles[i].addEventListener('click', function(){currentTurn(i)});
    }
}

//FIXME: this function is not able to update the player title cards.
function currentTurn(colorIndex){

    let players = document.getElementsByClassName('player-names');

    console.log("Is is player1's turn: " + turn);
    greyColors();

    let color = colors[colorIndex];

    if (turn) {
        player1Name.textContent = "-> Player 1 <-";
        player2Name.textContent = "Player 2";
        player1Name.style.backgroundColor = color;
        player1Captured.style.backgroundColor = color;
        greyColors();
        turn = !turn;
    } else {
        player2Name.textContent = "-> Player 2 <-";
        player1Name.textContent = "Player 1";
        player2Name.style.backgroundColor = color;
        player2Captured.style.backgroundColor = color;
        greyColors();
        turn = !turn;
    }
}

function greyColors(){

    let colorTiles = document.getElementsByClassName('colorTiles');

    //iterate through array for the color options and increment counter i.
    for (let i = 0; i < colors.length; i++){
        if (colorTiles[i].style.backgroundColor === player1Captured.style.backgroundColor || colorTiles[i].style.backgroundColor === player2Captured.style.backgroundColor){
            colorTiles[i].style.pointerEvents = 'none';
            colorTiles[i].style.opacity = .5;
        } else {
            colorTiles[i].style.pointerEvents = 'auto';
            colorTiles[i].style.opacity = 1;
        }
    }
}

//FIXME: this function is not assigning an initial color value to the player titles.
function setupGame() {
    let playerNames = document.getElementsByClassName('player-names');
    let title = document.getElementById('title');

    for (let column = 0; column < 6; column++) {
        for (let row = 0; row < 4; row++) {
            board[row][column].style.backgroundColor = colors[Math.floor(Math.random() * 6)];
            while (isNeighborColorSame(board, row, column)) {
                board[row][column].style.backgroundColor = colors[Math.floor(Math.random() * 6)];
            }
        }
    }

    greyColors();
    playerNames[1].textContent = "-> Player 1 <-";
    playerNames[1].style.backgroundColor = board[0][5].style.backgroundColor;
    playerNames[2].style.backgroundColor = board[3][0].style.backgroundColor;
}

// I hate everything about this so much
function isNeighborColorSame(board, row, column) {
    const currentColor = board[row][column].style.backgroundColor;

    if (row - 1 >= 0 && currentColor === board[row - 1][column].style.backgroundColor) {
        return true;
    }

    if (row + 1 < board.length && currentColor === board[row + 1][column].style.backgroundColor) {
        return true;
    }

    if (column - 1 >= 0 && currentColor === board[row][column - 1].style.backgroundColor) {
        return true;
    }

    if (column + 1 < board[row].length && currentColor === board[row][column + 1].style.backgroundColor) {
        return true;
    }

    return false;
}

document.addEventListener('DOMContentLoaded', setupColorsBar);
document.addEventListener('DOMContentLoaded', setupGame);


