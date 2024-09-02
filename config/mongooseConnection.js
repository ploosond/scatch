const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/scatch");
    console.log(`MongoDB connected!`);
  } catch (err) {
    console.log("Failed to connect DB: ", err);
    process.exit(1);
  }
};

module.exports = connectDB;
