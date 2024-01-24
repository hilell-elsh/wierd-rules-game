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
        // console.log(code)
        yield code.toString().padStart(4, "0");
    }
}

const codeG = roomCodes();

const openNewRoom = (socket) => {
    const code = codeG.next().value;
    joinToRoom(socket, code)
    socket.emit('newRoom', code);
    open_rooms[code] = {
        players: [],
        currentQuestion: -1,
        unusedQuestions: [...questions.keys()],
        turns: []
    }
    console.log(open_rooms);
    
    // set timeout interval
}

const startGame = (room) => {
    // random turns
    // nextTurn(room)
}

const joinToRoom = (socket, room) => {
    // insert socket to room
    // ask user nickname
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

    socket.on('new-room', () => {
        console.log('new-room');
        openNewRoom(socket);
    })
})

console.log('server run')