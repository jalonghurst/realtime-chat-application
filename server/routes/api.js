const express = require("express");
const router = express.Router();
const { getMessages } = require("../controllers/messageController");
const { getActiveUsers } = require("../controllers/userController");

router.get("/messages", getMessages);
router.get("/activeUsers", getActiveUsers);

module.exports = router;