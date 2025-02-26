const mongoose = require("mongoose");

require("dotenv").config();

exports.connectToDb = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log(error.message);
  }
};
