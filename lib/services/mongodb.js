import mongoose from "mongoose";

let isConnected = false

export default async function dbConnect() {
  if (isConnected) {
    console.log("using the previous connection to db.");
    return
  }
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log("connected to database sucessfully")
    isConnected = true;
  } catch (error) {
    console.log('cannot connect to the database: ', error)

  }

}

