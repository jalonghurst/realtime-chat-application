const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    messageId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    socketId: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, required: true },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;