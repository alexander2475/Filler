
const colors = ['DodgerBlue', 'FireBrick', 'Gold', 'BlueViolet', 'Tomato', 'DarkOliveGreen'];

document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.getElementById('gameArea');
    const totalTiles = 8 * 7; // 8 columns * 7 rows
    const colorChoice = document.getElementById('colorOptions');

    for (let j =0; j < colors.length; j++){
        const colorOpt = document.createElement('div');
        colorOpt.className = 'colorTiles';
        colorOpt.textContent = colors[j];
        colorChoice.appendChild(colorOpt);
    }

    for (let i = 0; i < totalTiles; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.textContent = `Tile ${i + 1}`;
        gameArea.appendChild(tile);
    }
});

function setupColors() {
    let colorTiles = document.getElementsByClassName('colorTiles');
    for (let i = 0; i < colors.length; i++){
        colorTiles[i].style.backgroundColor = colors[i];
    }
}

function setupClicks(){
    let tiles = document.getElementsByClassName('tile');
    for (let i = 0; i < tiles.length; i++){
        tiles[i].addEventListener('click', function() {this.style.backgroundColor = 'red'});
    }
}

document.addEventListener('DOMContentLoaded', setupClicks);
document.addEventListener('DOMContentLoaded', setupColors);


