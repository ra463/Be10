import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path:"./config.env",
});

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const { connection } = await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
