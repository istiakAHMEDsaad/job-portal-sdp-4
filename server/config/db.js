import mongoose from "mongoose";

// Function to connect the mongoDB database

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/bubt-job-portal`);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
  }
};

export default connectDB;
