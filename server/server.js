const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const connectDB = require("./utils/db");
const Message = require("./models/Message");
const User = require("./models/User");
const apiRoutes = require("./routes/api");
const cors = require("cors");

connectDB();

// Create a new express application, and enable CORS
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json()); // Enable JSON parsing for incoming requests

app.use("/api", apiRoutes); // Attach API routes toexpress app

// Create a http server
const server = http.createServer(app);
// Create a socket.io server and attach it to the http server
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket"],
});

app.get("/", (req, res) => {
  res.send("Chat server is running");
});

io.on("connection", (socket) => {
  const username = socket.handshake.query.username;
  console.log(`New client connected: ${socket.id} with username ${username}`);

  // Add user to the database collection of active users
  if (username) {
    const newUser = new User({
      username,
      socketId: socket.id,
    });
    newUser.save().then(() => {
      User.find().then((users) => {
        io.emit(
          "activeUsers",
          users.map((user) => user.username)
        );
      });
    });

    // Broadcast messages to all clients when a new user joins
    const joinMessage = new Message({
      messageId: uuidv4(),
      username: "Meetingbot",
      socketId: "system",
      message: `${username} has joined the chat.`,
      date: new Date().toISOString(),
    });
    joinMessage.save().then(() => {
      io.emit("message", joinMessage);
    });
  }

  // Listen for new messages, and broadcast them to all connected clients
  socket.on("message", (messageData) => {
    const { username, socketId, message, messageId, date } = messageData;
    const newMessage = new Message({
      messageId,
      username,
      socketId,
      message,
      date,
    });
    newMessage.save().then(() => {
      console.log("Received message: ", newMessage);
      io.emit("message", newMessage);
    });
  });

  //   Listen for edit message event
  socket.on("editMessage", ({ messageId, updatedMessage }) => {
    Message.findOneAndUpdate(
      { messageId },
      { message: updatedMessage, isEdited: true },
      { new: true },
  
    ).then((message) => {
      if (message) {
        console.log("Edited message:", { messageId, updatedMessage });
        io.emit("editMessage", { messageId, updatedMessage, isEdited: true });
      }
    }).catch((err) => {
      console.error(err);
    });
  });

  // Listen for message delete event
  socket.on("deleteMessage", ({ messageId }) => {
    Message.findOneAndUpdate({ messageId }, { message: "", isDeleted: true }).then(() => {
      console.log("Deleted message with id:", messageId);
      io.emit("deleteMessage", {messageId, isDeleted: true});
    });
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    User.findOneAndDelete({ socketId: socket.id }).then((user) => {
      if (user) {
        User.find().then((users) => {
          io.emit(
            "activeUsers",
            users.map((user) => user.username)
          );
        });

        // Broadcast message to client when a user leaves
        const leaveMessage = new Message({
          messageId: uuidv4(),
          username: "Meetingbot",
          socketId: "system",
          message: `${user.username} has left the chat.`,
          date: new Date().toISOString(),
        });
        leaveMessage.save().then(() => {
          io.emit("message", leaveMessage);
        });
        console.log("User left:", user.username);
      }
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
