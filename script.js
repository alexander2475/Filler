
const colors = ['#FF595E', '#FF924C', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93'];

let turn = true;
console.log("Is is player1's turn: " + turn);

let player1SP;
let player2SP;
let player1Name;
let player2Name;

document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.getElementById('gameArea');
    const totalTiles = 6 * 4; // 8 columns * 7 rows
    const colorChoice = document.getElementById('colorOptions');
    const playerArea = document.getElementById("players");

    for (let j =0; j < colors.length; j++){
        const colorOpt = document.createElement('div');
        colorOpt.className = 'colorTiles';
        colorOpt.textContent = j;
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
        } else {
            player2Name = players;
        }


        playerArea.appendChild(players);
    }
});

function setupColors() {
    let colorTiles = document.getElementsByClassName('colorTiles');
    for (let i = 0; i < colors.length; i++){
        colorTiles[i].style.backgroundColor = colors[i];
        colorTiles[i].addEventListener('click', function(){currentTurn(i)});
    }
}

function setupClicks(){
    let tiles = document.getElementsByClassName('tile');
    for (let i = 0; i < tiles.length; i++){
        tiles[i].addEventListener('click', function() {});
    }
}

function currentTurn(colorIndex){
    //this.style.opacity = .5;
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

function setupGame(){
    let tiles = document.getElementsByClassName('tile');
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].style.backgroundColor = colors[Math.floor(Math.random() * 6)];
        if (i === 6) {
            player1Name = tiles[i].backgroundColor;
        }
    }

}

document.addEventListener('DOMContentLoaded', setupClicks);
document.addEventListener('DOMContentLoaded', setupColors);
document.addEventListener('DOMContentLoaded', setupGame);


