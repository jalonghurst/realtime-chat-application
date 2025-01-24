const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Message = require("../models/Message");

// Get messages from the database-sorted by date
router.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

router.get("/activeUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users.map((user) => user.username));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch active users" });
  }
});

module.exports = router;
