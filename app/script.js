
const colors = ['#ffc13d','#c77dff', '#D1383B','#238bf3','#4f772d', '#003049'];

let board =
    [
        ['x', 'x', 'x', 'x', 'x', 'x',],
        ['x', 'x', 'x', 'x', 'x', 'x',],
        ['x', 'x', 'x', 'x', 'x', 'x',],
        ['x', 'x', 'x', 'x', 'x', 'x',]
    ];

const boardWidth = 6;
const boardHeight = 4;

let mainBoard =
    [
        ['x', 'x', 'x', 'x', 'x', '1',],
        ['x', 'x', 'x', 'x', 'x', 'x',],
        ['x', 'x', 'x', 'x', 'x', 'x',],
        ['2', 'x', 'x', 'x', 'x', 'x',]
    ];

let turn = true;


let player1Captured = new Set();
let player2Captured = new Set();
let player1Name;
let player2Name;

document.addEventListener('DOMContentLoaded', function() {

    //This needs to be moved to the updating part
    socketSetup();

    //gets elements from html
    const gameArea = document.getElementById('gameArea');
    const colorChoice = document.getElementById('colorOptions');
    const playerArea = document.getElementById("players");

    //creating tiles
    for (let j = 0; j < colors.length; j++){
        const colorOpt = document.createElement('div');
        colorOpt.className = 'colorTiles';
        colorOpt.textContent = " ";
        colorChoice.appendChild(colorOpt);
    }

    //label tiles
    let counter = 1;

    for (let row = 0; row < 4; row++){
        for (let column = 0; column < 6; column++){
            const tile = document.createElement('div');
            tile.className = 'tile';
            //tile.textContent = `Tile ${counter++}\n${row}`+`,${column}`;
            tile.innerHTML = `Tile ${counter++}<br>(${row},${column})`;

            board[row][column] = tile;

            gameArea.appendChild(tile);
        }
    }

    //assign player start square
    player1Captured.add(board[0][5]);

    // Assign player2 to bottom left corner
    player2Captured.add(board[3][0]);

    //creat player tiles
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

function currentTurn(colorIndex){

    greyColors();

    let color = colors[colorIndex];

    if (turn) {
        player2Name.textContent = "-> Player 2 <-";
        player1Name.textContent = "Player 1";

        player1Name.style.backgroundColor = color;
        //player1Captured.style.backgroundColor = color;
        greyColors();
        updateBoard(turn);
        turn = !turn;
    } else {
        player1Name.textContent = "-> Player 1 <-";
        player2Name.textContent = "Player 2";
        player2Name.style.backgroundColor = color;
        //player2Captured.style.backgroundColor = color;
        greyColors();
        updateBoard(turn);
        turn = !turn;
    }

    if(player1Captured.size + player2Captured.size === boardWidth * boardHeight) {


        if (player1Captured.size > player2Captured.size){
            playingAgain("Player 1!");
        } else if (player2Captured.size > player1Captured.size) {
            playingAgain("Player 2!");
        } else if (player2Captured.size === player1Captured.size) {
            playingAgain("It's a draw!")
        }
    }
}

function greyColors(){

    let colorTiles = document.getElementsByClassName('colorTiles');

    //iterate through array for the color options and increment counter i.
    for (let i = 0; i < colors.length; i++){
        if (colorTiles[i].style.backgroundColor === player1Name.style.backgroundColor || colorTiles[i].style.backgroundColor === player2Name.style.backgroundColor){
            colorTiles[i].style.pointerEvents = 'none';
            colorTiles[i].style.opacity = "0.5";
        } else {
            colorTiles[i].style.pointerEvents = 'auto';
            colorTiles[i].style.opacity = "1";
        }
    }
}

function setupGame() {
    let playerNames = document.getElementsByClassName('player-names');
    let title = document.getElementById('title');

    for (let column = 0; column < 6; column++) {
        for (let row = 0; row < 4; row++) {
            board[row][column].style.backgroundColor = colors[Math.floor(Math.random() * 6)];
            while (isNeighborColorSame(board, row, column)) {
                board[row][column].style.backgroundColor = colors[Math.floor(Math.random() * 6)];
            }

            while (board[0][5].style.backgroundColor === board[3][0].style.backgroundColor){
                board[0][5].style.backgroundColor = colors[Math.floor(Math.random() * 6)];
            }
        }
    }

    playerNames[1].textContent = "-> Player 1 <-";
    playerNames[1].style.backgroundColor = board[0][5].style.backgroundColor;
    playerNames[2].style.backgroundColor = board[3][0].style.backgroundColor;
    greyColors();

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

function updateBoard(turn) {

    let colorTarget;

    if (turn) {
        colorTarget = player1Name.style.backgroundColor;
        player1Captured.forEach(tile => {
            tile.style.backgroundColor = colorTarget;
        });
    } else {
        colorTarget = player2Name.style.backgroundColor;
        player2Captured.forEach(tile => {
            tile.style.backgroundColor = colorTarget;
        });
    }
    updateNeighbors();
}

function updateNeighbors() {
    let colorTarget;
    if(turn) {
        colorTarget = player1Name.style.backgroundColor;
    }
    else {
        colorTarget = player2Name.style.backgroundColor;
    }

    for(let i=0; i<boardHeight; i++) {
        for(let j = 0; j<boardWidth; j++) {
            if(turn && mainBoard[i][j] === '1') {
                //check up
                if(i-1 >= 0 && colorTarget === board[i-1][j].style.backgroundColor && mainBoard[i-1][j] === "x") {
                    mainBoard[i-1][j] ='1';
                    player1Captured.add(board[i-1][j]);
                }
                //check down
                if(i+1 <board.length  && colorTarget === board[i+1][j].style.backgroundColor && mainBoard[i+1][j] === "x") {
                    mainBoard[i+1][j] ='1';
                    player1Captured.add(board[i+1][j]);

                }
                //check left
                if(j-1 >= 0 && colorTarget === board[i][j-1].style.backgroundColor && mainBoard[i][j-1] === "x") {
                    mainBoard[i][j-1] ='1';
                    player1Captured.add(board[i][j-1]);

                }
                //check right
                if(j+1 < board[i].length && colorTarget === board[i][j+1].style.backgroundColor && mainBoard[i][j+1] === "x") {
                    mainBoard[i][j+1] ='1';
                    player1Captured.add(board[i][j+1]);

                }
            }
            else if(!turn && mainBoard[i][j] === '2') {
                //check up
                if(i-1 >= 0 && colorTarget === board[i-1][j].style.backgroundColor && mainBoard[i-1][j] === "x") {
                    mainBoard[i-1][j] ='2';
                    player2Captured.add(board[i-1][j]);

                }
                //check down
                if(i+1 <board.length  && colorTarget === board[i+1][j].style.backgroundColor && mainBoard[i+1][j] === "x") {
                    mainBoard[i+1][j] ='2';
                    player2Captured.add(board[i+1][j]);

                }
                //check left
                if(j-1 >= 0 && colorTarget === board[i][j-1].style.backgroundColor && mainBoard[i][j-1] === "x") {
                    mainBoard[i][j-1] ='2';
                    player2Captured.add(board[i][j-1]);

                }
                //check right
                if(j+1 < board[i].length && colorTarget === board[i][j+1].style.backgroundColor && mainBoard[i][j+1] === "x") {
                    mainBoard[i][j+1] ='2';
                    player2Captured.add(board[i][j+1]);

                }
            }
        }
    }
}

function playingAgain(winner) {
    let backdrop = document.createElement('div');
    backdrop.style.position = 'fixed';
    backdrop.style.top = '0';
    backdrop.style.left = '0';
    backdrop.style.width = '100%';
    backdrop.style.height = '100%';
    backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    backdrop.style.display = 'flex';
    backdrop.style.justifyContent = 'center';
    backdrop.style.alignItems = 'center';
    backdrop.style.zIndex = '1000';

    let popup = document.createElement('div');
    popup.innerHTML = `<h1>Congrats! ${winner}</h1><br><h3>Would you like to play again?</h3><br><button id="yesButton">Yes</button>&nbsp;<button id="noButton">No</button>`;
    popup.style.padding = '20px';
    popup.style.backgroundColor = 'white';
    popup.style.borderRadius = '5px';
    popup.style.textAlign = 'center';
    popup.style.color = 'black';

    backdrop.appendChild(popup);

    document.body.appendChild(backdrop);

    document.getElementById('yesButton').addEventListener('click', function() {
        window.location.reload();
    });

    document.getElementById('noButton').addEventListener('click', function() {
        document.body.removeChild(backdrop);
    });
}

//TODO: this needs work.
function socketSetup(){
    const socket = io('http://localhost:8080');

    socket.on('message', (text) => {
        const test = document.createElement('l1');
        test.innerHTML = text;
        document.querySelector('ul').appendChild(test);
    });

    socket.on('connect', () => {
        console.log(socket.connected);
    });

    socket.on('disconnect', () => {
        console.log("Disconnected...")
    })

    socket.on('connect_error', (error) => {
        console.log('Connection Error:', error);
    });

    socket.on('reconnect_attempt', (attempt) => {
        console.log("Attempting to reconnect...");
    });

    socket.on('changeMade')
}

document.addEventListener('DOMContentLoaded', setupColorsBar);
document.addEventListener('DOMContentLoaded', setupGame);