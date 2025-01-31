const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    messageId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    socketId: { type: String, required: true },
    message: { type: String, required: true },
    isEdited: { type: Boolean, required: true, default: false },
    isDeleted: {type: Boolean, required:true, default:false},
    date: { type: Date, required: true },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;