import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const connectedUsers = new Map();
let drawHistory = [];

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (username) => {
    connectedUsers.set(socket.id, { username, x: 0, y: 0 });
    io.emit('users', Array.from(connectedUsers.values()));
    console.log(username)
    
    // Send drawing history to new user
    drawHistory.forEach(data => {
      socket.emit('draw', data);
    });
  });

  socket.on('draw', (data) => {
    drawHistory.push(data);
    socket.broadcast.emit('draw', data);
  });

  socket.on('clear', () => {
    drawHistory = [];
    socket.broadcast.emit('clear');
  });

  socket.on('chat', (message) => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      io.emit('chat', { username: user.username, message });
    }
  });

  socket.on('disconnect', () => {
    connectedUsers.delete(socket.id);
    io.emit('users', Array.from(connectedUsers.values()));
    console.log('User disconnected:', socket.id);
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});