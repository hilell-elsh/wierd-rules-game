const questions = require('./questions.json')
class Room {
    constructor(code) {
        this.code = code;
        this.players = [];
        this.currentQuestion = -1;
        this.unusedQuests = [...questions.keys()];
        this.turns = [];
        console.log('New room opened ', this.code);
    }
}

class Player {
    constructor(socket) {
        this.socket = socket;
        this.nickname = "";
        this.score = 0;
        this.head = false;
        this.position = positions.Wait;
    }
}

const positions = {
    Wait: 0,
    Ask: 1,
    AnswerCorrect: 2,
    AnswerWrong: 3,
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
    Room,
    Player
}