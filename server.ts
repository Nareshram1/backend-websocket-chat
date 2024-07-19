import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "https://simbunewyear.vercel.app",
        methods: ['POST', 'GET'],
    },
});

console.log("Server live");

io.on('connection', (socket) => {
    console.log(socket.id);
    
    // Initial call
    socket.emit('connected', io.engine.clientsCount);

    // When a client connects, send the number of connected users to all clients
    socket.on('send-msg', (msg: string) => {
        socket.broadcast.emit('rec-msg', msg, io.engine.clientsCount);
    });

    // Disconnect
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(5000, () => {
    console.log("Server running on port 5000");
});
