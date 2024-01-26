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
const roomDisplay = document.getElementById("roomDisplay");
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

let roomCode = "0000"

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
socket.on('new-room-opened', (code) => {
    roomCode = code;
    room.innerText = roomCode;
})
socket.on('join-failed', () => {
    // display 'room not exist' msg
})
socket.on('nickname', () => {
    // hide openRoom div
    // display chooseNock div
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
    socket.emit('open-new-room')
}

startBtn.onclick = start;
nicknameBtn.onclick = enter;
