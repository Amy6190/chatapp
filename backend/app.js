const express = require('express')
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('./config/db');
const cors = require('cors');
const chatroutes = require('./routes/chatRoutes');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);

const io = socketIo(server,{
    cors: {origin:"*"}
})

app.use(express.json());
app.use(cors());
app.use('/api/messages', chatroutes);

io.on('connection', (socket) => {
    console.log("New client connected:", socket.id);
  
    socket.on('joinRoom', (room) => {
      socket.join(room);
      console.log(`${socket.id} joined room ${room}`);
    });
  
    socket.on('sendMessage', async ({ room, username, message }) => {
      const newMessage = new Message({ room, username, message });
      await newMessage.save();

      io.to(room).emit('receiveMessage', newMessage);
    });
  
    socket.on('disconnect', () => {
      console.log("User disconnected:", socket.id);
    });
  });

  const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));