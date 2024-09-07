const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(`${config.get("MONGODB_URL")}/scatch`);
    dbgr(`MongoDB connected!`);
  } catch (err) {
    dbgr("Failed to connect DB: ", err);
  }
};

module.exports = connectDB;
