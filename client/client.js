/**
 * room inteface:
 *  "code": {
 *      players: [
 *          {
 *              socketId: "socket.id",
 *              nickname: str,
 *              score: int,
 *              head: bool,
 *              position: positions.Answer,
 *          }
 *      ],
 *      currentQuestion: Int,
 *      unusedQuests: [Int], 
 *      turns: [socketID]
 *  }
 */

import { io } from "socket.io-client"

const openRoom = document.getElementById("openRoom");
const joinRoomCode = document.getElementById("joinRoomCode");
const joinRoomBtn = document.getElementById("joinRoomBtn");
const newRoomBtn = document.getElementById("newRoomBtn");
const room = document.getElementById("room");
const chooseNick = document.getElementById("chooseNick");
const nickname = document.getElementById("nickname");
const nicknameBtn = document.getElementById("nicknameBtn");
const nicknameDisplay = document.getElementById("nicknameDisplay");
const startBtn = document.getElementById("start");
const gameDisplay = document.getElementById("gameDisplay")
const asker = document.getElementById("asker");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const score = document.getElementById("score");

const socket = io('http://localhost:3000')
socket.on('connect', () => {
    console.log(socket.id);
})

socket.on('ping', () => {
    socket.emit('ping-back')
})
socket.on('ping-back', () => {
    pass
})
socket.on('newRoom', (code) => {
    room.innerText = code;
})

const start = () => {
    socket.emit('start-game')
    alert('Starting')
}

const enter = () => {
    socket.emit('enter-game', nickname.value)
    alert('Starting ' + nickname.value)
}

const newRoom = () => {
    socket.emit('new-room')
}

startBtn.onclick = start;
nicknameBtn.onclick = enter;
