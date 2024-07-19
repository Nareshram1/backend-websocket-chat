
# Group Chat Application

Welcome to the Group Chat Application! This project is a real-time chat application using Node.js, Express, and Socket.IO. It is designed for a group chat where multiple users can join, send messages, and get notified about new users joining or leaving the chat.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Example Code](#example-code)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-time messaging**: Chat with multiple users in real-time.
- **Connection notifications**: Get notified when users connect or disconnect.
- **Cross-Origin Resource Sharing (CORS)**: Allows access from different origins.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
    \`\`\`bash
    git clone https://github.com/Nareshram1/backend-websocket-chat.git
    cd backend-websocket-chat
    \`\`\`

2. **Install dependencies**:
    \`\`\`bash
    npm install
    \`\`\`

3. **Run the server**:
    \`\`\`bash
    npm start
    \`\`\`
    The server will start running on \`http://localhost:5000\`.

## Usage

1. **Start the Server**:
    Run \`npm start\` to start the server. The server will be running on port 5000.

2. **Connect a Client**:
    Open a web browser and connect to the server using a WebSocket client or a front-end application. You can use \`ws://localhost:5000\` to connect.

3. **Send and Receive Messages**:
    - Users can send messages using the \`send-msg\` event.
    - All connected users will receive messages via the \`rec-msg\` event.
    - Users will be notified of new connections and disconnections.

## Example Code

Here is the main server code:

\`\`\`typescript
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
        console.log(\`User disconnected: \${socket.id}\`);
    });
});

server.listen(5000, () => {
    console.log("Server running on port 5000");
});
\`\`\`

## Contributing

If you would like to contribute to this project, please follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:
    \`\`\`bash
    git checkout -b feature-branch
    \`\`\`
3. **Make your changes**.
4. **Commit your changes**:
    \`\`\`bash
    git commit -m "Add some feature"
    \`\`\`
5. **Push to the branch**:
    \`\`\`bash
    git push origin feature-branch
    \`\`\`
6. **Create a pull request**.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
