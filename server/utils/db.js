const mongoose = require("mongoose");

// Connect to MongoDB using Mongoose with custom settings
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      tls: true,
      serverSelectionTimeoutMS: 3000,
      autoSelectFamily: false,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
