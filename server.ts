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
    // inital call
    socket.emit('connected', io.engine.clientsCount);
    // when a client connects ,send the number of connected users to all clients
    socket.on('send-msg',(msg:string)=>{
        socket.broadcast.emit('rec-msg',msg,io.engine.clientsCount)
    })
    //  disconnect 
    socket.on("disconnect",()=>{
        console.log(`User disconnected: ${socket.id}`);
    })
})

server.listen(5000,()=>{
    console.log("nodemon at port 5000");

})

