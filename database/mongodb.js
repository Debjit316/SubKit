import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Define DB_URI environment variable inside .env.(development/production).local"
  );
}

const connectdb = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Database connected successfully in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Trouble connecting Database", error);
    process.exit(1);
  }
};

export default connectdb;
