import expres from "express"
import http from "http"
import dotenv from "dotenv"
import {Server} from "socket.io"

dotenv.config({})

const PORT = process.env.PORT || 8080

const app = expres()

const server = http.createServer();

const socket = new Server(server)

socket.on("connection", (userSocket)=>{
    userSocket.on("send_message", data=>{
        userSocket.broadcast.emit("receive_message", data)
    })
})


app.get("/", (req, res)=>{
    res.send("Real time server is up")
})


server.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})