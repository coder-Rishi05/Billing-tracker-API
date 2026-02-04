import mongoose from "mongoose";
import { MONGO_URL } from "../config/env.js";
import { dbName } from "../config/constant.js";

const connectDB = async () => {
  const connect = await mongoose.connect(`${MONGO_URL}${dbName}`);
  console.log("connected database successfully", connect.connection.name);
};

export default connectDB;
