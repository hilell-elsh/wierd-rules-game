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
    joinToRoom(socket, code, true)
    console.log(open_rooms);
    
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
}

const nextTurn = (room) => {
    // random question from array
    // items[Math.floor(Math.random()*items.length)];
    // random correct
}



io.on('connection', socket => {
    console.log(socket.id);
    socket.on('ping', () => {
        socket.emit('ping-back')
    })
    socket.on('ping-back', () => {
        pass
    })

    socket.on('start-game', () => {
        console.log('start request');
        // openNewRoom(socket);
    })

    socket.on('open-new-room', () => {
        console.log('new-room-request');
        openNewRoom(socket);
    })

    socket.on('join-room', (code) => {
        joinToRoom(socket, code);
    })
})

console.log('server run')