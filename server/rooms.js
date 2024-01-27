const { Player } = require('./players');

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

    joinToRoom(socket, head) {
        // insert player to room object
        this.players[socket.id] = new Player(socket, head);
        // ask user nickname
    }

    getPlayers() {
        const players = []
        for (key in this.players) {
            players.push({
                "nick": this.players[key].nickname,
                "score": this.players[key].score
            })
        }
        return players.sort((a, b) => a.score - b.score)
    }
    
    startGame = () => {
        // random turns
        // nextTurn(room)
    }
    
    
    nextTurn = () => {
        // random question from array
        // random correct
    }
}

module.exports = {
    Room
}