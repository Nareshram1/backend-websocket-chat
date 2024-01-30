declare var require:any
const express = require('express')
const http = require('http')
const cors =require('cors')

const app=express()
const server=http.createServer(app)

import {Server} from 'socket.io'

const io= new Server(server,{
    cors:{
        origin: "*",
        methods: ['POST', 'GET'],
    },
})
// const clients:string[]=[]
console.log("server live")
io.on('connection',async(socket)=>{
    console.log(socket.id)
    socket.on('send-msg',(msg:string)=>{
        socket.broadcast.emit('rec-msg',msg,io.engine.clientsCount)
    })

    socket.on("disconnect",()=>{
        console.log(`User disconnected: ${socket.id}`);
        // Broadcast when a user disconnects
        // io.emit('rec-msg', `${socket.id} has left the chat.`, io.engine.clientsCount);
    })
})
// io.emit("hello")
server.listen(5000,()=>{
    console.log("nodemon at port 3000");

})

