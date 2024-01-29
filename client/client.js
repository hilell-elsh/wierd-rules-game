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
const nicknameInput = document.getElementById("nickname");
const nicknameBtn = document.getElementById("nicknameBtn");
const nicknameDisplay = document.getElementById("nicknameDisplay");
const startBtn = document.getElementById("start");
const gameDisplay = document.getElementById("gameDisplay")
const asker = document.getElementById("asker");
const questionDisplay = document.getElementById("questionDisplay");
const answerDisplay = document.getElementById("answerDisplay");
const answer = document.getElementById("answer");
const score = document.getElementById("score");

let roomCode = "0000";
let nickname = "";

const hide = (el) => {el.setAttribute("hidden", "")}
const unhide = (el) => {el.removeAttribute("hidden")}

const changeNickDisplay = () => {
    nicknameDisplay.innerText = nickname;
}

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
})
socket.on('join-failed', () => {
    // display 'room not exist' msg
    alert("Room code doesn`t exist")
})
socket.on('nickname', () => {
    roomDisplay.innerText = roomCode;
    // hide openRoom div
    hide(openRoom);
    // display chooseNick div
    unhide(chooseNick);
})
socket.on('score', (players) => {
    console.log(players);
    score.innerHTML = "";
    let p;
    for (let player of players) {
        p = document.createElement("p");
        p.innerText = player.nick + " - " + player.score;
        score.appendChild(p);
    }
})
socket.on('nick-changed', (head) => {
    if (head) {unhide(startBtn)}
    changeNickDisplay();
    hide(chooseNick);
    unhide(gameDisplay);
})
socket.on('ask', (question, nicks) => {
    console.log('ask');
    console.log(question);
    console.log(nicks);
})
socket.on('answer', (question) => {
    console.log('answer');
    console.log(question);
})

const start = () => {
    socket.emit('start-game', roomCode);
    hide(startBtn);
}

const sendNick = () => {
    nickname = nicknameInput.value;
    socket.emit('choose-nickname', roomCode, nickname)
    // alert('Starting ' + nicknameInput.value)
}

const enter = () => {
    // enter game
}

const newRoom = () => {
    socket.emit('open-new-room')
}

const joinRoom = () => {
    roomCode = joinRoomCode.value;
    socket.emit('join-room', joinRoomCode.value)
}

startBtn.onclick = start;
nicknameBtn.onclick = sendNick;
newRoomBtn.onclick = newRoom;
joinRoomBtn.onclick = joinRoom;
