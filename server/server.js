const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

// Create a new express applicatio n
const app = express();

// Create a http server
const server = http.createServer(app);
// Create a socket.io server and attach it to the http server
const io = socketIo(server);

let messages = [];

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  const { username } = socket.handshake.query;
  console.log(`New client connected: ${socket.id} with username ${username}`);
});

// Listen for new messages, and broadcast them to all connected clients
socket.on("message", (messageObject) => {
  const { username, socketId, message, messageId, date } = messageObject;
  const newMessage = {
    username,
    socketId,
    message,
    messageId,
    date,
  };
  messages.push(newMessage);
  console.log("Received message: ", newMessage);
  io.emit("message", newMessage);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
