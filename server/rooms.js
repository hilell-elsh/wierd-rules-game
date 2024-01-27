const questions = require('./questions.json')
class Room {
    constructor(code) {
        this.code = code;
        this.players = {};
        this.currentQuestion = -1;
        this.unusedQuests = [...questions.keys()];
        this.turns = [];
        console.log('New room opened ', this.code);
    }
}

const openNewRoom = (socket) => {
    // generate number .toString().padStart(4, "0")
    // enterToRoom(socket, room)
    // send back the code to the user
    // create array with questions nums
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
    // random correct
}

module.exports = {
    Room
}