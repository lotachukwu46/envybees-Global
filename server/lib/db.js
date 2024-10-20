import mongoose from "mongoose";

// Connect to MongoDB
export const connectDB = async (connectionString) => {
  try {
    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
