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

const asker = document.getElementById("asker");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const score = document.getElementById("score");

const socket = io('http://localhost:3000')
socket.on('connect', () => {
    console.log(socket);
})

socket.on('ping', () => {
    socket.emit('ping-back')
})