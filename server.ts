declare var require:any
const express = require('express')
const http = require('http')
const cors =require('cors')

const app=express()
app.use(
    cors({
      origin: "*",
    })
  );
const server=http.createServer(app)

import {Server} from 'socket.io'

const io= new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:['POST','GET']
    },
})
const clients:string[]=[]
console.log("server live")
io.of("/api/socket").on('connection',async(socket)=>{
    console.log(socket.id)
    clients.push(socket.id)
    socket.on('send-msg',(msg:string)=>{
        console.log(msg)
        socket.broadcast.emit('rec-msg',msg)
    })
})
// io.emit("hello")
server.listen(3000,()=>{
    console.log("nodemon at port 3000");

})

