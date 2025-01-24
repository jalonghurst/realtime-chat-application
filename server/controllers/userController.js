const User = require("../models/User");

const getActiveUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users.map((user) => user.username));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch active users" });
  }
};

module.exports = {
  getActiveUsers,
};