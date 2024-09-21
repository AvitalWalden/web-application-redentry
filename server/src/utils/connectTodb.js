const mongoose = require("mongoose");
const config = require('../config/config')

async function  connectToDb() {
  const uri = config.DB_URI;
  try {
      await mongoose.connect(uri)
      console.log("db connected")
    } catch (error) {
        console.log(error);
    }
} 


module.exports = connectToDb;