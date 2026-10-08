import "server-only";
import mongoose from "mongoose";

const globalForMongoose = globalThis;

export default async function dbConnect() {
  if (mongoose.connection.readyState === 1) {
    console.log("using the previous connection to db.");
    return;
  }

  const connectionString = process.env.DB_URI_;
  if (!connectionString) {
    throw new Error("DB_URI_ is not configured.");
  }

  if (!globalForMongoose.mongooseConnection) {
    globalForMongoose.mongooseConnection = mongoose
      .connect(connectionString)
      .then(() => {
        console.log("connected to database successfully");
      })
      .catch((error) => {
        globalForMongoose.mongooseConnection = undefined;
        console.error("cannot connect to the database:", error);
        throw error;
      });
  }

  await globalForMongoose.mongooseConnection;
}
