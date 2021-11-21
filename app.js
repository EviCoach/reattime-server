import expres from "express"
import http from "http"
import dotenv from "dotenv"
import {Server} from "socket.io"

dotenv.config({})

const PORT = process.env.PORT || 8080

const app = expres()

const server = http.createServer(app);

const socket = new Server(server)

app.get("/", (req, res) => {
    console.log("Get requests");
    res.send("Real time server is up")
})

socket.on("connection", (userSocket)=>{
    userSocket.on("send_message", data=>{
        userSocket.broadcast.emit("receive_message", data)
    })
})

server.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})