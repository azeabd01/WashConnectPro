const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://azergui609:UdDeiQRCQFLNEHqG@cluster0.rgfktyy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0") 
    
    console.log("connected successfully");
  } catch (error) {
    console.log("error with connecting with the DB ", error);
  }
};

module.exports = connectDB;