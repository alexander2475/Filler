const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: {origin: "*"}
});

let players = {};
let rooms = [];

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('move', (board, room) => {
        console.log("Updating player boards...");
        mainBoard = board;
        console.log(board);
        socket.broadcast.emit('boardUpdate', board);
    });

    //Creates the room that has a max of two players
    socket.on('create', (room, username, board) => {

        //FIXME: does not set the player games to the same instance
        if (Object.keys(players).length < 2) {
            let role = Object.keys(players).length === 0 ? 'Player 1' : 'Player 2';

            socket.broadcast.emit('boardUpdate', board);
            //This sets the socket id to either player 1 or player 2. Could potentially set to something custom.
            players[socket.id] = {role: role};

            socket.emit('roleAssigned', { role: role });

            console.log(`Assigned ${players[socket.id].role} as ${role}`);
        } else {
            console.log("Game is full.");
            socket.emit('gameFull');
            socket.disconnect();
        }

        console.log("Joining..." + room);
        socket.join(room);
        io.to(room).emit('boardUpdate', board);
    });

    socket.on('disconnect', () => {
        console.log(players[socket.id].role + " disconnected");
    });
});

io.on('disconnect', (reason) => {
    if (reason === "io server disconnect") {
        socket.connect();
    }
    console.log('user disconnected');
})

http.listen(8080, () => console.log('listening on port 8080'));