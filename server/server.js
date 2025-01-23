const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { v4: uuidv4 } = require("uuid");

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

  // Broadcast message to all clients when a new user joins
  const joinMessage = {
    messageId: uuidv4(),
    username: "Chatbot",
    socketId: "system",
    message: `${username} has joined the chat`,
    date: new Date().toISOString(),
  };
  messages.push(joinMessage);
  io.emit("message", joinMessage);

  // Whena  user disconnects
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    // Broadcast message to client when a user leaves
    const leaveMessage = {
      messageId: uuidv4(),
      username: "Chatbot",
      socketId: "system",
      message: `${username} has left the chat`,
      date: new Date().toISOString(),
    };
    messages.push(leaveMessage);
    console.log("User left:", username);
    io.emit("message", leaveMessage);
  });

  // Listen for new messages, and broadcast them to all connected clients
  socket.on("message", (messageData) => {
    const { username, socketId, message, messageId, date } = messageData;
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

  //   Listen for edit message event
  socket.on("editMessage", ({ messageId, updatedMessage }) => {
    const message = messages.find((msg) => msg.messageId === messageId);
    if (message) {
      message.message = updatedMessage;
      console.log("Edited message:", { messageId, updatedMessage });
      io.emit("editMessage", { messageId, updatedMessage });
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
