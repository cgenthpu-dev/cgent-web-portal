import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongo_url);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Could not connect to database : ", error);
    process.exit(1);
  }
};

export default connectDB;
