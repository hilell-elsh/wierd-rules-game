const { Room } = require('./rooms');
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
    joinToRoom(socket, code)
    socket.emit('new-room-opened', code);
    open_rooms[code] = new Room(code);
    console.log(open_rooms);
    
    // TODO set timeout interval?
}

const startGame = (room) => {
    // random turns
    // nextTurn(room)
}

const joinToRoom = (socket, roomCode) => {
    if (roomCode in Object.keys(open_rooms)) {
        socket.join(roomCode);
        socket.emit('nickname')
        // insert socket to room
        // ask user nickname
    } else {
        socket.emit('join-failed')
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
})

console.log('server run')