
const colors = ['#FF595E', '#FF924C', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93'];

let board =
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

let player1SP;
let player2SP;
let player1Name;
let player2Name;

document.addEventListener('DOMContentLoaded', function() {

    const gameArea = document.getElementById('gameArea');
    const colorChoice = document.getElementById('colorOptions');
    const playerArea = document.getElementById("players");

    for (let j = 0; j < colors.length; j++){
        const colorOpt = document.createElement('div');
        colorOpt.className = 'colorTiles';
        colorOpt.textContent = j.toString();
        colorChoice.appendChild(colorOpt);
    }

    let counter = 1;

    for (let row = 0; row < 4; row++){
        for (let column = 0; column < 6; column++){
            const tile = document.createElement('div');
            tile.className = 'tile';
            //tile.textContent = `Tile ${counter++}\n${row}`+`,${column}`;
            tile.innerHTML = `Tile ${counter++}<br>${row},${column}`;

            board[row][column] = tile;

            gameArea.appendChild(tile);

            if (row === 0 && column === 5){
                player1SP = board[row][column];
            }
            // Assign player2 to bottom left corner
            else if (row === 3 && column === 0){
                player2SP = board[row][column];
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
    //this.style.opacity = 0.5;
    turn = !turn;
    console.log("Is is player1's turn: " + turn);

    let color = colors[colorIndex];

    if (turn) {
        player1Name.style.backgroundColor = color;
        player1SP.style.backgroundColor = color;
    } else {
        player2Name.style.backgroundColor = color;
        player2SP.style.backgroundColor = color;
    }
}

//FIXME: this function is not assigning an initial color value to the player titles.
function setupGame() {
    let playerNames = document.getElementsByClassName('player-names');

    for (let column = 0; column < 6; column++) {
        for (let row = 0; row < 4; row++) {
            board[row][column].style.backgroundColor = colors[Math.floor(Math.random() * 6)];
            while (isNeighborColorSame(board, row, column)) {
                board[row][column].style.backgroundColor = colors[Math.floor(Math.random() * 6)];
            }
        }
    }

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


