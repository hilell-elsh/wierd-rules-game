class Player {
    constructor(socket, head = false) {
        this.socket = socket;
        this.nickname = "";
        this.score = 0;
        this.head = head;
        this.position = positions.Wait;
    }

    changeNickname(nickname) {
        this.nickname = nickname;
        return this.head;
    }
}

const positions = {
    Wait: 0,
    Ask: 1,
    AnswerCorrect: 2,
    AnswerWrong: 3,
}

module.exports = {
    Player
}