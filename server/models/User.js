const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  socketId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;