import mongoose from "mongoose";

const MONGODB_URI = process.env.NODE_ENV === "production"
  ? process.env.MONGODB_URI
  : process.env.DB_CONNECTION;

if (!MONGODB_URI) throw new Error("ERROR TO CONNECT TO THE DATABASE");

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI);
    if (connection.readyState === 1) {
      console.log("Database connected succesfully!");
      return Promise.resolve(true);
    }
  } catch (err) {
    console.log(err);
    return Promise.reject(false);
  }
};

