const mongoose = require("mongoose");

async function  connectToDb() {
  const uri = "mongodb+srv://n025711858:a1b2c3d4@cluster0.6hbd8.mongodb.net/db";
  try {
      await mongoose.connect(uri)
      console.log("db connected")
    } catch (error) {
        console.log(error);
    }
} 


module.exports = connectToDb;