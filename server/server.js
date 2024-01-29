const { Room } = require('./rooms');
const { Player } = require('./players');
const questions = require('./questions.json')

const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:8080']
    }
})


const open_rooms = {};

function* roomCodes() {
    let code = 0
    while (true) {
        code++;
        if (code >= 10000) code = 1;
        // console.log(code)
        yield code.toString().padStart(4, "0");
    }
}
const codeG = roomCodes();

const openNewRoom = (socket) => {
    const code = codeG.next().value;
    open_rooms[code] = new Room(code);
    socket.emit('new-room-opened', code);
    joinToRoom(socket, code, true);
    
    // TODO set timeout interval?
}

const startGame = (room) => {
    // random turns
    // nextTurn(room)
}

const joinToRoom = (socket, roomCode, head = false) => {
    if (roomCode in open_rooms) {
        // insert socket to room
        socket.join(roomCode);
        // insert player to room object
        open_rooms[roomCode].joinToRoom(socket, head);
        // ask user nickname
        socket.emit('nickname')
        console.log('user join to room ' + roomCode);
    } else {
        socket.emit('join-failed')
        console.log('join to room ' + roomCode + ' failed');
    }
    console.log(open_rooms);
}

const nextTurn = (room) => {
    // random question from array
    // items[Math.floor(Math.random()*items.length)];
    // random correct
}

const sendScore = (room) => {
    console.log('send score');
    io.to(room).emit('score', open_rooms[room].getScore());
    console.log(open_rooms[room].getScore());
}



io.on('connection', socket => {
    console.log(socket.id);
    socket.on('ping', () => {
        socket.emit('ping-back')
    })
    socket.on('ping-back', () => {
        pass
    })
    
    socket.on('open-new-room', () => {
        console.log('new-room-request');
        openNewRoom(socket);
    })

    socket.on('join-room', (code) => {
        joinToRoom(socket, code);
    })

    socket.on('choose-nickname', (room, nickname) => {
        const head = open_rooms[room].getPlayer(socket.id).changeNickname(nickname);
        socket.emit('nick-changed', head);
        sendScore(room);
    })

    socket.on('enter-game', (room, nickname) => {
        
    })

    socket.on('start-game', (room) => {
        console.log('start request', room);
        open_rooms[room].startGame();
    })
})

console.log('server run')