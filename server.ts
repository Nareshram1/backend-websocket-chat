declare var require:any
const express = require('express')
const http = require('http')


const app=express()
const server=http.createServer(app)

import {Server} from 'socket.io'

const io= new Server(server,{
    cors:{
        origin:'*',
        methods:['POST','GET']
    },
})
const clients:string[]=[]
io.on('connection',async(socket)=>{
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