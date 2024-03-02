
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

    const totalTiles = 6 * 4;
    const gameArea = document.getElementById('gameArea');
    const colorChoice = document.getElementById('colorOptions');
    const playerArea = document.getElementById("players");

    for (let j = 0; j < colors.length; j++){
        const colorOpt = document.createElement('div');
        colorOpt.className = 'colorTiles';
        colorOpt.textContent = j.toString();
        colorChoice.appendChild(colorOpt);
    }

    for (let i = 1; i <= totalTiles; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.textContent = `Tile ${i}`;

        if (i === 6){
            player1SP = tile;
        } else if (i === 19) {
            player2SP = tile;
        }
        gameArea.appendChild(tile);
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
function setupGame(){
    let tiles = document.getElementsByClassName('tile');
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].style.backgroundColor = colors[Math.floor(Math.random() * 6)];
    }
}

document.addEventListener('DOMContentLoaded', setupColorsBar);
document.addEventListener('DOMContentLoaded', setupGame);


