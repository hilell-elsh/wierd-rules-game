const questions = require('./questions.json')
const { Player, positions } = require('./players');

class Room {
    constructor(code) {
        this.code = code;
        this.players = {};
        this.currentQuestion = -1;
        this.unusedQuests = [...questions.keys()];
        this.turns = [];
        this.isStart = false;
        console.log('New room opened ', this.code);
    }

    joinToRoom(socket, head) {
        // insert player to room object
        this.players[socket.id] = new Player(socket, head);
        // ask user nickname
    }

    getScore() {
        const players = []
        for (let key in this.players) {
            players.push({
                "nick": this.players[key].nickname,
                "score": this.players[key].score
            })
        }
        return players.sort((a, b) => a.score - b.score)
    }

    getPlayer(id) {
        return this.players[id];
    }

    changeNickname(player, nickname) {
        this.players[player].changeNickname(nickname);
    }

    sendScore(io) {
        io.to(this.code).emit('score', this.getScore());
    }
    
    startGame() {
        this.isStart = true;
        // random turns
        const toTurn = Object.keys(this.players);
        let player;
        while (toTurn.length > 0) {
            player = toTurn.splice((Math.random() * toTurn.length) | 0, 1)[0];
            this.turns.push(player);
        }
        // console.log("room ", this.code, "turns", this.turns);
        
        this.nextTurn()
    }
    
    nextTurn() {
        this.sendScore();
        // random question from array
        this.currentQuestion = questions[this.unusedQuests.splice((Math.random() * this.unusedQuests.length) | 0, 1)[0]];
        // random correct
        const correct = (Math.random() * (this.turns.length - 1) | 0) + 1;
        let player;
        for (let t in this.turns) {
            player = this.players[this.turns[t]];
            // console.log(typeof t, correct, t==0, t==correct);
            if (t == 0) {
                // asker
                // console.log('asker');
                player.changePosition(positions.Ask);
                player.socket.emit(
                    'ask', 
                    this.currentQuestion.question,
                    this.turns.slice(1, this.turns.length).map((id) => [id, this.players[id].nickname]) 
                    );
                    player.socket.to(this.code).emit('answer', this.currentQuestion);
                } else if (t == correct) {
                    // correct
                    // console.log('correct');
                    player.changePosition(positions.AnswerCorrect);
                } else {
                    // wrong
                    // console.log('wrong');
                    player.changePosition(positions.AnswerWrong);
                }
                // console.log(player);
        }
    }
}

module.exports = {
    Room
}