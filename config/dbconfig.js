import mongoose from "mongoose";

const connnectDb = async () => {
  try {
    const connection_string = process.env.MONGO_URI;
    await mongoose.connect(connection_string);
    console.log("Connected to database");
  } catch (error) {
    console.log(`Server connection error`);
  }
};

export default connnectDb;
