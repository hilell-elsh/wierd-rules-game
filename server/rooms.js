const open_rooms = {
    "0000": {
        players: [
            {
                socketId: "",
                nickname: "someone",
                score: 0,
                head: true,
                position: positions.Answer,
            },
            {
                socketId: "",
                nickname: "someone2",
                score: 0,
                head: false,
                position: positions.Ask
            }
        ],
        currentQuestion: 4,
        usedQuests: [0, 7, 9],
        turns: []
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
}

const startGame = (room) => {
    // random turns
    // nextTurn(room)
}

const enterToRoom = (socket, room) => {
    // insert socket to room
    // ask user nickname
}

const nextTurn = (room) => {
    // random question
    // random correct
}
